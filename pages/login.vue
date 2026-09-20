<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">ورود به سامانه</h1>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">نام کاربری</label>
          <input 
            v-model="username" 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin"
          />
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">رمز عبور</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123456"
          />
        </div>

        <!-- نمایش پیام خطا -->
        <div v-if="errorMessage" class="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
          {{ errorMessage }}
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          <span v-if="isLoading">در حال بررسی...</span>
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
      isLoading: false,
      errorMessage: ''
    }
  },

  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = 'لطفاً تمامی فیلدها را پر کنید.'
        return
      }

      this.isLoading = true
      this.errorMessage = ''

      try {
        // فراخوانی اکشن Vuex از ماژول اصلی (بدون namespace)
        await this.$store.dispatch('login', { 
          username: this.username, 
          password: this.password 
        })
        
        // در صورت موفقیت، هدایت به صفحه داشبورد با استفاده از روتر
        this.$router.push('/')
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>