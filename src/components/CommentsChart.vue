<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="mailData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "CommentsChart",
  components: { Bar },
  data() {
    return {
      rawData: {
        labels: [],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  props: {
    mailLength: {
      type: Array,
      required: true,
    },
  },
  computed: {
    mailData() {
      const chartData = this.rawData;
      chartData.labels = Array.from(
        { length: this.mailLength.length },
        (_, i) => i + 1
      );
      chartData.datasets = [{ data: [...this.mailLength] }];
      return chartData;
    },
  },
};
</script>
