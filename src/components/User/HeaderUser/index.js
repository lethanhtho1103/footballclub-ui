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

import { useDispatch, useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';
import { userSlice } from '~/redux/reducer';
import { useEffect, useState } from 'react';
import { userService } from '~/services';

const cx = classNames.bind(styles);

function HeaderUser() {
  const dispatch = useDispatch();
  const [infoUser, setInfoUser] = useState({});

  const access_token = useSelector(accessTokenSelector);

  const handleLogout = () => {
    dispatch(userSlice.actions.logOutUser());
  };

  const handelGetInfoName = async () => {
    const res = await userService.getInfoUser({ access_token });
    setInfoUser(res);
  };

  useEffect(() => {
    handelGetInfoName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <Link to="/players">Players</Link>
              </li>
              <li className={cx('nav-item')}>
                <Link to="/ticket">Tickets</Link>
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
                            {infoUser.name}
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