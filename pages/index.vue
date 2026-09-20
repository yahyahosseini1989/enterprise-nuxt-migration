<template>
  <div>
    <!-- هدر صفحه -->
    <header
      class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
    >
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">
          داشبورد تراکنش‌ها
        </h1>
        <p class="text-sm text-slate-500 mt-1">
          نمای کلی وضعیت مالی و تراکنش‌های اخیر
        </p>
      </div>
      <div
        class="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100"
      >
        <div class="flex flex-col text-left">
          <span class="text-xs text-slate-400">کاربر فعال</span>
          <span class="font-bold text-indigo-600">{{ user.name }}</span>
        </div>
        <div
          class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold"
        >
          {{ user.name.charAt(0) }}
        </div>
        <div class="border-r border-slate-200 h-8 mx-2"></div>
        <button
          @click="testExpiredToken"
          title="تست خطای 401"
          class="text-orange-500 hover:text-orange-600 transition"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </button>
        <button
          @click="handleLogout"
          title="خروج"
          class="text-red-500 hover:text-red-600 transition"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- کارت‌های آماری -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        class="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200"
      >
        <h3 class="text-blue-100 text-sm font-medium mb-1">موجودی کل حساب</h3>
        <p class="text-3xl font-bold">
          ۱۲۵,۰۰۰,۰۰۰ <span class="text-lg font-normal opacity-80">تومان</span>
        </p>
      </div>
      <div
        class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex justify-between items-center"
      >
        <div>
          <h3 class="text-slate-500 text-sm font-medium mb-1">
            تراکنش‌های موفق
          </h3>
          <p class="text-2xl font-bold text-slate-800">
            ۸۴
            <span
              class="text-sm font-normal text-green-500 bg-green-50 px-2 py-0.5 rounded-full"
              >+۱۲٪</span
            >
          </p>
        </div>
        <div
          class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            ></path>
          </svg>
        </div>
      </div>
      <div
        class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex justify-between items-center"
      >
        <div>
          <h3 class="text-slate-500 text-sm font-medium mb-1">
            در انتظار تایید
          </h3>
          <p class="text-2xl font-bold text-slate-800">
            ۳
            <span
              class="text-sm font-normal text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full"
              >نیاز به اقدام</span
            >
          </p>
        </div>
        <div
          class="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- بخش جستجو و جدول -->
    <div
      class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
    >
      <div
        class="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50"
      >
        <h2 class="text-lg font-bold text-slate-800">لیست تراکنش‌ها</h2>
        <div class="relative w-full md:w-72">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="جستجوی شناسه یا عنوان..."
            class="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          />
          <svg
            class="w-5 h-5 text-slate-400 absolute right-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="text-center py-12 text-slate-500 flex flex-col items-center"
      >
        <svg
          class="animate-spin h-8 w-8 text-indigo-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        در حال واکشی اطلاعات...
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm text-right text-slate-600">
          <thead class="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th class="px-6 py-4 whitespace-nowrap">شناسه تراکنش</th>
              <th class="px-6 py-4">مبلغ</th>
              <th class="px-6 py-4">عنوان تراکنش</th>
              <th class="px-6 py-4">وضعیت</th>
              <th class="px-6 py-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="trx in filteredList"
              :key="trx.id"
              class="hover:bg-slate-50/80 transition group"
            >
              <td class="px-6 py-4 font-mono text-slate-500">{{ trx.id }}</td>
              <td class="px-6 py-4 font-bold text-slate-800">
                {{ formatCurrency(trx.amount) }}
              </td>
              <td class="px-6 py-4">{{ trx.title }}</td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-medium border',
                    trx.status === 'موفق'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200',
                  ]"
                >
                  <span
                    class="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                    :class="
                      trx.status === 'موفق' ? 'bg-green-500' : 'bg-red-500'
                    "
                  ></span>
                  {{ trx.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <nuxt-link
                  :to="`/transactions/${trx.id}`"
                  class="text-indigo-600 hover:text-indigo-900 font-medium opacity-0 group-hover:opacity-100 transition"
                >
                  مشاهده جزئیات &larr;
                </nuxt-link>
              </td>
            </tr>
            <tr v-if="filteredList.length === 0">
              <td colspan="5" class="text-center py-12 text-slate-500">
                هیچ تراکنشی با این مشخصات یافت نشد.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import currencyMixin from "~/mixins/currencyMixin";

export default {
  name: "DashboardPage",

  middleware: "auth",

  mixins: [currencyMixin],

  async asyncData({ store, $axios }) {
    await store.dispatch("transactions/fetchTransactions", $axios);
  },

  computed: {
    ...mapState(["user"]),
    ...mapState("transactions", ["isLoading"]),

    ...mapGetters("transactions", ["filteredList"]),

    searchQuery: {
      get() {
        return this.$store.state.transactions.searchQuery;
      },
      set(value) {
        this.$store.commit("transactions/SET_SEARCH_QUERY", value);
      },
    },
  },

  methods: {
    handleLogout() {
      if (window.confirm("آیا مطمئن هستید که می‌خواهید از سامانه خارج شوید؟")) {
        this.$store.dispatch("logout");
        this.$toast.info("شما از سیستم خارج شدید");
        this.$router.push("/login");
      }
    },
    async testExpiredToken() {
      try {
        await this.$axios.get("https://api.github.com/user", {
          headers: {
            Authorization: "Bearer fake_expired_token_12345",
          },
        });
      } catch (error) {
        // این بلاک اجرا نمی‌شود چون پلاگین ما در فایل axios.js قبل از رسیدن خطا به اینجا،
        // استیت را پاک کرده و کاربر را به /login ریدایرکت می‌کند.
        console.log("این پیام چاپ نمی‌شود");
      }
    },
  },
};
</script>
