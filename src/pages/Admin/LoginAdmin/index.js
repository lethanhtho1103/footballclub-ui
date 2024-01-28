import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginAdmin.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducer';
import { accessTokenSelector } from '~/redux/selector';
import Loader from '~/components/Loader';
import bg_player2 from '~/assets/images/bg_player2.webp';
import logo from '~/assets/images/logo.svg';
import adminService from '~/services/adminService';

const cx = classNames.bind(styles);

function LoginAdmin() {
  const btnSubmitRef = useRef();
  const userIdlRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [passInput, setPassInput] = useState('');
  const [errClass, setErrClass] = useState(false);
  const [errClassUserId, setErrClassUserId] = useState(false);
  const [errClassPass, SetErrClassPass] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const handleChange = (e, type) => {
    if (type === 'user') {
      setUserId(e.target.value);
      setErrClassUserId(false);
    } else if (type === 'password') {
      setPassInput(e.target.value);
      SetErrClassPass(false);
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      setErrMessage('The user_id field is required.');
      setErrClass(true);
      setErrClassUserId(true);
      userIdlRef.current.focus();
      return;
    } else if (!passInput) {
      setErrMessage('The password field is required.');
      setErrClass(true);
      SetErrClassPass(true);
      passRef.current.focus();
      return;
    }
    try {
      setIsLoader(true);
      const response = await adminService.login(userId, passInput);
      // Xử lý dữ liệu khi thành công
      let isLoader = setTimeout(() => {
        setIsLoader(false);
        saveUserLogin(response);
        setErrClass(false);
        clearTimeout(isLoader);
      }, 500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrClass(true);
        setErrClassUserId(true);
        SetErrClassPass(true);
        setUserId('');
        setPassInput('');
        setErrMessage('Invalid credentials.(Ref: EC4)');
        userIdlRef.current.focus();
        setIsLoader(false);
      } else {
        // Xử lý các mã lỗi khác
        console.error('Other error:', error);
      }
    }
  };

  const saveUserLogin = (data) => {
    dispatch(userSlice.actions.saveUserLogin(data));
    dispatch(userSlice.actions.toggleUserLogin(true));
  };

  const accessToken = useSelector(accessTokenSelector);

  const handleNavigate = useCallback(() => {
    if (accessToken) {
      navigate('/admin');
    }
  }, [accessToken, navigate]);

  const handleKeyDownSubmit = () => {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) btnSubmitRef?.current.click();
    });
  };

  useEffect(() => {
    handleNavigate();
    handleKeyDownSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <>
      {isLoader && <Loader />}
      <nav className={cx('global-nav')}>
        <div className={cx('logo-wrapper')}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </nav>
      <div className={cx('player-banner')}>
        <div className={cx('background')} />
        <img className={cx('image-player')} src={bg_player2} alt="player" />
      </div>
      <main className={cx('container', 'page-wrapper')}>
        <div className={cx('tab-header')}>
          <Link className={cx('sign-in', 'button-tab')} to="/login">
            Sign In
          </Link>
        </div>

        <section className={cx('page-content')}>
          <div
            className={cx('notification-box', 'invalid', {
              errClass: errClass === false,
            })}
          >
            <div className={cx('notification-box__text')}>
              <span>{errMessage}</span>
            </div>
          </div>
          <Form className={cx('form')}>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control
                value={userId}
                ref={userIdlRef}
                className={cx({ errorClassEmail: errClassUserId === true })}
                onChange={(e) => handleChange(e, 'user')}
                required
                id="user"
                autoComplete="off"
              />
              <Form.Label className={cx('title-input')} htmlFor="user">
                <FontAwesomeIcon icon={faEnvelope} bounce />
                User_id
              </Form.Label>
            </Form.Group>

            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control
                ref={passRef}
                value={passInput}
                onChange={(e) => handleChange(e, 'password')}
                required
                className={cx({ errorClassPassword: errClassPass === true })}
                type="password"
                id="password"
              />
              <Form.Label className={cx('title-input')} htmlFor="password">
                <FontAwesomeIcon icon={faLock} bounce />
                Password
              </Form.Label>
            </Form.Group>
            <Form.Group className={cx('remember-forgot')}>
              <Form.Label>
                <input className={cx('check')} type="checkbox" />
                Remember me
              </Form.Label>
              <Link to="/"> Forgot your password? </Link>
            </Form.Group>
            <div>
              <Button ref={btnSubmitRef} onClick={handleSubmit} className={cx('submit')}>
                Sign In
              </Button>
            </div>
          </Form>
          <div className={cx('notification-box')}>
            <p className={cx('notification-box__text')}>
              <strong>
                This is the Admin Login Page. Please enter Admin login information to access administrative functions.
              </strong>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default LoginAdmin;
