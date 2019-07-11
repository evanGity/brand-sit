import index from './index.vue'

//产品列表展示
export default function createListView (keywords) {
  return {
    name: `${keywords}-search`,

    async asyncData ({ store, route }) {
    	let keywords = route.query.keywords;
      
      if (keywords === '' || keywords === undefined || keywords === null) {
        store.state.searchList = {
          total: 0,
          list: [],
          isSearched: false
        }

        return;
      }

      return await store.dispatch('getSearchList', {keywords: keywords, pageNum: 1, pageSize: 12});
    },

    render (h) {
      return h(index, {})
    }
  }
}
