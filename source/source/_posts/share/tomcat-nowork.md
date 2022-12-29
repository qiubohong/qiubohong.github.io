---
title: java tomcat服务无缘无故挂掉分析和解决方案
date: 2022-12-17 21:21:01
tags:
    - 技术分享
---

# 背景
最近有同事反应有时候xxx系统有时候会时不时出现服务异常提示，一上机器，发现xxx服务进程不在，重启服务后又恢复了，所以这边就需要去跟进问题。

# 问题定位
java tomcat服务挂掉原因，主要怀疑方向有这几个：
1. 服务器被人重启，导致服务没有起来
2. 错误异常导致程序挂掉
3. 服务器占用内存过高，Linux强制退出程序
4. 其他原因
下面就开始逐一排查

<!--more-->

## 服务器重启
如何查看服务器是否被重启，主要依据下面的命令：

`who -b`查看最后一次重启时间

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1aca3c9b441642a5b913e2ea7778efe1~tplv-k3u1fbpfcp-watermark.image?)
`last reboot` 查看服务器历史重启

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fb16e2d74b74654a20289db8a0c31c4~tplv-k3u1fbpfcp-watermark.image?)

发现服务器重启时间是几个月前的事，因此可以排除。

## 错误异常导致程序挂掉
java服务采用spring log分级日志，直接看对应时间点日志，并没有发现什么，因此可以排除掉。

## 服务器占用内存过高，Linux强制退出程序
如何查看服务器系统日志，可以查看文件：`/var/log/messages`。
> message日志包含了系统启动时的引导消息，以及系统运行时的其他状态消息。IO 错误、网络错误和其他系统错误都会记录到这个文件中。

如何排查呢？执行以下命令：
`cat /var/log/messages | grep java`
然后发现有下面日志：
```shell
Out of memory: Kill process 9682 (java) score 9 or sacrifice child
```
因此判断由于内存占用过高，java服务被系统误杀了。
既然定位到问题根源，那么为了更好的解决问题，我们继续追踪问题，为什么系统会kill java服务，而不杀掉其他进程呢？这里就需要了解一下Linux Out of Memory (OOM) killer机制。

# Linux OOM机制
## 是什么
Linux内核设计的一种机制，在内存不足的时候，会选择一个占用内存较大的进程并kill掉这个进程，以满足系统内存申请需求。
## 触发机制
触发条件：内存不足，为什么会出现内存不足，这里涉及到Linux内存结构和使用机制：
1. 物理内存结构
2. overcommit机制
3. OOM killer机制

### Linux内存结构
这里就简单讲一下，具体描述可以google一下Linux物理内存结构。
Linux物理内存结构，Linux内核会把物理内存按照`node（节点） > zone（分区）> page (内存页)`三级结构进行划分，俗称内存管理系统，然后CPU会根据这种内存管理系统去调用内存。简单介绍以下概念：
- node节点：每个CPU都有自己的node内存节点，可以多个也可以单个，单个叫UMA架构，多个叫NUMA架构
- zone分区：每个Node划分很多zone，每个zone都有自己的功能定义，这种只是从软件层面划分定义。zone里还有一个概念叫分配价值链
	-  分配价值链： 普通的内存分配会有一个“价值”的层次结构
- page内存页：属于zone下面的内存页，每个页基础大小是4K，他们维护在一个叫free_area的数组结构中
下面是从网上找的Linux物理内存结构图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cca72d58e9a94f978d8cedf43a06a834~tplv-k3u1fbpfcp-watermark.image?)

### 虚拟内存(swap空间)
相对于物理内存，在 Linux 下还有一个虚拟内存的概念，虚拟内存是为了满足物理内存的不足而提出的策略，它是利用磁盘空间虚拟出的一块逻辑内存。用作虚拟内存的磁盘空间被称为`交换空间`（又称 `swap 空间`）。

了解Linux物理内存结构，我们明白Linux 的内存管理采取的是分页存取机制，为了保证物理内存能得到充分的利用，内核会在适当的时候将物理内存中不经常使用的数据块自动交换到虚拟内存中，而将经常使用的信息保留到物理内存。

Linux 内存运行机制:
- Linux 系统会不时地进行页面交换操作，以保持尽可能多的空闲物理内存，即使并没有什么事情需要内存，Linux 也会交换出暂时不用的内存页面，因为这样可以大大节省等待交换所需的时间
- Linux 进行页面交换是有条件的，不是所有页面在不用时都交换到虚拟内存，Linux 内核根据“最近最经常使用”算法，仅仅将一些不经常使用的页面文件交换到虚拟内存

虚拟内存是允许设置大小，这也是解决OMM killer的一种解决方案，具体可以看后面的解决方案。

### overcommit机制

有了虚拟内存的存在，那么进程就可以向系统申请比物理剩余内存更大的使用内存：

> 在实际申请内存的时候，比如申请1G，并不会在物理区域中分配1G的真实物理内存，而是分配1G的虚拟内存，等到需要的时候才去真正申请物理内存，也就是说申请不等于分配

这就是overcommit机制，允许进程申请比物理内存实际大的内存。但是这会面临一个问题，当进程真正需要这么多内存怎么办，Linux的解决方案就是OOM killer。

当然，overcommit也允许设置几种值(vm.overcommit_memory)：
- 0 – Heuristic overcommit handling. 这是缺省值，它允许overcommit，但过于明目张胆的overcommit会被拒绝，比如malloc一次性申请的内存大小就超过了系统总内存
- 1 – Always overcommit. 允许overcommit，对内存申请来者不拒。
- 2 – Don’t overcommit. 禁止overcommit。

## OOM killer机制
讲完overcommit，终于来到本文重点，OOM killer机制，这应该是很多Linux系统部署服务，开发者所要面临头疼地方。
OOM killer，全称 Out Of Memory Killer，俗称内存溢出杀手。它是如何执行的呢?

> OMM killer机制：linux会为每个进程算一个分数，最终他会将分数最高的进程kill

有三个进程设置值可以影响到分数值，可手动设置，但是基本上都不会用上，仅用来了解或者临时解决方案：
- `/proc/<pid>/oom_score_adj`, 取值范围为-1000到1000， 如果将该值设置为-1000，则进程永远不会被杀死，因为此时 badness score 永远返回0
- `/proc/<pid>/oom_adj`, 取值是-17到+15，取值越高，越容易被干掉。如果是-17，则表示不能被kill
- `/proc/<pid>/oom_score`, 是系统综合进程的内存消耗量、CPU时间(utime + stime)、存活时间(uptime - start time)和oom_adj计算出的，消耗内存越多分越高。

除了这三个值，还有一种计算方式：子进程内存：Linux在计算进程的内存消耗的时候，会将子进程所耗内存的一半同时算到父进程中。这样，那些子进程比较多的进程就要小心了。

### 如何确定进程是被OOM killer干掉的
java tomcat查看之前的进程id或进程名，可以通过命令`ps -ef | grep java`获取到。
其次，查找系统日志`grep "Out of memory" /var/log/messages`，对比一下进程id或进程名，进行判断。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e8bc25d25784a47ad2f4c2780581d1d~tplv-k3u1fbpfcp-watermark.image?)



# 解决方案

## 关闭OOM机制(不推荐，可作为临时解决方案)
执行以下命令：
```shell
sysctl -w vm.overcommit_memory=2
```
或者
```shell
echo "vm.overcommit_memory=2" >> /etc/sysctl.conf
```

或者修改进程oom_score_adj值：

```shell
sudo echo -1000 > /proc/$pid/oom_score_adj
```
或者修改进程oom_adj值:
- /proc/PID/oom_adj文件，将其置位-17

## 设置java进程最大占用内存(推荐)
java tomcat服务在启用进程的时候可以设置占用最大内存，具体数值可以参考当前服务器所剩余的内存设置，具体设置如下：
```shell
java -Xms512m -Xmx512m -jar xxx.jar
```
- Xms: 最小内存
- Xmx: 最大内存
tomcat可以在`TOMCAT_HOME/bin/catalina.sh`中设置:
```shell
# 在cygwin=false前
JAVA_OPTS="-server -Xms256m -Xmx512m -XX:PermSize=64M -XX:MaxPermSize=128m"
```

## java守护进程(推荐)
除了设置最大占用内存设置，还可以增加守护进程从而避免服务异常挂掉进行重启，主要有两种方案：
1. 第一种常用，通过设置`crontab`脚本去守护。
2. 第二种是Java `jsvc`方案，利用启动守护进程去监控控制服务进程，从而避免进程无缘无故挂掉自动重启，tomcat本身已有`daemon.sh`，可以直接该脚本即可。

## 优化代码(有能力者可以采用)
这个可能需要具体问题具体分析了，优化代码占用内存，java网上有很多方案，大家各自采纳符合自己的方案即可。

## 申请更多内存(土豪随意)
既然是内存不够，那么就直接申请更多资源，就可以满足了，看来还是有钱就能更快解决问题。
