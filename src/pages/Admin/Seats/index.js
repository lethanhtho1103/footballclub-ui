import classNames from 'classnames/bind';
import styles from './Seats.module.scss';
import { AdminLayout } from '~/layouts';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ModalCreateSeats from '~/components/Admin/ModalCreateSeats';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';
import { userService } from '~/services';
import { UilAngleRight } from '@iconscout/react-unicons';
import Loader from '~/components/Loader';
import ToastMassage from '~/components/Admin/ToastMassage';

const cx = classNames.bind(styles);

function Seats() {
  const access_token = useSelector(accessTokenSelector);
  const [isLoader, setIsLoader] = useState(false);
  const [area, setArea] = useState('E');
  const [seats, setSeats] = useState([]);
  const [isShowModalCreateSeats, setIsShowModalCreateSeats] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const handleClose = () => {
    setIsShowModalCreateSeats(false);
  };
  const seatData = [
    { id: 'east', label: 'East stand', stand: 'E' },
    { id: 'west', label: 'West stand', stand: 'W' },
    { id: 'north', label: 'North bank', stand: 'N' },
    { id: 'block', label: 'South end', stand: 'S' },
  ];

  const getColorClass = (type) => {
    if (type === 'Normal') {
      return 'Normal';
    } else if (type === 'VIP') {
      return 'VIP';
    } else if (type === 'VVIP') {
      return 'VVIP';
    }
  };

  const handleShowSeatsOfArea = async (stand) => {
    setIsLoader(true);
    setArea(stand);
    setTimeout(async () => {
      const res = await userService.getAllSeats(0, stand);
      setSeats(res.seats);
      setIsLoader(false);
    }, 500);
  };

  useEffect(() => {
    handleShowSeatsOfArea(area);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area]);
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        {isShowModalCreateSeats && (
          <ModalCreateSeats
            handleClose={handleClose}
            access_token={access_token}
            isUpdate={isUpdate}
            isDelete={isDelete}
            handleShowSeatsOfArea={handleShowSeatsOfArea}
          />
        )}
        <div className={cx('note')}>
          Actions:
          <div className={cx('btn-actions')}>
            <Button
              className={cx('btn', 'btn-add')}
              onClick={() => {
                setIsUpdate(false);
                setIsDelete(false);
                setIsShowModalCreateSeats(true);
              }}
            >
              <span class="material-symbols-outlined">add_circle</span>
              <span style={{ marginLeft: '4px' }}>Add seats</span>
            </Button>
            <Button
              className={cx('btn', 'btn-edit')}
              onClick={() => {
                setIsDelete(false);
                setIsUpdate(true);
                setIsShowModalCreateSeats(true);
              }}
            >
              <span class="material-symbols-outlined">edit_square</span>
              <span style={{ marginLeft: '4px' }}>Edit seats</span>
            </Button>
            <Button
              className={cx('btn', 'btn-delete')}
              onClick={() => {
                setIsUpdate(false);
                setIsDelete(true);
                setIsShowModalCreateSeats(true);
              }}
            >
              <span class="material-symbols-outlined">delete</span>
              <span style={{ marginLeft: '4px' }}>Delete seats</span>
            </Button>
          </div>
        </div>
        <div>
          {isLoader && <Loader />}
          <main className={cx('main-content')}>
            {obToast?.content?.length > 0 && (
              <ToastMassage
                isShow={obToast.show}
                content={obToast.content}
                handleClose={() => setObToast({ content: '' })}
              />
            )}
            <div className={cx('body')}>
              <div className={cx('container')}>
                <div className={cx('sidebar')}>
                  <h3 className={cx('title')}>Choose by area</h3>
                  {seatData.map((data, index) => (
                    <div
                      key={index}
                      className={cx('choose-area', {
                        choice: area === data.stand,
                      })}
                      disabled={area === data.stand}
                      onClick={() => {
                        if (area !== data.stand) {
                          handleShowSeatsOfArea(data.stand);
                        }
                      }}
                    >
                      <div className={cx('area')}>
                        <div className={cx('info')}>
                          <div className={cx('firstLine')}>
                            <span>{data.stand}</span>
                            <span>|</span>
                            <span>{data.label}</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('percent')}>
                        <span>{data.percent}</span>
                        <UilAngleRight />
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx('map-seat')}>
                  <h3>Stadium seating list</h3>
                  <div className={cx('list-note')}>
                    <div className={cx('note-item')}>
                      <div className={cx('normal')}></div>
                      <span>Normal seats</span>
                    </div>
                    <div className={cx('note-item')}>
                      <div className={cx('vip')}></div>
                      <span>VIP seats</span>
                    </div>
                    <div className={cx('note-item')}>
                      <div className={cx('vvip')}></div>
                      <span>VVIP seats</span>
                    </div>
                  </div>
                  {seats.length > 0 ? (
                    <div className={cx('button-container')}>
                      {seats.map((seat, index) => (
                        <button
                          key={seat.seat_id}
                          className={cx('custom-button', {
                            normal: getColorClass(seat.type) === 'Normal',
                            vip: getColorClass(seat.type) === 'VIP',
                            vvip: getColorClass(seat.type) === 'VVIP',
                          })}
                          disabled={seat.ticket_id !== null}
                        >
                          {seat.seat_id}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={cx('no-seats')}>No seats</div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Seats;
