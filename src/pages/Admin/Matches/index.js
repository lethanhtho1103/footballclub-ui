import { useEffect, useState } from 'react';
import TableShowMatchesUpComming from '~/components/Admin/TableShowMatchesUpComming';
import { AdminLayout } from '~/layouts';
import classNames from 'classnames/bind';
import style from './Matches.module.scss';
import TableShowMatchesHistory from '~/components/Admin/TableShowMatchesHistory';
import adminService from '~/services/adminService';
const cx = classNames.bind(style);

function Matches() {
  const [isMatchesUpcomming, setIsMatchesUpcomming] = useState(true);
  const [stadiums, setStadiums] = useState([]);
  const [clubs, setClubs] = useState([]);

  const handleGetAllStadiums = async () => {
    const res = await adminService.getAllStadiums();
    setStadiums(res.stadiums);
  };

  const handleGetAllClubs = async () => {
    const res = await adminService.getAllClubs();
    setClubs(res.clubs);
  };

  function convertTimeFormat(timeString) {
    var timeParts = timeString.split(':');
    var hour = timeParts[0];
    var minute = timeParts[1];
    var formattedTime = hour + ':' + minute;
    return formattedTime;
  }

  useEffect(() => {
    handleGetAllStadiums();
    handleGetAllClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout>
      {isMatchesUpcomming ? (
        <div className={cx('title-link')} onClick={() => setIsMatchesUpcomming(!isMatchesUpcomming)}>
          Match history
        </div>
      ) : (
        <div className={cx('title-link')} onClick={() => setIsMatchesUpcomming(!isMatchesUpcomming)}>
          Match upcoming
        </div>
      )}

      {isMatchesUpcomming ? (
        <TableShowMatchesUpComming
          isMatchesUpcomming={isMatchesUpcomming}
          convertTimeFormat={convertTimeFormat}
          stadiums={stadiums}
          clubs={clubs}
        />
      ) : (
        <TableShowMatchesHistory convertTimeFormat={convertTimeFormat} stadiums={stadiums} clubs={clubs} />
      )}
    </AdminLayout>
  );
}

export default Matches;
