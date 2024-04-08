import classNames from 'classnames/bind';
import styles from './Users.module.scss';
import { AdminLayout } from '~/layouts';
import TableShowUsers from '~/components/Admin/TableShowUsers';
const cx = classNames.bind(styles);

function Coach() {
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('wrap-post')}>
          <TableShowUsers />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Coach;
