<template>
  <!-- شاسی اصلی پنل با سایدبار -->
  <div class="flex min-h-screen bg-gray-50" dir="rtl">
    <aside class="w-64 bg-slate-800 text-white p-6 shadow-lg">
      <h2 class="text-xl font-bold mb-8 text-center border-b border-slate-600 pb-4">سامانه بانکی</h2>
      <nav class="space-y-2">
        <nuxt-link to="/" class="block py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition">داشبورد تراکنش‌ها</nuxt-link>
      </nav>
    </aside>
    <main class="flex-1 p-8">
      <nuxt />
    </main>
  </div>
</template>