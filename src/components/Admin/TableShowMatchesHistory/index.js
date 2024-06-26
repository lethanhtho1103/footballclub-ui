import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowMatchesHistory.module.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UilTimes, UilEditAlt } from '@iconscout/react-unicons';
import ModalCreateMatches from '../ModalCreateMatches';
import adminService from '~/services/adminService';
import ToastMassage from '../ToastMassage';
import Loader from '~/components/Loader';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';
import { userService } from '~/services';
import { baseUrl } from '~/axios';

const cx = classNames.bind(style);

function TableShowMatchesHistory({ stadiums, clubs, convertTimeFormat }) {
  const access_token = useSelector(accessTokenSelector);
  const [row, setRow] = useState([]);
  const [match, setMatch] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [name, setName] = useState('');

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const [isShowModalCreateMatches, setIsShowModalCreateMatches] = useState(false);

  const columns = [
    { Header: 'Match ID', accessor: 'match_id', filter: 'fuzzyText' },
    { Header: 'Stadium', accessor: 'stadium', filter: 'fuzzyText' },
    { Header: 'Rival team', accessor: 'rival_team', filter: 'fuzzyText' },
    { Header: 'Game Time', accessor: 'game_time', filter: 'fuzzyText' },
    { Header: 'Goals Scored', accessor: 'goals_scored', filter: 'fuzzyText' },
    { Header: 'Goals Conceded', accessor: 'goals_conceded', filter: 'fuzzyText' },
    { Header: 'Result', accessor: 'result', filter: 'fuzzyText' },
    { Header: 'State', accessor: 'state', filter: 'fuzzyText' },
    { Header: 'Host', accessor: 'host', filter: 'fuzzyText' },
    { Header: 'Actions', accessor: 'col8', disableSortBy: true },
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        match_id: row.game_id,
        stadium: row.stadium.name,
        rival_team: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ width: '100%', textAlign: 'center' }}>{row.club.name}</div>
            <img
              src={`${baseUrl}${row.club.image}`}
              alt=""
              style={{
                width: '48px',
                height: '48px',
              }}
            />
          </div>
        ),
        game_time: `${row.game_date} ${convertTimeFormat(row.game_time)}`,
        goals_scored: row.goals_scored,
        goals_conceded: row.goals_conceded,
        result: row.result,
        state: row.state,
        host: row.host,
        col8: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              style={{
                padding: '4px 10px',
                backgroundColor: '#5E5DF0',
                color: '#fff',
                borderRadius: '8px',
                borderColor: '#5E5DF0',
                marginRight: '8px',
              }}
              onMouseOver={(e) => (e.target.style.opacity = 0.8)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
              onClick={() => handleUpdateMatch(row.game_id)} // Sử dụng match_id thay vì match_id
            >
              <UilEditAlt size={18} />
            </Button>
            <Button
              style={{
                padding: '4px 8px',
                backgroundColor: '#FF4742',
                color: '#fff',
                borderRadius: '8px',
                borderColor: '#FF4742',
              }}
              onMouseOver={(e) => (e.target.style.opacity = 0.8)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
              onClick={() => handleShowDeleteConfirmationDialog(row.game_id, row.name)} // Sử dụng match_id thay vì match_id
            >
              <UilTimes size={18} />
            </Button>
          </div>
        ),
      };
    });
    setRow(dataRow);
  };

  const handleGetAllMatches = async () => {
    setIsLoader(true);
    const res = await userService.getAllMatchesHistory();
    setIsLoader(false);
    convertToDataRow(res.history_matches);
  };

  const handleUpdateMatch = async (match_id) => {
    const res = await adminService.getOneMatch(match_id);
    setIsShowModalCreateMatches(true);
    setMatchId(match_id);
    setMatch(res.match);
  };

  const handleCloseModalCreateMatches = () => {
    setIsShowModalCreateMatches(false);
  };

  const handleClose = () => setShowDeleteConfirmationDialog(false);

  const handleShowDeleteConfirmationDialog = (match_id, name) => {
    setShowDeleteConfirmationDialog(true);
    setMatchId(match_id);
    setName(name);
  };

  const handleDelete = () => {
    setIsLoader(true);
    setTimeout(async () => {
      const res = await adminService.deleteMatch(matchId, access_token);
      setObToast({ content: res.message, isShow: true });
      handleClose();
      setIsLoader(false);
      handleGetAllMatches();
    }, 500);
  };

  const DeleteConfirmationDialog = () => {
    return (
      <Modal show={showDeleteConfirmationDialog} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className="modal-header"
          style={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '20px 20px 10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Modal.Title style={{ fontSize: '24px' }}>Confirm match deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modal-body"
          style={{
            padding: '20px 20px 20px',
            fontSize: '1.4rem',
          }}
        >
          Are you sure you want to delete {name}?
        </Modal.Body>
        <Modal.Footer
          className="modal-footer"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: '#385678',
              color: '#fff',
              fontSize: '1.3rem',
              fontWeight: '600',
              borderRadius: '5px',
              padding: '7.4px 16px',
              marginRight: '8px',
              border: 'none',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{
              backgroundColor: '#d9534f',
              color: '#fff',
              fontSize: '1.3rem',
              fontWeight: '600',
              borderRadius: '5px',
              padding: '7px 16px',
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    handleGetAllMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoader && <Loader />}
      <div
        className={cx('wrap', {
          show: true,
        })}
      >
        <div className={cx('container-content')}>
          <div className={cx('wrap-table')}>
            <h2 className={cx('title')}>List of history matches</h2>
            <div className={cx('table')}>
              <DataTable columns={columns} data={row} />
            </div>
            {DeleteConfirmationDialog()}
            {obToast?.content?.length > 0 && (
              <ToastMassage
                isShow={obToast.show}
                content={obToast.content}
                handleClose={() => setObToast({ content: '' })}
              />
            )}
          </div>
          {isShowModalCreateMatches && (
            <ModalCreateMatches
              handleClose={handleCloseModalCreateMatches}
              handleGetAllMatches={handleGetAllMatches}
              access_token={access_token}
              match={match}
              matchId={matchId}
              clubs={clubs}
              stadiums={stadiums}
              convertTimeFormat={convertTimeFormat}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TableShowMatchesHistory;
