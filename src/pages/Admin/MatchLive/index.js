import { AdminLayout } from '~/layouts';
import { useEffect, useState } from 'react';
import adminService from '~/services/adminService';
import { UilEditAlt } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import styles from './MatchDetail.module.scss';
import Button from '~/components/Admin/Button';
import DetailMatch from '~/components/DetailMatchLive';
import ModalCreateDetailMatch from '~/components/Admin/ModalCreateDetailMatch';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';

const cx = classNames.bind(styles);

function MatchDetail() {
  const access_token = useSelector(accessTokenSelector);
  const [match, setMatch] = useState();
  const [isLive, setIsLive] = useState(true);
  const [isShowModalCreateMatchDetail, setShowModalCreateMatchDetail] = useState(false);
  const handleGetMatchLive = async () => {
    const res = await adminService.getMatchLive();
    if (res.live_matches.length > 0) {
      setMatch(res.live_matches[0]);
      setIsLive(true);
    } else if (res.near_matches.length > 0 && res.live_matches.length === 0) {
      setMatch(res.near_matches[0]);
    }
  };

  const handleClose = () => {
    setShowModalCreateMatchDetail(false);
  };

  useEffect(() => {
    handleGetMatchLive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      {isShowModalCreateMatchDetail && (
        <ModalCreateDetailMatch
          handleClose={handleClose}
          access_token={access_token}
          game_id={match?.game_id}
          handleGetMatchLive={handleGetMatchLive}
        />
      )}
      {match?.state === 'in_progress' && (
        <Button className={cx('btn-edit')} onClick={() => setShowModalCreateMatchDetail(true)}>
          <UilEditAlt size={16} />
          <span className={cx('text-btn')}>Edit match</span>
        </Button>
      )}

      <DetailMatch match={match} isLive={isLive} />
    </AdminLayout>
  );
}

export default MatchDetail;
