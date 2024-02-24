import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowPlayers.module.scss';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UilTimes, UilEditAlt, UilPlus } from '@iconscout/react-unicons';
import { userService } from '~/services';
// import ToastMassage from '../ToastMassage';

const cx = classNames.bind(style);

function TableShowPlayers() {
  const [row, setRow] = useState([]);
  const columns = [
    { Header: 'Clothers number', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Player name', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Date of birth', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Nationality', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Position', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Actions', accessor: 'col6', disableSortBy: true },
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: row.jersey_number,
        col2: row.name,
        col3: row.date_of_birth,
        col4: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {row.nationality}
            <img
              src={`https://flagcdn.com/h60/${row.flag}.png`}
              alt="No flag"
              style={{
                maxWidth: '32px',
                maxHeight: '32px',
                height: 'auto',
                border: '1px solid #dde6ed',
                borderRadius: '50%',
                display: 'block',
                marginLeft: '8px',
              }}
            />
          </div>
        ),
        col5: row.position,
        col6: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              style={{
                padding: '4px 10px',
                backgroundColor: '#5E5DF0',
                color: '#fff',
                borderRadius: '8px',
              }}
              onMouseOver={(e) => (e.target.style.opacity = 0.8)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
              // onClick={() => handleShow(row.filmId, row.roomShowTime.id, row.startDate, row.startTime)}
            >
              <UilEditAlt size={18} />
            </Button>
            <Button
              style={{
                padding: '4px 10px',
                backgroundColor: '#FF4742',
                color: '#fff',
                borderRadius: '8px',
                borderColor: '#FF4742',
              }}
              onMouseOver={(e) => (e.target.style.opacity = 0.8)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
              // onClick={() => handleShow(row.filmId, row.roomShowTime.id, row.startDate, row.startTime)}
            >
              <UilTimes size={18} />
            </Button>
          </div>
        ),
      };
    });
    setRow(dataRow);
  };

  const handleGetAllPlayers = async () => {
    const res = await userService.getAllPlayers();
    console.log(res.players);
    convertToDataRow(res.players);
  };

  useEffect(() => {
    handleGetAllPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cx('wrap', {
        show: true,
      })}
    >
      <div className={cx('container-content')}>
        <div className={cx('wrap-table')}>
          <h2 className={cx('title')}>List of players</h2>
          <div className={cx('note')}>
            Actions:
            <div className={cx('btn-actions')}>
              <Button className={cx('btn-add')}>
                <UilPlus size={16} />
                <span>Add player</span>
              </Button>
            </div>
          </div>
          <div className={cx('table')}>
            <DataTable columns={columns} data={row} />
          </div>
          {/* {DeleteConfirmationDialog()} */}
          {/* {obToast.content.length > 0 && (
              <ToastMassage dur={3000} isShow={obToast.show} header={obToast.header} content={obToast.content} />
            )} */}
        </div>
      </div>
    </div>
  );
}

export default TableShowPlayers;
