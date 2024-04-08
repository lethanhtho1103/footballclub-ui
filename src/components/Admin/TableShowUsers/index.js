import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowUsers.module.scss';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import adminService from '~/services/adminService';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import ModalDetailTicket from '../ModalDetailTicket';

const cx = classNames.bind(style);

function TableShowUsers() {
  const [row, setRow] = useState([]);
  const [isShowModalDetailTicket, setIsShowModalDetailTicket] = useState(false);
  const [userId, setUserId] = useState('');
  const columns = [
    { Header: 'User_id', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Name', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Email', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Date of birth', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Nationality', accessor: 'col6', filter: 'fuzzyText' },
    { Header: 'Ticket', accessor: 'col7', disableSortBy: true },
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
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
            <div style={{ width: '100%', textAlign: 'center' }}>{row.name}</div>
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
        col3: row.email,
        col5: row.date_of_birth,
        col6: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ width: '100%', textAlign: 'center' }}>{row.nationality}</div>
            <img
              src={`https://flagcdn.com/36x27/${row.flag}.png`}
              alt="No flag"
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid #dde6ed',
                display: 'block',
                borderRadius: '4px',
              }}
            />
          </div>
        ),
        col7: (
          <Button
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '8px 10px',
              backgroundColor: '#5E5DF0',
              color: '#fff',
              borderRadius: '8px',
              borderColor: '#5E5DF0',
              fontSize: '1.3rem',
            }}
            onMouseOver={(e) => (e.target.style.opacity = 0.8)}
            onMouseOut={(e) => (e.target.style.opacity = 1)}
            onClick={() => {
              setIsShowModalDetailTicket(true);
              setUserId(row.user_id);
            }}
          >
            Show detail
          </Button>
        ),
      };
    });
    setRow(dataRow);
  };

  const handleGetAllUsers = async () => {
    const res = await adminService.getAllAccountUsers();
    convertToDataRow(res.users);
  };

  const handleClickX = () => {
    setIsShowModalDetailTicket(false);
  };

  useEffect(() => {
    handleGetAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isShowModalDetailTicket && <ModalDetailTicket toggleX={handleClickX} userId={userId} />}
      <div
        className={cx('wrap', {
          show: true,
        })}
      >
        <div className={cx('container-content')}>
          <div className={cx('wrap-table')}>
            <h2 className={cx('title')}>List of Users</h2>

            <div className={cx('table')}>
              <DataTable columns={columns} data={row} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableShowUsers;
