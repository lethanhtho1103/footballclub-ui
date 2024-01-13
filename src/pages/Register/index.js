import { Link } from 'react-router-dom';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import { Button, Form } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { userService } from '~/services';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

function Register() {
  const btnSubmitRef = useRef();
  const fullNameRef = useRef();
  const emailRef = useRef();
  const confPassRef = useRef();
  const passRef = useRef();

  const [fullName, setFullName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [confPass, setConfPass] = useState('');
  const [errInput, setErrInput] = useState('');
  const [errClass, setErrClass] = useState(false);
  const [successClass, setSuccessClass] = useState(false);
  const [errClassFullName, setErrClassFullName] = useState(false);
  const [errClassEmail, setErrClassEmail] = useState(false);
  const [errClassPass, SetErrClassPass] = useState(false);
  const [errClassConf, SetErrClassConf] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  const handleChange = (e, type) => {
    if (type === 'email') {
      setEmailInput(e.target.value);
    } else if (type === 'pass') {
      setPassInput(e.target.value);
    } else if (type === 'fullName') {
      setFullName(e.target.value);
    } else if (type === 'confPass') {
      setConfPass(e.target.value);
    }
  };

  const handelSubmit = async () => {
    if (fullName.length === 0) {
      setErrClass(true);
      setErrClassFullName(true);
      fullNameRef.current.focus();
      setErrInput('Full name is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(emailInput);
    if (!isValid) {
      setErrClass(true);
      setErrClassEmail(true);
      setErrInput('Please enter a valid email address');
      emailRef.current.focus();
      return;
    }
    if (passInput.length < 8) {
      setErrClass(true);
      SetErrClassPass(true);
      setErrInput('Password must be longer than 7 characters');
      passRef.current.focus();
      return;
    }
    if (confPass !== passInput) {
      setErrClass(true);
      SetErrClassConf(true);
      setErrInput('Field required and passwords need to match.');
      setConfPass('');
      confPassRef.current.focus();
      return;
    }
    setIsLoader(true);
    let isLoader = await setTimeout(async () => {
      const res = await userService.register(fullName, emailInput, passInput);
      setIsLoader(false);
      clearTimeout(isLoader);
      if (res.user) {
        setErrInput(res.message);
        setSuccessClass(true);
        setErrClassFullName(false);
        setErrClassEmail(false);
        SetErrClassPass(false);
        SetErrClassConf(false);
      }
    }, 500);
  };

  const handleKeyDownSubmit = () => {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) btnSubmitRef?.current.click();
    });
  };

  useEffect(() => {
    handleKeyDownSubmit();
  });

  return (
    <>
      {isLoader && <Loader />}
      <nav className={cx('global-nav')}>
        <div className={cx('logo-wrapper')}>
          <Link to="/">
            <img src="https://www.mancity.com/dist/images/logos/crest.svg" alt="logo" />
          </Link>
        </div>
      </nav>
      <div className={cx('player-banner')}>
        <div className={cx('background')} />
        <img
          className={cx('image-player')}
          src="https://login.mancity.com/Content/Images/sample-players/v4/11.png"
          alt="player"
        />
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
              successClass: successClass === true,
            })}
          >
            <div className={cx('notification-box__text')}>
              <span>{errInput}</span>
            </div>
          </div>
          <Form>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control
                ref={fullNameRef}
                value={fullName}
                required
                id="fullName"
                className={cx({ errorClassFullName: errClassFullName === true })}
                autoComplete="off"
                onChange={(e) => handleChange(e, 'fullName')}
              />
              <Form.Label
                className={cx('title-input', {
                  errFullNameClass: true,
                })}
                htmlFor="fullName"
              >
                <FontAwesomeIcon icon={faUser} bounce />
                Full Name
              </Form.Label>
            </Form.Group>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control
                value={emailInput}
                ref={emailRef}
                required
                id="email"
                className={cx({ errorClassEmail: errClassEmail === true })}
                autoComplete="off"
                onChange={(e) => handleChange(e, 'email')}
              />
              <Form.Label className={cx('title-input')} htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} bounce />
                Email Address
              </Form.Label>
            </Form.Group>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control
                ref={passRef}
                value={passInput}
                required
                type="password"
                id="password"
                className={cx({ errorClassPass: errClassPass === true })}
                onChange={(e) => handleChange(e, 'pass')}
              />
              <Form.Label className={cx('title-input')} htmlFor="password">
                <FontAwesomeIcon icon={faLock} bounce />
                Password
              </Form.Label>
            </Form.Group>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control
                value={confPass}
                ref={confPassRef}
                required
                type="password"
                id="confirm_password"
                className={cx({ errorClassConf: errClassConf === true })}
                onChange={(e) => handleChange(e, 'confPass')}
              />
              <Form.Label className={cx('title-input')} htmlFor="confirm_password">
                <FontAwesomeIcon icon={faLock} bounce />
                Confirm Password
              </Form.Label>
            </Form.Group>

            <div>
              <Button onClick={handelSubmit} className={cx('submit')}>
                Register
              </Button>
            </div>
          </Form>
          <div className={cx('notification-box')}>
            <p className={cx('notification-box__text')}>
              <strong>
                By submitting your details, you agree to the use of your data by City Football Group in accordance with
                our Privacy Policy. We use your data to personalise and improve your experience on our platforms,
                provide services you request and learn about your interests.
              </strong>
            </p>
          </div>
          <div className={cx('register-link')}>
            Already have an account?
            <Link to="/login">Sign in</Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;
