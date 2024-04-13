import { AdminLayout } from '~/layouts';
import { useEffect, useState } from 'react';
import adminService from '~/services/adminService';
import { UilEditAlt } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import styles from './MatchDetail.module.scss';
import Button from '~/components/Admin/Button';
import DetailMatch from '~/components/DetailMatch';

const cx = classNames.bind(styles);

function MatchDetail() {
  const [match, setMatch] = useState();
  const [isLive, setIsLive] = useState(true);

  const handleGetMatchLive = async () => {
    // Tạo đối tượng Date hiện tại
    const currentDate = new Date();

    // Lấy ngày hiện tại
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}:${seconds}`;
    console.log(date, time);
    // Gửi yêu cầu HTTP với ngày và giờ hiện tại
    const res = await adminService.getMatchLive(date, time);
    if (res.live_matches.length > 0) {
      setMatch(res.live_matches[0]);
      setIsLive(true);
    } else if (res.near_matches.length > 0) {
      setMatch(res.near_matches[0]);
    }
  };

  useEffect(() => {
    handleGetMatchLive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      <Button className={cx('btn-edit')}>
        <UilEditAlt size={16} />
        <span className={cx('text-btn')}>Edit match</span>
      </Button>
      <DetailMatch match={match} isLive={isLive} />
    </AdminLayout>
  );
}

export default MatchDetail;
