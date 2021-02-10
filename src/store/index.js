import Vuex from 'vuex';
import Vue from 'vue';
import users from '@/store/users';
import common from '@/store/common';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		users,
		common
	},

})
