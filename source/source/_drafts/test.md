title: RabbitMQ学习
date: '2024-09-06 16:21:13'
updated: '2024-09-06 16:21:10'
tags:
  - 学习总结
  - 每日更新
---
# 安装

可以源码安装（python环境）
service rabbitmq-server start

也可以docker安装，依赖docker环境


运行成功后有两个端口：

1. 5672，其他客户端调用链接使用
2. 15672，后台管理系统使用

支持配置文件，参考docker内配置文件路径： /etc/rabbitmq/conf.d/10-defaults.conf

# 概念

virtual host 
类似mysql支持多个用户访问同一个实例（IP+PORT）的不同数据库

exchange交换机
类似一种邮箱或存储队列，支持加入或转发推送能力

# 五种消息类型

## HelloWorld

正常邮箱类型， 生产者往RabbitMQ队列增加消息，但是消费者不一定要及时看


## Worker模型
对比 邮箱模型， 只要生产消息 就会马上竞争消费掉，可以有效的避免消息堆积



## 订阅模型
Fanout（广播模型）: 将消息发送给绑定给交换机的所有队列(因为他们使用的是同一个RoutingKey)。


Direct（定向）: 把消息发送给拥有指定Routing Key (路由键)的队列。


Topic（通配符）: 把消息传递给拥有 符合Routing Patten(路由模式)的队列。








