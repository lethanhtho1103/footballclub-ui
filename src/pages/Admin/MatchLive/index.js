import { AdminLayout } from '~/layouts';
import { useEffect, useState } from 'react';
import adminService from '~/services/adminService';
import { UilEditAlt, UilStopCircle } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import styles from './MatchDetail.module.scss';
import Button from '~/components/Admin/Button';
import DetailMatch from '~/components/DetailMatchLive';
import ModalCreateDetailMatch from '~/components/Admin/ModalCreateDetailMatch';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';
import ToastMassage from '~/components/Admin/ToastMassage';

const cx = classNames.bind(styles);

function MatchDetail() {
  const access_token = useSelector(accessTokenSelector);
  const [match, setMatch] = useState();
  const [matchId, setMatchId] = useState();
  // const [isLoader, setIsLoader] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [isShowModalCreateMatchDetail, setShowModalCreateMatchDetail] = useState(false);
  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const handleGetMatchLive = async () => {
    const res = await adminService.getMatchLive();
    if (res.live_matches.length > 0) {
      setMatch(res.live_matches[0]);
      setMatchId(res.live_matches[0].game_id);
      setIsLive(true);
    } else if (res.near_matches.length > 0 && res.live_matches.length === 0) {
      setMatch(res.near_matches[0]);
    }
  };

  const handleClose = () => {
    setShowModalCreateMatchDetail(false);
  };

  const handleStopMatch = async () => {
    // setIsLoader(true);
    const res = await adminService.stopMatchLive(matchId, access_token);
    console.log(res);
    // if (res.message) {
    //   setObToast({ content: res.message, isShow: true });
    // }
  };

  useEffect(() => {
    handleGetMatchLive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      {obToast?.content?.length > 0 && (
        <ToastMassage isShow={obToast.show} content={obToast.content} handleClose={() => setObToast({ content: '' })} />
      )}
      {isShowModalCreateMatchDetail && (
        <ModalCreateDetailMatch
          handleClose={handleClose}
          access_token={access_token}
          game_id={match?.game_id}
          handleGetMatchLive={handleGetMatchLive}
          host={match?.host}
        />
      )}
      {match?.state === 'in_progress' && (
        <>
          <Button className={cx('btn-edit')} onClick={() => setShowModalCreateMatchDetail(true)}>
            <UilEditAlt size={16} />
            <span className={cx('text-btn')}>Edit match</span>
          </Button>
          <Button className={cx('btn-stop')} onClick={handleStopMatch}>
            <UilStopCircle size={18} />
            <span className={cx('text-btn')}>Finish match</span>
          </Button>
        </>
      )}

      <DetailMatch match={match} isLive={isLive} handleGetMatchLive={handleGetMatchLive} />
    </AdminLayout>
  );
}

export default MatchDetail;
