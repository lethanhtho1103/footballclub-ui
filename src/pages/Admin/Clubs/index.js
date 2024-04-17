import classNames from 'classnames/bind';
import styles from './Clubs.module.scss';
import TableShowClubs from '~/components/Admin/TableShowClubs';

import { AdminLayout } from '~/layouts';

const cx = classNames.bind(styles);

function Clubs() {
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('wrap-post')}>
          <TableShowClubs />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Clubs;
