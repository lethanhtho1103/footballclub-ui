import classNames from 'classnames/bind';
import style from './DetailPlayer.module.scss';
import HeaderUser from '~/components/User/HeaderUser';
import FooterUser from '~/components/User/FooterUser';
import { useEffect, useState } from 'react';
import { userService } from '~/services';
import { useParams } from 'react-router-dom';
import { baseUrl } from '~/axios';

const cx = classNames.bind(style);

function DetailUser() {
  const [player, setPlayer] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { name } = useParams();

  const handleGetOnePlayer = async () => {
    try {
      const res = await userService.getOnePlayer({ name });
      const playerData = res.player;

      if (playerData) {
        setPlayer(playerData);
        setFirstName(playerData?.name.split(' ')[0] || '');
        setLastName(playerData?.name.split(' ').slice(1).join(' ') || '');
      } else {
        // Xử lý khi không có dữ liệu player
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  useEffect(() => {
    handleGetOnePlayer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      <HeaderUser />
      <main className={cx('main-content')}>
        <header className={cx('player-header')}>
          <div className={cx('container')}>
            <h1>
              <div className={cx('first-name')}>
                <span>{firstName}</span>
              </div>
              <div className={cx('last-name')}>{lastName}</div>
            </h1>
            <div className={cx('shirt-number')}>
              <h2>#{player.jersey_number}</h2>
            </div>
            <div className={cx('image')}>
              <img src={`${baseUrl}${player.image}`} alt={player.name} />
            </div>
          </div>
        </header>
        <div className={cx('sub-header')}>
          <div className={cx('container')}>
            <div className={cx('list-tab')}>
              <div className={cx('tab-item')}>Profile</div>
            </div>
          </div>
        </div>
        <article className={cx('profile')}>
          <div className={cx('container')}>
            <div className={cx('wrapper')}>
              <div className={cx('bio')}>
                <h3 className={cx('title')}>BIO</h3>
                <div className={cx('text')}>
                  <div className={cx('content')}>
                    <p>
                      <strong>ONE OF WORLD FOOTBALL'S MOST EXCITING TALENTS...</strong>
                    </p>
                    <p>
                      The 27-year-old Swiss central defender joined from Borussia Dortmund in September 2022, with
                      Manuel having made more than 150 appearances in total for the Bundesliga club.
                    </p>
                    <p>
                      He began his career at FC Winterthur in his homeland before moving to Basel, where he impressed
                      enough in his three seasons to convince Dortmund to swoop for him in January 2018.
                    </p>
                  </div>
                </div>
              </div>

              <div className={cx('info')}>
                <h3>Info</h3>
                <ul className={cx('list-info')}>
                  <li className={cx('info-item')}>
                    <div className={cx('label')}>Date of birth</div>
                    <div className={cx('content')}>{player.date_of_birth}</div>
                  </li>
                  <li className={cx('info-item')}>
                    <div className={cx('label')}>Nationality</div>
                    <div className={cx('content')}>
                      <div>{player.nationality}</div>
                      <img src={`https://flagcdn.com/h60/${player.flag}.png`} alt="No flag" />
                    </div>
                  </li>
                  <li className={cx('info-item')}>
                    <div className={cx('label')}>Position</div>
                    <div className={cx('content')}>{player.position}</div>
                  </li>
                  <li className={cx('info-item')}>
                    <div className={cx('label')}>Joined City</div>
                    <div className={cx('content')}>{player.contract || `1-1-1991`}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </main>
      <FooterUser />
    </>
  );
}

export default DetailUser;
