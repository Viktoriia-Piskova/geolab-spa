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
        labels: ["1", "2", "3", "4", "5"],
      },
      chartOptions: {
        responsive: true,
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
      chartData.datasets = [{ data: [...this.mailLength] }];
      return chartData;
    },
  },
};
</script>
