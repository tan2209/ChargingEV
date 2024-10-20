import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: any; // Replace with specific type if available
  options: any; // Replace with specific type if available
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
