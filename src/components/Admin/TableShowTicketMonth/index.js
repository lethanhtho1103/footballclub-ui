import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowTicketMonth.module.scss';
import { useEffect, useState } from 'react';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import adminService from '~/services/adminService';

const cx = classNames.bind(style);

function TableShowTicketMonth({ month, year }) {
  const [row, setRow] = useState([]);

  const columns = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Tournaments', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Rival club', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Game Date', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Ticket sold', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Revenue', accessor: 'col6', filter: 'fuzzyText' },
    { Header: 'Actions', accessor: 'col7', disableSortBy: true },
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
        col1: row.index + 1,
        col2: 'Premier league',
        col3: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <img
              src={row.image?.length > 9 ? `${baseUrl}${row.opponent_team_image}` : noAvatar}
              alt=""
              style={{
                width: '48px',
                height: '48px',
                display: 'block',
                borderRadius: '50%',
              }}
            />
            <div style={{ width: '100%', textAlign: 'center' }}>{row.opponent_team}</div>
          </div>
        ),
        col4: row.game_date,
        col5: row.tickets_sold,
        col6: row.revenue,
        col7: 'Show detail',
      };
    });
    setRow(dataRow);
  };

  const handleGetAllMatchOfMonth = async () => {
    const res = await adminService.getStatisticalByMonth(month, year);
    convertToDataRow(res.matches);
  };

  useEffect(() => {
    handleGetAllMatchOfMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  return (
    <>
      <div
        className={cx('wrap', {
          show: true,
        })}
      >
        <div className={cx('container-content')}>
          <div className={cx('wrap-table')}>
            <h2 className={cx('title')}>{monthNames[month - 1]} match list</h2>
            <div className={cx('table')}>
              <DataTable columns={columns} data={row} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableShowTicketMonth;
