import { Link } from 'react-router-dom';
import styles from './HeaderUser.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faCaretDown,
  faGear,
  faGlobe,
  faMessage,
  faTicket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import logo from '~/assets/images/logo.svg';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducer';
import { useContext } from 'react';
import { InfoUserContext } from '~/Context/InfoUserContext';

const cx = classNames.bind(styles);

function HeaderUser() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userSlice.actions.logOutUser());
  };

  const { infoUser, access_token } = useContext(InfoUserContext);

  return (
    <header className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <Link to="/" className={cx('logo')}>
            <img src={logo} alt="Logo" />
          </Link>
          <nav className={cx('nav-primary')}>
            <ul className={cx('nav-list')}>
              <li className={cx('nav-item')}>
                <Link to="/players">Players</Link>
              </li>
              <li className={cx('nav-item')}>
                <Link to="/tickets">Tickets</Link>
              </li>
              <li className={cx('nav-item')}>
                <Link to="/results">Results</Link>
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
                {access_token ? (
                  <div className={cx('icon-out')}>
                    <div className={cx('logout')}>
                      <div className={cx('icon-user')}>
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faCaretDown} />
                        <div className={cx('menu')}>
                          <h2>
                            <span>
                              <FontAwesomeIcon icon={faUser} />
                            </span>
                            {infoUser?.name}
                          </h2>
                          <ul>
                            <li>
                              <a href="/my-ticket">
                                <FontAwesomeIcon icon={faTicket} />
                                My ticket
                              </a>
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faMessage} />
                              Feedback
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faGear} />
                              Setting
                            </li>
                            <li onClick={handleLogout}>
                              <FontAwesomeIcon icon={faArrowRightFromBracket} />
                              Log out
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">
                    <span className={cx('text')}>Login</span>
                    <span className={cx('thumbnail')}>
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderUser;
