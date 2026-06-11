import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

const API_URL = import.meta.env.VITE_COIN_API_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
);

const CoinChart = ({ coinID }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `${API_URL}/${coinID}/market_chart?vs_currency=aud&days=7`,
        );
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();

        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));

        setChartData({
          datasets: [
            {
              label: 'Price (AUD)',
              data: prices,
              fill: true,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinID]);

  return <div>Chart</div>;
};

export default CoinChart;
