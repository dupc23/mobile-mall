<template>
    <div class="mask">
        <div class="massage-box">
            <h4>{{title}}</h4>
            <p>{{content}}</p>
            <div>
                <span @click="handleOk">{{ok}}</span>
                <span @click="handleCancel">{{cancel}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MobelMassageBox",

    }
</script>

<style scoped>
    .mask{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.15);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        filter: blur(50);
    }
    .massage-box{
        height: 120px;
        width: 220px;
        text-align: center;
        box-shadow: 3px 3px 5px 5px rgba(0,0,0,0.3);
        margin: auto;
        border-radius: 5px;
        background: white;
        position: absolute;
        top: 50%;
        margin-top: -70px;
        left: 50%;
        margin-left: -110px;
    }
    .massage-box > div{
        display: flex;
        width: 100%;
        height: 40px;
        position: absolute;
        bottom: 0;
    }
    .massage-box > div span{
        display: inline-block;
        height: 100%;
        line-height: 40px;
        text-align: center;
        flex: 1;
        border: solid #999999 1px;
        border-radius: 5px;
    }

    .massage-box > p{
        font-size: 17px;
    }
    .massage-box > div span:active{
        background: rgba(0,0,0,0.2);
    }
</style>