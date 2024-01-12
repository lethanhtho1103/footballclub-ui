import { Link } from 'react-router-dom';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import { Button, Form } from 'react-bootstrap';

const cx = classNames.bind(styles);

function Register() {
  return (
    <>
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
          <Form>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control required id="user" autoComplete="off" />
              <Form.Label className={cx('title-input')} htmlFor="user">
                <FontAwesomeIcon icon={faUser} bounce />
                Full Name
              </Form.Label>
            </Form.Group>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control required id="user" autoComplete="off" />
              <Form.Label className={cx('title-input')} htmlFor="user">
                <FontAwesomeIcon icon={faEnvelope} bounce />
                Email Address
              </Form.Label>
            </Form.Group>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control required type="password" id="password" />
              <Form.Label className={cx('title-input')} htmlFor="password">
                <FontAwesomeIcon icon={faLock} bounce />
                Password
              </Form.Label>
            </Form.Group>
            <Form.Group className={cx('mb-4', 'form-gr')}>
              <Form.Control required type="password" id="password" />
              <Form.Label className={cx('title-input')} htmlFor="password">
                <FontAwesomeIcon icon={faLock} bounce />
                Confirm Password
              </Form.Label>
            </Form.Group>
            <Form.Group className={cx('remember-forgot')}>
              {/* <Form.Label>
                <input className={cx('check')} type="checkbox" />
                Remember me
              </Form.Label>
              <Link to="/"> Forgot your password? </Link> */}
            </Form.Group>
            {/* <span className={cx('err')}>{errInput}</span> */}
            <div>
              <Button className={cx('submit')}>Register</Button>
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
