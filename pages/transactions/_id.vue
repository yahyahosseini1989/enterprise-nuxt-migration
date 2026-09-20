<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <header class="flex justify-between items-center mb-6 border-b pb-4">
      <h1 class="text-2xl font-bold text-gray-800">تحلیل تراکنش: <span class="text-blue-600">{{ transactionId }}</span></h1>
      <button @click="$router.push('/')" class="text-sm bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">بازگشت</button>
    </header>
    
    <!-- نکته طلایی سازمانی: استفاده از client-only برای جلوگیری از کرش کردن سرور SSR -->
    <div class="h-80 w-full relative">
      <client-only placeholder="در حال بارگذاری نمودار...">
        <line-chart :chart-data="chartData" />
      </client-only>
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