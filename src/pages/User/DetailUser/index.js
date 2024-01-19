import classNames from 'classnames/bind';
import style from './DetailUser.module.scss';
import HeaderUser from '~/components/User/HeaderUser';
import FooterUser from '~/components/User/FooterUser';

const cx = classNames.bind(style);

function DetailUser() {
  return (
    <>
      <HeaderUser />
      <main className={cx('main-content')}>
        <header className={cx('player-header')}>
          <div className={cx('container')}>
            <h1>
              <div className={cx('first-name')}>
                <span>nathan</span>
              </div>
              <div className={cx('last-name')}>Ake</div>
            </h1>
            <div className={cx('shirt-number')}>
              <h2>#39</h2>
            </div>
            <div className={cx('image')}>
              <img src="https://www.mancity.com/meta/media/lyxf1bib/nathan-ake.png?width=600" alt="ake" />
            </div>
          </div>
        </header>
      </main>
      <FooterUser />
    </>
  );
}

export default DetailUser;
