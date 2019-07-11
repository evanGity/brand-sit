import index from './productsDetails_new.vue'

//产品列表展示
export default function productsDetails (pid) {
  return {
    name: `${pid}-productsDetails`,

    async asyncData ({ store, route }) {
    	let _pid = route.params.pid;
      // 格式化获取cid
      _pid = _pid.split('-p-')[1];
      let pid = _pid.substring(0, _pid.length - 5);

      await store.dispatch('getProductBaseData', { productId: pid });
      await store.dispatch('getProductPlatFormData', { productId: pid });
      await store.dispatch('getProductImgData', { productId: pid });
      return await store.dispatch('getProductColorData', { productId: pid });
    },
    render (h) {
      return h(index, {})
    }
  }
}
