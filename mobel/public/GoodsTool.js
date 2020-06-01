//定义两个封装好的方法 便于对象内部访问
function getGoodsList(){
    return JSON.parse(window.localStorage.getItem('goodsList') || "{}");
}
function seveGoods(obj){
    window.localStorage.setItem('goodsList',JSON.stringify(obj));
}
class GoodsTool {
    constructor() {
    }
    //静态方法 添加商品id 商品value 键值对到localStorage
    static addGood(good){
       let goodList = getGoodsList();
       if(goodList[good.id]){
           goodList[good.id] += good.num;
       }else {
           goodList[good.id] = good.num;
       }
       seveGoods(goodList);
    }
    //获取所有再localStorage的商品数量总数
    static getTotalCount(){
        let goodList = getGoodsList();
        let values = Object.values(goodList);
        let sumNum = 0;
        values.forEach(val => {
            sumNum += val;
        })
        return sumNum;
    }
    //删除商品id
    static removeGood(goodId){
        let goodList = getGoodsList();
        if(goodList[goodId]){
            delete goodList[goodId];
        }
        seveGoods(goodList);
    }
    //获取再localStorage的商品名称列表
    static getGoodNameList(){
        let goodList = getGoodsList();
        let keys = Object.keys(goodList);
        return keys;
    }
    static getGoodList(){
        return JSON.parse(window.localStorage.getItem('goodsList') || "{}");
    }
    static saveGoods(obj){
        window.localStorage.setItem('goodsList',JSON.stringify(obj));
    }
}
export default GoodsTool;