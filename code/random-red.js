/**
 * 实现微信随机红包
 * money是金额
 * num是红包个数
 * 最终输出 红包个数 的 随机值(小数点两位) 数组
 */

function getRandomRed(money, num){
    const result = []

    let lastMoney = money;

    while(num>0){
        if(num == 1){
            result.push(+lastMoney.toFixed(2));
        }else{
            

            const tempMoney = +(Math.random()*( lastMoney/num * 2)).toFixed(2);
            result.push(tempMoney);
            lastMoney = lastMoney - tempMoney;
            // 如果刚好红包分完了或者超发了 如何保证不超发
            if(lastMoney <= 0){

            }
        }
        num--;
    }

    return result;
}

