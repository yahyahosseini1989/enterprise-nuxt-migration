<template>
  <div class="max-w-5xl mx-auto">
    <div class="mb-6 flex justify-between items-center">
      <div>
        <div class="flex items-center text-sm text-slate-500 mb-2 gap-2">
          <nuxt-link to="/" class="hover:text-indigo-600 transition">داشبورد</nuxt-link>
          <span>/</span>
          <span>جزئیات تراکنش</span>
        </div>
        <h1 class="text-3xl font-extrabold text-slate-800">تحلیل شناسه: <span class="text-indigo-600">{{ transactionId }}</span></h1>
      </div>
      <button @click="$router.push('/')" class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition shadow-sm flex items-center gap-2 font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        بازگشت به لیست
      </button>
    </div>
    
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <div class="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 class="text-lg font-bold text-slate-800 mb-1">نمودار نوسانات مشابه</h2>
          <p class="text-sm text-slate-500">روند تغییرات تراکنش‌های مشابه در ۶ ماه گذشته</p>
        </div>
        <div class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">
          وضعیت تراکنش: تایید شده
        </div>
      </div>

      <div class="h-96 w-full relative">
        <client-only placeholder="در حال رندر کردن نمودار سازمانی...">
          <line-chart :chart-data="chartData" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '~/components/LineChart.js'

export default {
  name: 'TransactionDetails',
  middleware: 'auth',
  components: { LineChart },
  
  asyncData({ params }) {
    // دریافت آیدی داینامیک از URL
    return { transactionId: params.id }
  },
  
  data() {
    return {
      // دیتای فرضی برای نمودار نوسانات تراکنش
      chartData: {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
        datasets: [{
          label: 'میزان نوسان مشابه',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          data: [12, 19, 3, 5, 2, 15]
        }]
      }
    }
  }
}
</script>