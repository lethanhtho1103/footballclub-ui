import { useState } from 'react';

// Scss
import styles from './SalaryParStatistical.module.scss';
import classNames from 'classnames/bind';
import SalaryParChart from '../SalaryParChart/SalaryParChart';

const cx = classNames.bind(styles);

function SalaryParStatistical() {
  const currentYear = new Date().getFullYear();
  const startYear = 2010;
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const yearOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>,
    );
  }

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div className={cx('wrap')}>
      <div className={cx('select-year')}>
        See chart at year
        <select onChange={handleYearChange} value={selectedYear}>
          {yearOptions}
        </select>
      </div>
      <SalaryParChart year={selectedYear} />
    </div>
  );
}

export default SalaryParStatistical;
