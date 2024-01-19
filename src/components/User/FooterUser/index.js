/* eslint-disable react/jsx-no-target-blank */
import { UilInstagram, UilLinkedin, UilTwitter, UilYoutube, UilFacebookF } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import styles from './FooterUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
const cx = classNames.bind(styles);

function FooterUser() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Fragment>
      <div className={cx('partners')}>
        <ul className={cx('list-partners')}>
          <li className={cx('partners-item')}>
            <Link to="https://www.etihad.com/en/" target="_blank">
              <img
                src="https://www.mancity.com/meta/media/hpnbkq5d/partner_logo_etihad.png?width=160&height=80"
                alt="Etihad"
              />
            </Link>
          </li>
          <li className={cx('partners-item')}>
            <Link to="https://uk.puma.com/uk/en" target="_blank">
              <img
                src="https://www.mancity.com/meta/media/j20jxszx/partner_logo_puma.png?width=160&height=80"
                alt="Puma"
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className={cx('container')}>
        <div className={cx('wrapper')}>
          <div className={cx('bor1')}>
            <Link to="/" className={cx('logo')}>
              <img src="https://www.mancity.com/dist/images/logos/crest.svg" alt="Logo" />
            </Link>
            <div className={cx('social')}>
              <div>
                <a target="_blank" href="https://www.facebook.com/mancity/">
                  <UilFacebookF />
                </a>
              </div>
              <div>
                <a target="_blank" href="https://www.instagram.com/mancity/">
                  <UilInstagram />
                </a>
              </div>
              <div>
                <a target="_blank" href="https://www.linkedin.com/company/manchester-city-football-club">
                  <UilLinkedin />
                </a>
              </div>
              <div>
                <a target="_blank" href="https://twitter.com/mancity">
                  <UilTwitter />
                </a>
              </div>
              <div>
                <a target="_blank" href="https://www.youtube.com/mancity">
                  <UilYoutube />
                </a>
              </div>
            </div>
            <div className={cx('back-top')} onClick={scrollToTop}>
              <span>Back to the top </span>
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </div>
          <div className={cx('box2')}>
            <h3> Copyright &#169; 2024 , All rights reserved. Powered by Le Thanh Tho and Mai Le Anh Thinh.</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FooterUser;
