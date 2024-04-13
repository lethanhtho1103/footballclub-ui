import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo.svg';

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
          title="Dashboard"
          to="/admin/dashboard"
          icon={<span class="material-symbols-outlined">dashboard</span>}
        />
      </Menu>
      <MenuItem
        title="Users Management"
        to="/admin/management/users"
        icon={<span class="material-symbols-outlined">group</span>}
        subMenuItems={[
          { label: 'Users', to: '/admin/management/users' },
          { label: 'Players', to: '/admin/management/players' },
          { label: 'Coaches', to: '/admin/management/coach' },
          { label: 'Company', to: '/admin/management/company' },
          { label: 'Contracts', to: '/admin/management/contracts' },
        ]}
      />
      <MenuItem
        title="Matches Management"
        to="/admin/management/clubs"
        icon={<span class="material-symbols-outlined">sports_soccer</span>}
        subMenuItems={[
          { label: 'Clubs', to: '/admin/management/clubs' },
          { label: 'Stadiums', to: '/admin/management/stadiums' },
          { label: 'Matches', to: '/admin/management/matches' },
          { label: 'Match details', to: '/admin/management/match-details' },
        ]}
      />
      <Menu>
        <MenuItem
          title="Tickets Management"
          to="/admin/tickets-management"
          icon={<span class="material-symbols-outlined">local_activity</span>}
        />
      </Menu>

      <MenuItem
        title="Statistical"
        to="/admin/statistical"
        icon={<span class="material-symbols-outlined">monitoring</span>}
      />
    </div>
  );
}

export default Sidebar;
