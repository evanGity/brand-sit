import index from './index.vue'

//产品列表展示
export default function createListView (id) {
  return {
    name: `${id}-category`,

    async asyncData ({ store, route }) {
    	let _cid = route.params.id;
      // 格式化获取cid
      _cid = _cid.split('-c-')[1];
      let cid = _cid.substring(0, _cid.length - 5);
      await store.dispatch('getProductsList', { categoryIds: cid });
      return store.dispatch('fetchCatalogList', { parentId: 1});
    },

    render (h) {
      return h(index, {})
    }
  }
}
