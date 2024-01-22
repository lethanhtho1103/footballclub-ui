import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginUser.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { userSlice } from '~/redux/reducer';
import { accessTokenSelector } from '~/redux/selector';
import { userService } from '~/services';
import Loader from '~/components/Loader';
import bg_player1 from '~/assets/images/bg_player1.webp';
import logo from '~/assets/images/logo.svg';

const cx = classNames.bind(styles);

function LoginUser() {
  const btnSubmitRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailInput, setEmail] = useState('');
  const [passInput, setPassInput] = useState('');
  const [errClass, setErrClass] = useState(false);
  const [errClassEmail, setErrClassEmail] = useState(false);
  const [errClassPass, SetErrClassPass] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const handleChange = (e, type) => {
    if (type === 'user') {
      setEmail(e.target.value);
      setErrClassEmail(false);
    } else if (type === 'password') {
      setPassInput(e.target.value);
      SetErrClassPass(false);
    }
  };

  const handleSubmit = async () => {
    if (!emailInput) {
      setErrMessage('The email field is required.');
      setErrClass(true);
      setErrClassEmail(true);
      emailRef.current.focus();
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
      const response = await userService.login(emailInput, passInput);
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
        setErrClassEmail(true);
        SetErrClassPass(true);
        setEmail('');
        setPassInput('');
        setErrMessage('Invalid credentials.(Ref: EC4)');
        emailRef.current.focus();
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
      navigate('/');
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
  }, [handleNavigate, accessToken]);

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
        <img className={cx('image-player')} src={bg_player1} alt="player" />
      </div>
      <main className={cx('container', 'page-wrapper')}>
        <div className={cx('tab-header')}>
          <Link className={cx('sign-in', 'button-tab')} to="/login">
            Sign In
          </Link>
          <Link className={cx('register', 'button-tab')} to="/register">
            Register
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
          <Form>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control
                value={emailInput}
                ref={emailRef}
                className={cx({ errorClassEmail: errClassEmail === true })}
                onChange={(e) => handleChange(e, 'user')}
                required
                id="user"
                autoComplete="off"
              />
              <Form.Label className={cx('title-input')} htmlFor="user">
                <FontAwesomeIcon icon={faEnvelope} bounce />
                Email Address or Supporter Number
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
                You can access our preference centre at any time to opt-out of marketing communications and control how
                we use your data. Please note, you will still receive general communications, including ticket sales and
                important club notifications.
              </strong>
            </p>
          </div>
          <div className={cx('register-link')}>
            Don't have an account?
            <Link to="/register">Register Now</Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default LoginUser;
