<template>
  <div class="min-h-screen bg-gray-50 p-8" dir="rtl">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <header class="flex justify-between items-center border-b pb-4 mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          سامانه تراکنش‌ها (اتصال به API)
        </h1>
        <div class="flex items-center gap-4">
          <div class="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            کاربر فعال:
            <span class="font-bold text-blue-600">{{ user.name }}</span>
          </div>
          <button
            @click="testExpiredToken"
            class="text-sm text-orange-500 hover:text-orange-700 transition border border-orange-500 px-2 py-1 rounded"
          >
            تست انقضای توکن (۴۰۱)
          </button>
          <button
            @click="handleLogout"
            class="text-sm text-red-500 hover:text-red-700 font-semibold transition"
          >
            خروج
          </button>
        </div>
      </header>

      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="جستجو بر اساس شناسه یا عنوان تراکنش..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div v-if="isLoading" class="text-center py-8 text-gray-500">
        در حال واکشی اطلاعات از سرور...
      </div>

      <table v-else class="w-full text-sm text-right text-gray-600">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-3 rounded-tr-lg">شناسه</th>
            <th class="px-4 py-3">مبلغ (تومان)</th>
            <th class="px-4 py-3">عنوان تراکنش</th>
            <th class="px-4 py-3 rounded-tl-lg">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="trx in filteredList"
            :key="trx.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-4 py-3 font-mono text-blue-500 hover:underline cursor-pointer">
              <nuxt-link :to="`/transactions/${trx.id}`">{{ trx.id }}</nuxt-link>
            </td>
            <td class="px-4 py-3 font-semibold">
              {{ formatCurrency(trx.amount) }}
            </td>
            <td class="px-4 py-3">{{ trx.title }}</td>
            <td class="px-4 py-3">
              <span
                :class="
                  trx.status === 'موفق'
                    ? 'text-green-600 bg-green-50 px-2 py-1 rounded'
                    : 'text-red-500 bg-red-50 px-2 py-1 rounded'
                "
              >
                {{ trx.status }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredList.length === 0">
            <td colspan="4" class="text-center py-6 text-gray-500">
              تراکنشی یافت نشد.
            </td>
          </tr>
        </tbody>
      </table>
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
      this.$store.dispatch("logout");
      this.$router.push("/login");
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
