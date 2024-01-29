import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { BallIcon, Statistical, PlayerIcon } from '~/components/Admin/Icons';
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
        <MenuItem title="Players Management" to="/admin/players-management" icon={<PlayerIcon />} />
        <MenuItem title="Matches Management" to="/admin/matches-management" icon={<BallIcon />} />
        <MenuItem title="Statistical" to="/admin/statistical" icon={<Statistical />} />
      </Menu>
      {/* <SuggestedAccounts label="Suggest Account" />
      <SuggestedAccounts label="Following accounts" /> */}
    </div>
  );
}

export default Sidebar;
