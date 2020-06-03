import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        num: 0
    },
    mutations: {
        addStateNum(state, num) {
            state.num += num;
        },
        changeStateNum(state, num) {
            state.num = num;
        }
    },
    actions: {
        addNumAction({commit}, num) {
            commit('addStateNum', num);
        },
        changeNumAction({commit}, num){
            commit('changeStateNum', num);
        }
    },
    modules: {}
})
