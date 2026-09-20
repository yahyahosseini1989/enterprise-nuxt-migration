export default {
  methods: {
    formatCurrency(value) {
      if (!value) return '۰';
      // تبدیل عدد به فرمت استاندارد با جداکننده هزارگان و پسوند تومان
      return Number(value).toLocaleString('fa-IR') + ' تومان';
    }
  }
}