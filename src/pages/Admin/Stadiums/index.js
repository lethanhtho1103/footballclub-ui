import classNames from 'classnames/bind';
import styles from './Stadiums.module.scss'; 
import TableShowStadiums from '~/components/Admin/TableShowStadiums';

import { AdminLayout } from '~/layouts';

const cx = classNames.bind(styles);

function Stadiums() {
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('wrap-post')}>
          <TableShowStadiums />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Stadiums;
