export default function ({ $axios, store, redirect, $toast }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    // اگر خطای 401 (عدم دسترسی / انقضای توکن) دریافت شد
    if (code === 401) {
      // پاک کردن استیت و کوکی
      store.dispatch('logout')
      $toast.error('نشست شما منقضی شده است. لطفاً مجدداً وارد شوید.')
      redirect('/login')
    }
  })
}