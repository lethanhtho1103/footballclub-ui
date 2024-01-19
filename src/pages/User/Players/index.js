import HeaderUser from '~/components/User/HeaderUser';
import styles from './Players.module.scss';
import classNames from 'classnames/bind';
import FooterUser from '~/components/User/FooterUser';
import { useEffect, useState } from 'react';
import { userService } from '~/services';
import PlayerSection from '~/components/User/PlayerSection';

const cx = classNames.bind(styles);
function Players() {
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const handleGetAllData = async () => {
    try {
      // Sử dụng Promise.all để gọi cả hai hàm cùng một lúc
      const [playersResponse, coachesResponse] = await Promise.all([
        userService.getAllPlayers(),
        userService.getAllCoaches(),
      ]);

      // Xử lý kết quả của playersResponse
      if (playersResponse) {
        setPlayers(playersResponse.players);
      }

      // Xử lý kết quả của coachesResponse
      if (coachesResponse) {
        setCoaches(coachesResponse.coaches);
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi lấy danh sách người chơi hoặc HLV:', error);
    }
  };

  useEffect(() => {
    handleGetAllData();
  }, []);

  return (
    <div className={cx('mc-page')}>
      <HeaderUser />
      <main className={cx('contain')}>
        <header className={cx('header')}>
          <div className={cx('container')}>
            <div className={cx('sub-header')}>
              <h1>Players</h1>
              <div className={cx('sponsor')}>
                <span>BROUGHT TO YOU BY</span>
                <img src="https://www.mancity.com/dist/images/puma_crest.png" alt="sponsor" />
              </div>
            </div>
          </div>
        </header>
        <div className={cx('squad-group')}>
          <PlayerSection title="GOALKEEPERS" position="Goalkeeper" players={players} cx={cx} />
          <PlayerSection title="DEFENDERS" position="Defender" players={players} cx={cx} />
          <PlayerSection title="MIDFIELDERS" position="Midfielder" players={players} cx={cx} />
          <PlayerSection title="FORWARDS" position="Forward" players={players} cx={cx} />
          <PlayerSection title="COACHES" position="Coaches" players={players} coaches={coaches} cx={cx} />
        </div>
        <FooterUser />
      </main>
    </div>
  );
}

export default Players;
