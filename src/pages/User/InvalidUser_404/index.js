import classNames from 'classnames/bind';
import style from './InvalidUser_404.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
function InvalidUser_404() {
  return (
    <div className={cx('wrap')}>
      <div className={cx('container')}>
        <div className={cx('number')}>404</div>
        <div className={cx('title')}>Page Not Found</div>
        <div className={cx('description')}>
          We can't seem to find the page you're after. Please check the link and try again.!
        </div>
        <Link to="/" className={cx('btn')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Go back to the main page
        </Link>
      </div>
    </div>
  );
}

export default InvalidUser_404;
