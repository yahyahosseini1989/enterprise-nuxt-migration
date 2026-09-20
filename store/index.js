export const state = () => ({
  user: {
    name: '',
    role: '',
    isLoggedIn: false
  }
})

export const mutations = {
  SET_USER_STATUS(state, status) {
    state.user.isLoggedIn = status
  },
  SET_USER_DATA(state, userData) {
    state.user.name = userData.name
    state.user.role = userData.role
  }
}

export const actions = {
  async login({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      // شبیه‌سازی تاخیر شبکه
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === '123456') {
          commit('SET_USER_STATUS', true)
          commit('SET_USER_DATA', { name: 'یحیی حسینی', role: 'توسعه‌دهنده فرانت‌اند' })
          resolve()
        } else {
          reject(new Error('نام کاربری یا رمز عبور اشتباه است.'))
        }
      }, 1000)
    })
  },
  
  logout({ commit }) {
    commit('SET_USER_STATUS', false)
    commit('SET_USER_DATA', { name: '', role: '' })
  }
}