import classNames from 'classnames/bind';
import style from './BuyTicket.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import bg1 from '~/assets/images/bg1.webp';

const cx = classNames.bind(style);

function BuyTicket() {
  return (
    <div>
      <HeaderUser />
      <main className={cx('main-content')}>
        <header className={cx('header')}>
          <div className={cx('background')}>
            <img src={bg1} alt="bg1"></img>
          </div>
          <div className={cx('container')}>
            <div className={cx('competition')}>Premier League</div>
            <div className={cx('venue')}>
              <time>Wed 03 Apr</time>
              <p>Etihad Stadium</p>
            </div>
            <div className={cx('fixture')}>
              <div className={cx('first')}>
                <div className={cx('name')}>Tottenham Hotspur</div>
                <img
                  src="https://www.mancity.com/meta/media/t02jppxo/spurs-logo-with-outline.png?width=52&height=52"
                  alt="first-name"
                />
              </div>
              <div className={cx('time')}>
                <time>14:00</time>
                <p>GMT</p>
              </div>
              <div className={cx('second')}>
                <div className={cx('logo')}>
                  <img
                    src="https://www.mancity.com/meta/media/yzscd2rf/manchester_city_fc_badge.png?width=60&height=60"
                    alt="second-name"
                  />
                </div>
                <div className={cx('name')}>Manchester City</div>
              </div>
            </div>
          </div>
        </header>
        <div className={cx('body')}>
          <div className={cx('container')}></div>
        </div>
      </main>
      <FooterUser />
    </div>
  );
}

export default BuyTicket;
