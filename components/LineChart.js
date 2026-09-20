import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartData: { type: Object, required: true },
    options: { type: Object, default: () => ({ responsive: true, maintainAspectRatio: false }) }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}