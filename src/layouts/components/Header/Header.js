import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { faEarthAsia, faGear, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import Image from '~/components/Admin/Images';
import Menu from '~/components/Admin/Popper/Menu';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducer';
import { useContext } from 'react';
import { InfoUserContext } from '~/Context/InfoUserContext';
// import Search from '../Search';

const cx = classNames.bind(styles);
const currentUser = true;

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
];

function Header() {
  const dispatch = useDispatch();

  const { infoUser } = useContext(InfoUserContext);

  const handleLogout = () => {
    dispatch(userSlice.actions.logOutUser());
  };

  const handleMenuChange = (menuItem) => {
    if (menuItem.title === 'Log out') {
      handleLogout();
    }
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@tho',
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
      to: '/admin/login',
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
            <Tippy delay={[0, 50]} content="Notification" placement="bottom">
              <button className={cx('action-btn')}>
                <span class="material-symbols-outlined" style={{ fontSize: '3.2rem' }}>
                  notifications
                </span>{' '}
                <span className={cx('badge')}>11</span>
              </button>
            </Tippy>
          </>
          <div className={cx('profile')}>
            <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
              <Image
                className={cx('user-avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42a81079b5885e152707b170d63ba2df~c5_100x100.jpeg?x-expires=1685955600&x-signature=Q86T1O7WvBZ%2FSMrLLyqsJqYAxBo%3"
                alt="Admin"
                fallback="https://yt3.ggpht.com/yti/AHyvSCCE0pngRj7Y4Nh4MWGNW1FmjviYFFmg0NkYdVV05Q=s88-c-k-c0x00ffffff-no-rj-mo"
              />
            </Menu>

            <div className={cx('name')}>{infoUser?.name}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
