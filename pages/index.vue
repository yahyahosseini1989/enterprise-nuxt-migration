<template>
  <div class="min-h-screen bg-gray-50 p-8" dir="rtl">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <header class="flex justify-between items-center border-b pb-4 mb-6">
        <h1 class="text-2xl font-bold text-gray-800">سامانه مدیریت تراکنش‌ها (نسخه ماژولار)</h1>
        <div class="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          کاربر فعال: <span class="font-bold text-blue-600">{{ user.name }}</span>
        </div>
      </header>

      <div v-if="isLoading" class="text-center py-8 text-gray-500">
        در حال دریافت اطلاعات از سرور...
      </div>

      <table v-else class="w-full text-sm text-right text-gray-600">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-3 rounded-tr-lg">شناسه</th>
            <th class="px-4 py-3">مبلغ (تومان)</th>
            <th class="px-4 py-3">نوع تراکنش</th>
            <th class="px-4 py-3 rounded-tl-lg">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trx in list" :key="trx.id" class="border-b hover:bg-gray-50 transition">
            <td class="px-4 py-3 font-mono text-gray-500">{{ trx.id }}</td>
            <td class="px-4 py-3 font-semibold">{{ trx.amount.toLocaleString() }}</td>
            <td class="px-4 py-3">{{ trx.type }}</td>
            <td class="px-4 py-3">
              <span :class="trx.status === 'موفق' ? 'text-green-600 bg-green-50 px-2 py-1 rounded' : 'text-orange-500 bg-orange-50 px-2 py-1 rounded'">
                {{ trx.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DashboardPage',

  async asyncData({ store }) {
    await store.dispatch('transactions/fetchTransactions')
  },

  computed: {
    ...mapState(['user']),
    
    ...mapState('transactions', ['list', 'isLoading'])
  }
}
</script>