import PropTypes from 'prop-types';
import styles from './AdminLayout.module.scss';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '../components/Sidebar';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <div className={cx('container')}>
        <Header />
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
