export const state = () => ({
  list: [],
  isLoading: false,
  searchQuery: ''
})

export const getters = {
  filteredList: (state) => {
    if (!state.searchQuery) return state.list;
    
    const query = state.searchQuery.toLowerCase();
    return state.list.filter(trx => 
      trx.id.toLowerCase().includes(query) || 
      trx.title.toLowerCase().includes(query)
    );
  }
}

export const mutations = {
  SET_TRANSACTIONS(state, data) {
    state.list = data
  },
  SET_LOADING(state, status) {
    state.isLoading = status
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query
  }
}

export const actions = {
  async fetchTransactions({ commit }, $axios) {
    commit('SET_LOADING', true)
    
    try {
      const response = await $axios.$get('https://jsonplaceholder.typicode.com/posts?_limit=6')
      
      const normalizedData = response.map(item => ({
        id: `TRX-${item.id * 1050}`,
        amount: item.userId * 2500000,
        title: item.title.split(' ').slice(0, 3).join(' '),
        status: item.id % 2 === 0 ? 'موفق' : 'ناموفق'
      }))

      commit('SET_TRANSACTIONS', normalizedData)
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}