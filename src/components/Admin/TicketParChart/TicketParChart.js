// Chart
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import adminService from '~/services/adminService';

// scss
import styles from './TicketParChart.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import TableShowTicketMonth from '../TableShowTicketMonth';
const cx = classNames.bind(styles);

ChartJS.register(ChartDataLabels, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
function TicketParChart({ year = new Date().getFullYear() - 1 }) {
  const [dataPar, setDataPar] = useState([]);
  const [month, setMonth] = useState(0);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Ticket revenue by month in ${year}`,
        font: {
          size: 20,
        },
      },
      datalabels: {
        align: function (context) {
          var index = context.dataIndex;
          var curr = context.dataset.data[index];
          var prev = context.dataset.data[index - 1];
          var next = context.dataset.data[index + 1];
          return prev < curr && next < curr ? 'end' : prev > curr && next > curr ? 'start' : 'center';
        },
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderColor: 'rgba(128, 128, 128, 0.7)',
        borderRadius: 4,
        borderWidth: 1,
        color: function (context) {
          var i = context.dataIndex;
          var value = context.dataset.data[i];
          var prev = context.dataset.data[i - 1];
          var diff = prev !== undefined ? value - prev : 0;
          return diff < 0 ? 'red' : diff > 0 ? 'blue' : 'gray';
        },
        font: {
          size: 11,
          weight: 'bold',
        },
        offset: 8,
        formatter: function (value, context) {
          var i = context.dataIndex;
          var prev = context.dataset.data[i - 1];
          var diff = prev !== undefined ? prev - value : 0;
          var glyph = diff < 0 ? '▲' : diff > 0 ? '▼' : '◆';
          return glyph + ' ' + Math.round(value);
        },
        padding: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const monthIndex = elements[0].index;
        const selectedMonth = monthIndex + 1;
        setMonth(selectedMonth);
        window.scrollTo({
          top: 1000,
          behavior: 'smooth',
        });
      }
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Ticket revenue ($)',
        data: [...dataPar],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        font: {
          size: 20,
        },
      },
    ],
  };

  const getData = async () => {
    const res = await adminService.getStatisticalByYear(year);
    let dataParExample = new Array(12).fill(0);
    // Lặp qua dữ liệu ban đầu để cập nhật giá trị doanh thu cho các tháng có dữ liệu
    res.forEach((item) => {
      const monthIndex = item.month - 1; // Chuyển đổi về index của mảng (từ 1-12 -> 0-11)
      if (item.total_revenue !== null && !isNaN(parseFloat(item.total_revenue))) {
        dataParExample[monthIndex] = parseFloat(item.total_revenue);
      }
    });
    setDataPar(dataParExample);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);
  return (
    <div className={cx('wrap')}>
      <div className={cx('map')}>
        <Chart data={data} options={options} type="line" />
        <div className={cx('footer')}>
          <hr></hr>
        </div>
      </div>
      {month > 0 && <TableShowTicketMonth month={month} year={year} />}
    </div>
  );
}

export default TicketParChart;
