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
  // اجرای خودکار در سمت سرور برای احیای استیت از روی کوکی
  nuxtServerInit({ commit }, { app }) {
    const token = app.$cookies.get('auth-token')

    if (token) {
      commit('SET_USER_STATUS', true)
      commit('SET_USER_DATA', { name: 'یحیی حسینی', role: 'توسعه‌دهنده فرانت‌اند' })
    }
  },

  async login({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === '123456') {
          const fakeToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken'

          // ذخیره توکن در کوکی
          this.$cookies.set('auth-token', fakeToken, {
            path: '/',
            maxAge: 60 * 60 * 24 * 1 // 1 روز به ثانیه
          })

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
    this.$cookies.remove('auth-token')
    commit('SET_USER_STATUS', false)
    commit('SET_USER_DATA', { name: '', role: '' })
  }
}