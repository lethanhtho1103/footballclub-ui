import classNames from 'classnames/bind';
import styles from './Coach.module.scss';
import TableShowCoach from '~/components/Admin/TableShowCoaches';

import { AdminLayout } from '~/layouts';

const cx = classNames.bind(styles);

function Coach() {
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('wrap-post')}>
          <TableShowCoach />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Coach;
