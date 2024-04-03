import classNames from 'classnames/bind';
import styles from './Matches.module.scss'; 
import TableShowMatches from '~/components/Admin/TableShowMatches';

import { AdminLayout } from '~/layouts';

const cx = classNames.bind(styles);

function Matches() {
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('wrap-post')}>
          <TableShowMatches />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Matches;
