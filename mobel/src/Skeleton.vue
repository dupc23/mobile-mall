<template>
    <div class="skeleton">
        <header></header>
        <div class="content">
            <ul>
                <li>
                    <p>
                        <i></i>
                        <span></span>
                    </p>
                </li>
                <li>
                    <p>
                        <i></i>
                        <span></span>
                    </p>
                </li>
                <li>
                    <p>
                        <i></i>
                        <span></span>
                    </p>
                </li>
            </ul>
        </div>
        <footer></footer>
    </div>
</template>

<script>
    export default {
        name: "Skeleton"
    }
</script>

<style scoped>
    .skeleton{
        width: 100%;
        height: 100%;
    }
    .skeleton header, footer{
        background: #efefef;
    }
    header{
        height: 45px;
        border-bottom: rgba(0,0,0,0.2) solid 1px;
    }
    footer{
        width: 100%;
        height: 55px;
        position: fixed;
        bottom: 0;
        border-top: rgba(0,0,0,0.2) solid 1px;
    }
    li{
        display: block;
        height: 50px;
        margin:10px 0;
        padding: 10px 0;
    }
    p{
        display: flex;
        justify-content: space-around;
        flex-wrap: nowrap;
    }
    i{
        flex-basis: 20px;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: #efefef;
        margin-left: 10px;
    }
    span{
        display: inline-block;
        flex-grow: 1;
        height: 20px;
        background: #efefef;
        margin-left: 10px;
    }
</style>