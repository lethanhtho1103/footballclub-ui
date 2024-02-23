import classNames from 'classnames/bind';
import styles from './Players.module.scss';
import TableShowPlayers from '~/components/Admin/TableShowPlayers';

import { AdminLayout } from '~/layouts';

const cx = classNames.bind(styles);

function Players() {
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('wrap-post')}>
          <TableShowPlayers />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Players;
