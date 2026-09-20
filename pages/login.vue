<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir="rtl">
    <div class="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1920&auto=format&fit=crop" class="w-full h-full object-cover" alt="background" />
      <div class="absolute inset-0 bg-slate-900/75 backdrop-blur-sm"></div>
    </div>

    <div class="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-10 space-y-8 relative z-10">
      <div class="text-center">
        <div class="mx-auto w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h2 class="text-3xl font-extrabold text-slate-900">سامانه بانکی</h2>
        <p class="mt-2 text-sm text-slate-500">لطفاً برای ورود به پنل، اطلاعات خود را وارد کنید</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">نام کاربری</label>
            <input v-model="username" type="text" class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white placeholder-slate-400" placeholder="admin" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">رمز عبور</label>
            <input v-model="password" type="password" class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white placeholder-slate-400" placeholder="••••••" />
          </div>
        </div>

        <button type="submit" :disabled="isLoading" class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
          <span v-if="isLoading" class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            در حال احراز هویت...
          </span>
          <span v-else>ورود به سیستم</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'auth',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        this.$toast.error('لطفاً نام کاربری و رمز عبور را وارد کنید')
        return
      }

      this.isLoading = true
      try {
        await this.$store.dispatch('login', { username: this.username, password: this.password })
        
        this.$toast.success('با موفقیت وارد شدید. خوش آمدید')
        this.$router.push('/')
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>