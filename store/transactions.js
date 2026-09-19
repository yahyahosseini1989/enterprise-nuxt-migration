export const state = () => ({
  list: [],
  isLoading: false
})

export const mutations = {
  SET_TRANSACTIONS(state, data) {
    state.list = data
  },
  SET_LOADING(state, status) {
    state.isLoading = status
  }
}

export const actions = {
  async fetchTransactions({ commit }) {
    commit('SET_LOADING', true)
    
    const response = await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 'TRX-9821', amount: 50000000, type: 'واریز حقوق', status: 'موفق' },
          { id: 'TRX-9822', amount: 12500000, type: 'خرید تجهیزات', status: 'در انتظار تایید' },
          { id: 'TRX-9823', amount: 450000, type: 'شارژ حساب', status: 'موفق' },
          { id: 'TRX-9824', amount: 200000, type: 'پرداخت قبض', status: 'موفق' }
        ])
      }, 500)
    })

    commit('SET_TRANSACTIONS', response)
    commit('SET_LOADING', false)
  }
}