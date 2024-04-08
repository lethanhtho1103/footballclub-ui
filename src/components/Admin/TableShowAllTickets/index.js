import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowAllTickets.module.scss';
import { useEffect, useState } from 'react';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import adminService from '~/services/adminService';

const cx = classNames.bind(style);

function TableShowAllTickets() {
  const [row, setRow] = useState([]);

  const columns = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Tournaments', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Club Away', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Game Date', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Game Time', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Name', accessor: 'col6', filter: 'fuzzyText' },
    { Header: 'Seats', accessor: 'col7', filter: 'fuzzyText' },
    { Header: 'Price', accessor: 'col8', filter: 'fuzzyText' },
  ];

  function convertTimeFormat(timeString) {
    var timeParts = timeString.split(':');
    var hour = timeParts[0];
    var minute = timeParts[1];
    var formattedTime = hour + ':' + minute;
    return formattedTime;
  }

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
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
              src={row.image?.length > 9 ? `${baseUrl}${row.club_away.image}` : noAvatar}
              alt=""
              style={{
                width: '48px',
                height: '48px',
                display: 'block',
                borderRadius: '50%',
              }}
            />
            <div style={{ width: '100%', textAlign: 'center' }}>{row.club_away.name}</div>
          </div>
        ),
        col4: row.game_date,
        col5: convertTimeFormat(row.game_time),
        col6: row.user_name,
        col7: row.seats.map((seat) => seat.seat_id).join(', '),
        col8: row.price,
      };
    });
    setRow(dataRow);
  };

  const handleGetAllTickets = async () => {
    const res = await adminService.getAllTickets();
    convertToDataRow(res.tickets);
  };

  useEffect(() => {
    handleGetAllTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={cx('wrap', {
          show: true,
        })}
      >
        <div className={cx('container-content')}>
          <div className={cx('wrap-table')}>
            <h2 className={cx('title')}>List of tickets</h2>
            <div className={cx('table')}>
              <DataTable columns={columns} data={row} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableShowAllTickets;
