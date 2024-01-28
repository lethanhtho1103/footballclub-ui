import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import {
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faGear,
  faSignOut,
  faCoins,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';
import Image from '~/components/Images';
import Menu from '~/components/Popper/Menu';
import { List, Notification } from '~/components/Icons';
// import Search from '../Search';

const cx = classNames.bind(styles);
const currentUser = true;
const handleMenuChange = (menuItem) => {
  console.log(menuItem);
};

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'Vietnamese',
    children: {
      title: 'Languages',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@hoaa',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* <Search /> */}
        <div className={cx('welcome')}>Welcome Admin</div>
        <div className={cx('actions')}>
          <>
            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
              <button className={cx('action-btn')}>
                <Notification />
                <span className={cx('badge')}>11</span>
              </button>
            </Tippy>
            <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
              <button className={cx('action-btn')}>
                <List />
              </button>
            </Menu>
          </>
          <div className={cx('profile')}>
            <Image
              className={cx('user-avatar')}
              src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42a81079b5885e152707b170d63ba2df~c5_100x100.jpeg?x-expires=1685955600&x-signature=Q86T1O7WvBZ%2FSMrLLyqsJqYAxBo%3"
              alt="Admin"
              fallback="https://yt3.ggpht.com/yti/AHyvSCCE0pngRj7Y4Nh4MWGNW1FmjviYFFmg0NkYdVV05Q=s88-c-k-c0x00ffffff-no-rj-mo"
            />
            <div className={cx('name')}>Thanh Tho</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
