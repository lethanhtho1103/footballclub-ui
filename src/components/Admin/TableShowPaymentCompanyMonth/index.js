import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowPaymentCompanyMonth.module.scss';
import { useEffect, useState } from 'react';
import adminService from '~/services/adminService';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';

const cx = classNames.bind(style);

function TableShowPaymentCompanyMonth({ month, year }) {
  const access_token = useSelector(accessTokenSelector);
  const [row, setRow] = useState([]);

  const columns = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Company', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Amount', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Payment Date', accessor: 'col4', filter: 'fuzzyText' },
  ];

  const monthNames = [
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

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
        col2: row.name,
        col3: row.amount,
        col4: row.payment_date,
        // col5: row.received === 1 ? 'Yes' : <span style={{ color: 'red' }}>No</span>,
      };
    });
    setRow(dataRow);
  };

  const handleShowPaymentCompanyMonth = async () => {
    const res = await adminService.getPaymentCompanyByMonth(month, year, access_token);
    convertToDataRow(res.company_payments);
  };

  useEffect(() => {
    handleShowPaymentCompanyMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  return (
    <>
      <div
        className={cx('wrap', {
          show: true,
        })}
      >
        {/* {isLoader && <Loader />} */}
        <div className={cx('container-content')}>
          <div className={cx('wrap-table')}>
            <h2 className={cx('title')}>{monthNames[month - 1]} payment company list</h2>
            <div className={cx('table')}>
              <DataTable columns={columns} data={row} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableShowPaymentCompanyMonth;
