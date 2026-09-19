<template>
  <div class="min-h-screen bg-gray-50 p-8" dir="rtl">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <header class="flex justify-between items-center border-b pb-4 mb-6">
        <h1 class="text-2xl font-bold text-gray-800">سامانه مدیریت تراکنش‌ها (نسخه Legacy)</h1>
        <div class="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          کاربر فعال: <span class="font-bold text-blue-600">{{ user.name }}</span> ({{ user.role }})
        </div>
      </header>

      <table class="w-full text-sm text-right text-gray-600">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-3 rounded-tr-lg">شناسه</th>
            <th class="px-4 py-3">مبلغ (تومان)</th>
            <th class="px-4 py-3">نوع تراکنش</th>
            <th class="px-4 py-3 rounded-tl-lg">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trx in transactions" :key="trx.id" class="border-b hover:bg-gray-50 transition">
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

  async asyncData() {
    const response = await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 'TRX-9821', amount: 50000000, type: 'واریز حقوق', status: 'موفق' },
          { id: 'TRX-9822', amount: 12500000, type: 'خرید تجهیزات', status: 'در انتظار تایید' },
          { id: 'TRX-9823', amount: 450000, type: 'شارژ حساب', status: 'موفق' }
        ])
      }, 400)
    })

    return {
      transactions: response
    }
  },

  computed: {
    ...mapState(['user'])
  }
}
</script>