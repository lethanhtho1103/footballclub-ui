import classNames from 'classnames/bind';
import style from './ModalShowUserOfMatch.module.scss';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import Loader from '~/components/Loader';
import adminService from '~/services/adminService';
import DataTable from '../DataTable';
const cx = classNames.bind(style);

function ModalShowUserOfMatch({ toggleX, gameId }) {
  const [isHidden, setIsHidden] = useState(false);
  const [row, setRow] = useState([]);
  const [isUsers, setIsUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    { Header: 'User_id', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Name', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Seats', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Price', accessor: 'col4', filter: 'fuzzyText' },
  ];
  const convertToDataRow = (row) => {
    const dataRow = row.map((row) => {
      return {
        col1: row.user_id,
        col2: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ width: '100%', textAlign: 'center' }}>{row.user_name}</div>
            <img
              src={row.image?.length > 9 ? `${baseUrl}${row.image}` : noAvatar}
              alt=""
              style={{
                width: '48px',
                height: '48px',
                display: 'block',
                borderRadius: '50%',
              }}
            />
          </div>
        ),
        col3: row.seats.map((seat) => seat.seat_id).join(', '),
        col4: row.price,
      };
    });
    setRow(dataRow);
  };

  const handleMouseLeave = () => {
    setIsHidden(true);
  };
  const handelClickHidden = () => {
    if (isHidden) {
      toggleX();
    }
  };
  const handleClickX = () => {
    toggleX();
  };

  const handleGetAllUserOfMatch = async () => {
    const res = await adminService.getAllUserOfMatch(gameId);
    if (res.tickets) {
      convertToDataRow(res.tickets);
      setIsLoading(false);
      setIsUsers(true);
    }
  };

  useEffect(() => {
    handleGetAllUserOfMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  return (
    <div onClick={handelClickHidden} className={cx('wrap')}>
      <div onMouseLeave={handleMouseLeave} className={cx('ticket')}>
        <Button className={cx('exit')} onClick={handleClickX}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </Button>
        {isLoading ? (
          <Loader />
        ) : isUsers ? (
          <div className={cx('container-content')}>
            <div className={cx('wrap-table')}>
              <h2 className={cx('title')}>List of users (match {gameId})</h2>
              <div className={cx('table')}>
                <DataTable columns={columns} data={row} />
              </div>
            </div>
          </div>
        ) : (
          <div className={cx('no-ticket')}>
            <img src={noAvatar} alt="Img" />
            <span>No Users</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalShowUserOfMatch;
