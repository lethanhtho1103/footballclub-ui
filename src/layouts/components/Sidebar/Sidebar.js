import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
// import config from '~/config';
import {
  HomeIcon,
  HomeActiveIcon,
  UserGroupIcon,
  UserGroupActiveIcon,
  DiscoverIcon,
  DiscoverActiveIcon,
  LiveIcon,
  LiveActiveIcon,
} from '~/components/Icons';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo.svg';

// import SuggestedAccounts from '~/components/SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx('wrapper')}>
      <Link className={cx('logo-link')} to="/admin">
        <img src={logo} alt="logo" />
        <div className={cx('name-club')}>Manchester City</div>
      </Link>
      <Menu>
        <MenuItem
          title="Flayer Management"
          //   to={config.routes.home}
          icon={<HomeIcon />}
          activeIcon={<HomeActiveIcon />}
        />
        <MenuItem
          title="Match Management"
          //  to={config.routes.following}
          icon={<UserGroupIcon />}
          activeIcon={<UserGroupActiveIcon />}
        />
        <MenuItem
          title="Statistical"
          //  to={config.routes.discover}
          icon={<DiscoverIcon />}
          activeIcon={<DiscoverActiveIcon />}
        />
      </Menu>
      {/* <SuggestedAccounts label="Suggest Account" />
      <SuggestedAccounts label="Following accounts" /> */}
    </div>
  );
}

export default Sidebar;
