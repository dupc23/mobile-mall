<template>
  <div class="shopcart">
    <ul>
      <li v-for="(item,index) in goods" :key="item.goodId">
        <mt-Switch v-model="item.isSelected"></mt-Switch>
        <img :src="item.img_url" alt="">
        <div class="title">{{item.title}}</div>
        <div class="pickNum">
          <span @click="reduceNum(item)">-</span>
          <span>{{item.num}}</span>
          <span @click="addNum(item)">+</span>
        </div>
        <span class="prise">{{item.prise}}</span>
        <mt-button class="del" size="small" type="danger" @click="removeShop(index,item.goodId)">删除</mt-button>
      </li>
    </ul>
    <p class="goodsTotal">
          <span>已添加：{{pyment.count}}</span>
          <span>总价：￥{{pyment.total}}</span>
    </p>
  </div>
</template>

<script>
  import GoodsTool from "../../../public/GoodsTool";
  import {massageBox} from "../../components/MassageBox";

  export default {
    name: 'ShopCart',

    data() {
      return {
        shopCartList: {},
        goods: []
      }
    },

    components: {},

    computed: {
      //计算属性， 实时计算商品数量和商品价格
      pyment(){
        let total = 0,count = 0;
        this.goods.forEach(good => {
          if(good.isSelected){
            total += good.num * good.prise;
            count += good.num;
          }
        })
        return{total,count};
      }
    },

    methods:{
      //商品数量减少
      reduceNum(item){
        if ( item.num == 1 ) return;
        item.num --;
        this.$store.dispatch('addNumAction', -1);
      },
      //商品数量增加
      addNum(item){
        if(item.num >= item.count) return;
        item.num ++;
        this.$store.dispatch('addNumAction', 1);
      },
      //删除商品 在本地列表删除之后  把本地存储对象的数据也删掉 然后重新赋值
      removeShop(index,id){
        this.goods.splice(index,1);
        GoodsTool.removeGood(id);
        this.$store.dispatch('changeNumAction', GoodsTool.getTotalCount());
      }
    },

    activated() {
      //给父组件把当前标题传过去
      this.$emit("getTitle", '购物车');
      //获取本地存储对象中的商品键值对
      this.shopCartList = GoodsTool.getGoodList();
      //把当前商品键值对提取出来
      let goodsIdList = Object.keys(this.shopCartList);
      let goodsNumList = Object.values(this.shopCartList);

      //获取所有商品数据然后筛选
      this.axios.get('/goods/list')
              .then(res => {
                //遍历数据 根据当前购物车的的商品id进行筛选
                goodsIdList.forEach((goodId, index) => {
                  res.data.forEach(item => {
                    if (item.goodId == goodId) {
                      this.goods.push(item);
                      //通过set 添加数据属性 会对数据有实时相应
                      this.$set(this.goods[index], 'isSelected', true);
                      this.$set(this.goods[index], 'num', goodsNumList[index]);
                    }
                  })
                });


              })
              .catch(err => {
                console.log("获取商品详情失败", err);
              });

    },

    deactivated() {
      this.shopCartList = {};
      this.goods = [];
    },

    beforeRouteLeave(to,from,next) {
      let goodList = {};
      //遍历当前商品数据 取出商品id 和数量
      this.goods.forEach(good => {
        goodList[good.goodId] = good.num;
      })
      //比对当前购物车商品和本地存储对象的商品数据是否不同
      if ( JSON.stringify(goodList) != JSON.stringify(GoodsTool.getGoodList()) ) {
        // isLeave = confirm('确定要离开嘛');
        //自定义提示框
        massageBox({
          title: '提示',
          content: '要保存改动的数据吗？',
          ok: '确定',
          cancel: '取消',
          //确定
          handleOk: () => {
            //保存商品到本地存储对象
            GoodsTool.saveGoods(goodList);
            next();
          },
          //取消
          handleCancel: () => {
            next();
          }
        })

      }else {
        next();
      }
    }

  }

</script>

<style lang="css" scoped>
  .shopcart {
    overflow-y: scroll;
    padding-bottom: 30px;
  }

  .shopcart div {
    display: inline-block;
  }

  .shopcart li {
    display: flex;
    justify-content: left;
    flex-wrap: nowrap;
    position: relative;
    padding: 10px 0;
    height: 120px;
  }

  .shopcart img {
    max-width: 100px;
    max-height: 100px;
    box-sizing: border-box;
    padding: 10px;
  }

  .title {
    flex: 1 0;
    height: 60px;
    overflow: hidden;
  }

  .pickNum {
    position: absolute;
    bottom: 30px;
    left: 150px;
  }

  .del {
    margin-top: 30px;
  }

  .pickNum span {
    display: inline-block;
    width: 30px;
    border: 1px solid #999;
    text-align: center;
    transition: all 200ms;
    padding: 2px;
  }

  .pickNum span:nth-child(1):active, .pickNum span:nth-child(3):active {
    background: #999;
    color: white;
  }

  .prise{
    position: relative;
    bottom: -75px;
    display: inline-block;
    height: 20px;
    color: orangered;
    font-weight: 800;
  }

  .goodsTotal{
    height: 30px;
    position: fixed;
    bottom: 55px;
    background: orangered;
    color: white;
    display: flex;
    width: 100%;
  }
  .goodsTotal span{
    padding: 5px 30px;
    flex: 1;
  }
</style>
