import { AdminLayout } from '~/layouts';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faBan,
  faHourglassHalf,
  faUserTie,
  faUser,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Dashboard() {
  return (
    <AdminLayout>
      <div className={cx('containPage')}>
        <div className={cx('listCard')}>
          <div className={cx('row', 'pl-3')}>
            {/* <div className={cx('col')}>
              <div className={cx('cardInfo')}>
                <div className={cx('leftCard')}>
                  <div className={cx('iconCard')}>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </div>
                </div>
                <div className={cx('rightCard')}>
                  <div className={cx('numberCard')}>18</div>
                  <div className={cx('nameCard')}>Đơn mượn</div>
                </div>
              </div>
            </div>
            <div className={cx('col', 'd-flex')}>
              <div className={cx('cardInfo')}>
                <div className={cx('leftCard')}>
                  <div className={cx('iconCard')} style={{ backgroundColor: '#e9a4a4' }}>
                    <FontAwesomeIcon icon={faBan} style={{ color: '#d50d0d' }} />
                  </div>
                </div>
                <div className={cx('rightCard')}>
                  <div className={cx('numberCard')}>9</div>
                  <div className={cx('nameCard')}>Đơn mượn đã hủy</div>
                </div>
              </div>
            </div> */}
            <div className={cx('col', 'd-flex')}>
              <div className={cx('cardInfo')} style={{ backgroundColor: '#4747a1' }}>
                <div className={cx('leftCard')}>
                  <div className={cx('iconCard')} style={{ backgroundColor: '#cbe2ff' }}>
                    <FontAwesomeIcon icon={faUserTie} style={{ color: '#05b9aa' }} />
                  </div>
                </div>
                <div className={cx('rightCard')}>
                  <div className={cx('numberCard')}>2</div>
                  <div className={cx('nameCard')}>Coaches</div>
                </div>
              </div>
            </div>
            <div className={cx('col', 'd-flex')}>
              <div className={cx('cardInfo')} style={{ backgroundColor: '#7978e9' }}>
                <div className={cx('leftCard')}>
                  <div className={cx('iconCard')} style={{ backgroundColor: '#cdf1ef' }}>
                    <FontAwesomeIcon icon={faUserTie} style={{ color: '#05b9aa' }} />
                  </div>
                </div>
                <div className={cx('rightCard')}>
                  <div className={cx('numberCard')}>10</div>
                  <div className={cx('nameCard')}>Players</div>
                </div>
              </div>
            </div>
            <div className={cx('col', 'd-flex')}>
              <div className={cx('cardInfo')} style={{ backgroundColor: '#f3797e' }}>
                <div className={cx('leftCard')}>
                  <div className={cx('iconCard')} style={{ backgroundColor: '#e5cff7' }}>
                    <FontAwesomeIcon icon={faUserTie} style={{ color: '#05b9aa' }} />
                  </div>
                </div>
                <div className={cx('rightCard')}>
                  <div className={cx('numberCard')}>8</div>
                  <div className={cx('nameCard')}>Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
