import { AdminLayout } from '~/layouts';
import { useEffect, useState } from 'react';
import adminService from '~/services/adminService';
import cityLogo from '~/assets/images/manchester_city.webp';
import { baseUrl } from '~/axios';
import bg1 from '~/assets/images/bg.jpg';
import classNames from 'classnames/bind';
import styles from './DetailMatch.module.scss';
const cx = classNames.bind(styles);

function DetailMatch() {
  const [match, setMatch] = useState();
  const [isLive, setIsLive] = useState(true);

  function convertTimeFormat(timeString) {
    var timeParts = timeString?.split(':');
    if (timeParts) {
      var hour = timeParts[0];
      var minute = timeParts[1];
    }
    var formattedTime = hour + ':' + minute;
    return formattedTime;
  }

  const handleGetMatchLive = async () => {
    // Tạo đối tượng Date hiện tại
    const currentDate = new Date();

    // Lấy ngày hiện tại
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}:${seconds}`;
    console.log(date, time);
    // Gửi yêu cầu HTTP với ngày và giờ hiện tại
    const res = await adminService.getMatchLive(date, time);
    if (res.live_matches.length > 0) {
      setMatch(res.live_matches[0]);
      setIsLive(true);
    } else if (res.near_matches.length > 0) {
      setMatch(res.near_matches[0]);
    }
  };

  useEffect(() => {
    handleGetMatchLive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <time>{match?.game_date}</time>
            <p>{match?.stadium.name}</p>
          </div>
          <div className={cx('fixture')}>
            <div className={cx('first')}>
              <div className={cx('name')}>{match?.host === 1 ? 'Manchester City' : match?.club.name}</div>
              <div className={cx('logo')}>
                {match?.host === 1 ? (
                  <img src={cityLogo} alt="man-city" />
                ) : (
                  <img src={`${baseUrl}${match?.club.image}`} alt="Name" />
                )}
              </div>
            </div>
            {isLive ? (
              match?.host === 1 ? (
                <>
                  <div className={cx('score')}>
                    <div className={cx('host')}>{match?.goals_scored}</div>
                    <span>-</span>
                    <div className={cx('away')}>{match?.goals_conceded}</div>
                  </div>
                  <div className={cx('minute')}>12'</div>
                </>
              ) : (
                <>
                  <div className={cx('score')}>
                    <div className={cx('away')}>{match?.goals_conceded}</div>
                    <span>-</span>
                    <div className={cx('host')}>{match?.goals_scored}</div>
                  </div>
                  <div className={cx('minute')}>12'</div>
                </>
              )
            ) : (
              <div className={cx('time')}>
                <time>{convertTimeFormat(match?.game_time)}</time>
                <p>GMT</p>
              </div>
            )}

            <div className={cx('second')}>
              {match?.host !== 1 ? (
                <img src={cityLogo} alt="man-city" />
              ) : (
                <img src={`${baseUrl}${match?.club.image}`} alt="Name" />
              )}
              <div className={cx('name')}>{match?.host !== 1 ? 'Manchester City' : match?.club.name}</div>
            </div>
          </div>
          {isLive ? <div className={cx('live')}>Live now</div> : <div className={cx('upcoming')}>Upcoming</div>}
        </div>
      </header>
    </AdminLayout>
  );
}

export default DetailMatch;
