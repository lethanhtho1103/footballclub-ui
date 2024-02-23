import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowPlayers.module.scss';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UilLabelAlt, UilTimes } from '@iconscout/react-unicons';
import { userService } from '~/services';
// import ToastMassage from '../ToastMassage';

const cx = classNames.bind(style);

function TableShowPlayers() {
  const [row, setRow] = useState([]);
  const columns = [
    { Header: 'Số áo', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Tên cầu thủ', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Ngày sinh', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Quốc tịch', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Vị trí', accessor: 'col5', filter: 'fuzzyText' },
    // { Header: 'Số vé tối đa', accessor: 'col6', filter: 'fuzzyText' },
    // { Header: 'Giá vé', accessor: 'col7', filter: 'fuzzyText' },
    { Header: 'Hành động', accessor: 'col6', disableSortBy: true },
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
          <Button
            size="sm"
            variant="outline-danger"
            style={{ marginRight: '16px' }}
            // onClick={() => handleShow(row.filmId, row.roomShowTime.id, row.startDate, row.startTime)}
          >
            <UilTimes size={18} />
          </Button>
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
          {/* <div className={cx('view-showtime')} onClick={handleShowCancelShowTime}>
              Xem danh sách lịch chiếu đã hủy
            </div> */}
          <h2 className={cx('title')}>Danh sách cầu thủ </h2>
          <div className={cx('note')}>
            Ghi chú:
            <ul className={cx('note-list')}>
              {/* <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-primary">
                    <UilCheck size={18} />
                  </Button>
                  để phục hồi lịch chiếu.
                </li> */}
              <li className={cx('note-item')}>
                <UilLabelAlt size={12} className={cx('list-tyle')} />
                Nhấn vào
                <Button size="sm" className={cx('btn')} variant="outline-danger">
                  <UilTimes size={18} />
                </Button>
                để xóa cấu thủ.
              </li>
            </ul>
          </div>
          <div className={cx('table')}>
            <DataTable columns={columns} data={row} />
          </div>
          {/* {DeleteConfirmationDialog()} */}
          {/* {obToast.content.length > 0 && (
              <ToastMassage dur={3000} isShow={obToast.show} header={obToast.header} content={obToast.content} />
            )} */}
        </div>

        {/* {isShowCancelShowTime && (
          <div className={cx('wrap-table')}>
            <div className={cx('view-showtime')} onClick={handleShowTime}>
              Xem danh sách lịch chiếu
            </div>
            <h2 className={cx('title')}>Danh sách lịch chiếu đã bị hủy của NTFMovies</h2>
            <div className={cx('note')}>
              Ghi chú:
              <ul className={cx('note-list')}>
                <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-primary">
                    <UilCheck size={18} />
                  </Button>
                  để phục hồi lịch chiếu.
                </li>
                <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-danger">
                    <UilTimes size={18} />
                  </Button>
                  để hủy lịch chiếu.
                </li>
              </ul>
            </div>
            <div className={cx('table')}>
              {rowCancel.length > 0 ? (
                <DataTable columns={columnsCancel} data={rowCancel} />
              ) : (
                <div className={cx('no-show-time')}>Không có lịch chiếu nào bị hủy.</div>
              )}
            </div>
            {DeleteConfirmationDialog()}
            {obToast.content.length > 0 && (
              <ToastMassage dur={3000} isShow={obToast.show} header={obToast.header} content={obToast.content} />
            )}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default TableShowPlayers;
