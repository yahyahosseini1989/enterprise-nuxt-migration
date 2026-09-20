<template>
  <!-- شاسی اصلی پنل با سایدبار -->
  <div class="flex min-h-screen bg-slate-50" dir="rtl">
    
    <aside class="w-72 bg-slate-900 text-slate-300 shadow-2xl flex flex-col">
      <!-- هدر سایدبار -->
      <div class="h-24 flex items-center px-8 border-b border-slate-800 bg-slate-900/50">
        <div class="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center ml-4 shadow-lg shadow-indigo-500/30">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-white tracking-wide">سامانه بانکی</h2>
      </div>
      
      <!-- منوی ناوبری -->
      <div class="p-6 flex-1 overflow-y-auto">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">منوی اصلی</div>
        <nav class="space-y-2">
          <!-- با استفاده از exact-active-class وضعیت لینک فعال به صورت خودکار تغییر می‌کند -->
          <nuxt-link 
            to="/" 
            class="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-slate-800 hover:text-white"
            exact-active-class="bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            داشبورد تراکنش‌ها
          </nuxt-link>
          
          <a href="#" class="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 text-slate-500 hover:bg-slate-800 hover:text-slate-300 cursor-not-allowed">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            مدیریت کاربران
          </a>
        </nav>
      </div>
      
      <!-- وضعیت اتصال سرور -->
      <div class="p-6 border-t border-slate-800">
        <div class="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-xl">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span class="text-sm font-medium text-slate-400">اتصال سرور: پایدار</span>
        </div>
      </div>
    </aside>
    
    <!-- محتوای اصلی -->
    <main class="flex-1 p-8 h-screen overflow-y-auto">
      <nuxt />
    </main>

  </div>
</template>