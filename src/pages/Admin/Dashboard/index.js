import { AdminLayout } from '~/layouts';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import adminService from '~/services/adminService';

const cx = classNames.bind(styles);

function Dashboard() {
  const [data, setData] = useState([]);

  const handleGetDashboard = async () => {
    const res = await adminService.getDashboard();
    console.log(res[0]);
    setData(res[0]);
  };
  useEffect(() => {
    handleGetDashboard();
  }, []);
  return (
    <AdminLayout>
      <div className={cx('containPage')}>
        <div className={cx('listCard')}>
          <div className={cx('row', 'pl-3')}>
            <div className={cx('col', 'd-flex')}>
              <div className={cx('cardInfo')} style={{ backgroundColor: '#7978e9' }}>
                <div className={cx('leftCard')}>
                  <div className={cx('iconCard')} style={{ backgroundColor: '#cdf1ef' }}>
                    <FontAwesomeIcon icon={faUserTie} style={{ color: '#05b9aa' }} />
                  </div>
                </div>
                <div className={cx('rightCard')}>
                  <div className={cx('numberCard')}>{data.player_number}</div>
                  <div className={cx('nameCard')}>Players</div>
                </div>
              </div>
            </div>
            <div className={cx('col', 'd-flex')}>
              <div className={cx('cardInfo')} style={{ backgroundColor: '#4747a1' }}>
                <div className={cx('leftCard')}>
                  <div className={cx('iconCard')} style={{ backgroundColor: '#cbe2ff' }}>
                    <FontAwesomeIcon icon={faUserTie} style={{ color: '#05b9aa' }} />
                  </div>
                </div>
                <div className={cx('rightCard')}>
                  <div className={cx('numberCard')}>{data.coach_number}</div>
                  <div className={cx('nameCard')}>Coaches</div>
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
                  <div className={cx('numberCard')}>{data.customer_number}</div>
                  <div className={cx('nameCard')}>Users</div>
                </div>
              </div>
            </div>
            <div className={cx('col', 'd-flex')}>
              <div className={cx('cardInfo')} style={{ backgroundColor: '#f36944' }}>
                <div className={cx('leftCard')}>
                  <div className={cx('iconCard')} style={{ backgroundColor: '#e5cff7' }}>
                    <FontAwesomeIcon icon={faBuilding} style={{ color: '#05b9aa' }} />
                  </div>
                </div>
                <div className={cx('rightCard')}>
                  <div className={cx('numberCard')}>{data.company_number}</div>
                  <div className={cx('nameCard')}>Company</div>
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
