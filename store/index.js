export const state = () => ({
  user: {
    name: 'یحیی حسینی',
    role: 'توسعه‌دهنده فرانت‌اند',
    isLoggedIn: true
  }
})

export const mutations = {
  SET_USER_STATUS(state, status) {
    state.user.isLoggedIn = status
  }
}