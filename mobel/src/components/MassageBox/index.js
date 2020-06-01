import Vue from "vue";
import MobelMassageBox from "./MobelMassageBox";
let defaultData = {
    title: "标题",
    content: "",
    cancel: "取消",
    ok: "确认",
    handleCancel:null,
    handleOk:null
}
export let massageBox = (function () {
    let MyComment = Vue.extend(MobelMassageBox);

    return function(opts) {
        for(let attr in opts){
            defaultData[attr] = opts[attr];
        }
        let vm = new MyComment({
            el: document.createElement('div'),
            data(){
                return {
                    title: defaultData.title,
                    content: defaultData.content,
                    cancel: defaultData.cancel,
                    ok: defaultData.ok
                }
            },
            methods: {
                handleCancel(){
                    defaultData.handleCancel && defaultData.handleCancel.call(this);
                    setTimeout(()=>{
                        document.body.removeChild(this.$el);
                    },150);

                },
                handleOk(){
                    defaultData.handleOk && defaultData.handleOk.call(this);
                    setTimeout(()=>{
                        document.body.removeChild(this.$el);
                    },150);
                }
            }
        });
        document.body.appendChild(vm.$el);
    }
})()
