import { AdminLayout } from '~/layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import adminService from '~/services/adminService';
import cityLogo from '~/assets/images/manchester_city.webp';
import { baseUrl } from '~/axios';
import bg1 from '~/assets/images/bg.jpg';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
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
      <header className={cx('header')}>
        <div className={cx('background')}>
          <img src={bg1} alt="bg1"></img>
        </div>
        <div className={cx('wrapper')}>
          <div className={cx('competition')}>Premier League</div>
          <div className={cx('venue')}>
            <time>22-10-2024</time>
            <p>Eithad stadium</p>
          </div>
          <div className={cx('fixture')}>
            <div className={cx('first')}>
              <div className={cx('name')}>Manchester City</div>
              <div className={cx('logo')}>
                <img src={cityLogo} alt="man-city" />
              </div>
            </div>
            <div className={cx('time')}>
              <time>22:00</time>
              <p>GMT</p>
            </div>
            <div className={cx('second')}>
              <img src={`${baseUrl}`} alt="Name" />
              <div className={cx('name')}>Tottenham</div>
            </div>
          </div>
          <div className={cx('live')}>Live now</div>
        </div>
      </header>
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
