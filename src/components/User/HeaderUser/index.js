import { Link } from 'react-router-dom';
import styles from './HeaderUser.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HeaderUser() {
  return (
    <header className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <Link to="/" className={cx('logo')}>
            <img src="https://www.mancity.com/dist/images/logos/crest.svg" alt="Logo" />
          </Link>
          <nav className={cx('nav-primary')}>
            <ul className={cx('nav-list')}>
              <li className={cx('nav-item')}>
                <Link to="/news">News</Link>
              </li>
              <li className={cx('nav-item')}>
                <Link to="/player">Player</Link>
              </li>
              <li className={cx('nav-item')}>
                <Link to="/ticket">Ticket</Link>
              </li>
              <li className={cx('nav-item')}>
                <Link to="/shop">Shop</Link>
              </li>
            </ul>
          </nav>
          <nav className={cx('nav-secondary')}>
            <ul className={cx('nav-list')}>
              <li className={cx('nav-item')}>
                <span className={cx('thumbnail')}>
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                <span className={cx('language')}>EN</span>
              </li>
              <li className={cx('nav-item')}>
                <Link to="/login">
                  <span className={cx('text')}>Login</span>
                  <span className={cx('thumbnail')}>
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderUser;
