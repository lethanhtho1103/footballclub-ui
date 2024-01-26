import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducer';
import { useContext } from 'react';
import { InfoUserContext } from '~/Context/InfoUserContext';
import logo from '~/assets/images/logo.svg';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ links }) {
  const ref = useRef();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userSlice.actions.logOutUser());
  };

  const { infoUser } = useContext(InfoUserContext);

  return (
    <div ref={ref} className={cx('wrap')}>
      <div className={cx('wrapper')}>
        <Row className="h-100 align-items-center  px-3">
          <Col md={3}>
            <Link to="/admin" className={cx('logo')}>
              <img src={logo} alt="logo" />
            </Link>
          </Col>
          <Col md={6}>
            <ul className="nav justify-content-end nav-pills justify-content-end">
              {links &&
                links.map((link, i) => (
                  <li key={i + 'linksHeader'} className="nav-item mx-2">
                    <Link className={cx('nav-link', 'nav-item-link')} style={{ fontSize: 14 }} to={link.to}>
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </Col>
          <Col md={3}>
            <h2 className={cx('text-content')}>
              <span>
                Hi <b>{infoUser.name} !</b>
              </span>
              <Link to="/admin/login" title="Sign out?" onClick={handleLogout}>
                <FontAwesomeIcon className={cx('icon-out')} icon={faArrowRightFromBracket} />
              </Link>
            </h2>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Header;
