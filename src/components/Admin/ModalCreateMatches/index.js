import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from './ModalCreateMatches.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';
import ToastMassage from '../ToastMassage';



const cx = classNames.bind(style);

function ModalCreateMatches({ handleClose, handleGetAllMatches, match, access_token, matchId, clubs, stadiums }) {
  const [isLoader, setIsLoader] = useState(false);

  const [stadiumId, setStadiumId] = useState(match?.stadium.stadium_id || '');
  const [clubId, setClubId] = useState(match?.club.club_id || '');
  const [gameDate, setGameDate] = useState(match?.game_date || '');
  const [gameTime, setGameTime] = useState(match?.game_time || '');
  const [goalsScored, setGoalsScored] = useState(match?.goals_scored || '0');
  const [goalsConceded, setGoalsConceded] = useState(match?.goals_conceded || '0');
  const [result, setResult] = useState(match?.result || '');
  const [state, setState] = useState(match?.state || '');
  const [host, setHost] = useState(match?.host || '');
  const [remainingSeats, setRemainingSeats] = useState(match?.remaining_seats || '');

  const [stadiumIdErr, setStadiumIdErr] = useState('');
  const [clubIdErr, setClubIdErr] = useState('');
  const [gameDateErr, setGameDateErr] = useState('');
  const [gameTimeErr, setGameTimeErr] = useState('');
  const [goalsScoredErr, setGoalsScoredErr] = useState('');
  const [goalsConcededErr, setGoalsConcededErr] = useState('');
  const [resultErr, setResultErr] = useState('');
  const [stateErr, setStateErr] = useState('');
  const [hostErr, setHostErr] = useState('');
  const [remainingSeatsErr, setRemainingSeatsErr] = useState('');

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  useEffect(() => {
    // Update host based on stadium_id
    if (stadiumId === '1') {
      setHost('1');
    } else {
      setHost('0');
    }
  }, [stadiumId]);

  const changeInput = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'stadiumId':
        setStadiumId(value);
        break;
      case 'clubId':
        setClubId(value);
        break;
      case 'gameDate':
        setGameDate(value);
        break;
      case 'gameTime':
        setGameTime(value);
        break;
      case 'goalsScored':
        setGoalsScored(value);
        break;
      case 'goalsConceded':
        setGoalsConceded(value);
        break;
      case 'result':
        setResult(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'host':
        setHost(value);
        break;
      case 'remainingSeats':
        setRemainingSeats(value);
        break;
      default:
        break;
    }
  };

  const setDefaultValue = (match) => {
    setStadiumId(match?.stadium.stadium_id || '');
    setClubId(match?.club.club_id || '');
    setGameDate(match?.game_date || '');
    setGameTime(match?.game_time || '');
    setGoalsScored(match?.goals_scored || '');
    setGoalsConceded(match?.goals_conceded || '');
    setResult(match?.result || '');
    setState(match?.state || '');
    setHost(match?.host || '');
    setRemainingSeats(match?.remaining_seats || '');

    setStadiumIdErr('');
    setClubIdErr('');
    setGameDateErr('');
    setGameTimeErr('');
    setGoalsScoredErr('');
    setGoalsConcededErr('');
    setResultErr('');
    setStateErr('');
    setHostErr('');
    setRemainingSeatsErr('');
  };

  const checkErr = (type) => {
    switch (type) {
      case 'stadiumId':
        return stadiumIdErr?.length > 0;
      case 'clubId':
        return clubIdErr?.length > 0;
      case 'gameDate':
        return gameDateErr?.length > 0;
      case 'gameTime':
        return gameTimeErr?.length > 0;
      case 'goalsScored':
        return goalsScoredErr?.length > 0;
      case 'goalsConceded':
        return goalsConcededErr?.length > 0;
      case 'result':
        return resultErr?.length > 0;
      case 'state':
        return stateErr?.length > 0;
      case 'host':
        return hostErr?.length > 0;
      case 'remainingSeats':
        return remainingSeatsErr?.length > 0;
      default:
        break;
    }
  };

  const validateErrors = (errors) => {
    setStadiumIdErr(errors.stadium_id || '');
    setClubIdErr(errors.club_id || '');
    setGameDateErr(errors.game_date || '');
    setGameTimeErr(errors.game_time || '');
    setGoalsScoredErr(errors.goals_scored || '');
    setGoalsConcededErr(errors.goals_conceded || '');
    setResultErr(errors.result || '');
    setStateErr(errors.state || '');
    setHostErr(errors.host || '');
    setRemainingSeatsErr(errors.remaining_seats || '99');
  };

  const createMatch = async () => {
    try {
      const matchData = {
        stadium_id: stadiumId,
        club_id: clubId,
        game_date: gameDate,
        game_time: gameTime,
        goals_scored: goalsScored,
        goals_conceded: goalsConceded,
        result: result,
        state: state,
        host: host,
        remaining_seats: remainingSeats,
        access_token: access_token,
      };
      const res = await adminService.createMatch(matchData);
      if (res.match) {
        setDefaultValue();
        handleGetAllMatches();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const updateMatch = async () => {
    try {
      const formData = new FormData();
      formData.append('stadium_id', stadiumId);
      formData.append('club_id', clubId);
      formData.append('game_date', gameDate);
      formData.append('game_time', gameTime);
      formData.append('goals_scored', goalsScored);
      formData.append('goals_conceded', goalsConceded);
      formData.append('result', result);
      formData.append('state', state);
      formData.append('host', host);
      formData.append('remaining_seats', remainingSeats);
      const res = await adminService.updateMatch(matchId, formData, access_token);
      if (res.match) {
        setDefaultValue(res.match);
        handleGetAllMatches();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const handleCLickCreate = () => {
    setIsLoader(true);
    setTimeout(() => {
      createMatch();
      setIsLoader(false);
    }, 1000);
  };

  const handleCLickUpdate = () => {
    setIsLoader(true);
    setTimeout(() => {
      updateMatch();
      setIsLoader(false);
    }, 1000);
  };

  return (
    <>
      {isLoader && <Loader />}
      {obToast?.content?.length > 0 && (
        <ToastMassage isShow={obToast.show} content={obToast.content} handleClose={() => setObToast({ content: '' })} />
      )}
      <Modal
        show={true}
        onHide={() => {
          setDefaultValue();
          handleClose();
        }}
      >
        <TableErrors
          stadiumIdErr={stadiumIdErr}
          clubIdErr={clubIdErr}
          gameDateErr={gameDateErr}
          gameTimeErr={gameTimeErr}
          goalsScoredErr={goalsScoredErr}
          goalsConcededErr={goalsConcededErr}
          resultErr={resultErr}
          stateErr={stateErr}
          hostErr={hostErr}
          remainingSeatsErr={remainingSeatsErr}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{match ? 'Update match' : 'Add match'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('stadiumId'),
              })}
            >
              <select
                required=""
                id="stadiumId"
                className={cx('form__field')}
                value={stadiumId}
                onChange={(e) => changeInput(e, 'stadiumId')}
              >
                <option value="">Select Stadium</option>
                {stadiums.map((stadium) => (
                  <option key={stadium.stadium_id} value={stadium.stadium_id}>
                    {stadium.name}
                  </option>
                ))}
              </select>
              <label className={cx('form__label')} htmlFor="stadiumId">
                <span>*</span> Stadium:
              </label>
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('clubId'),
              })}
            >
              <select
                required=""
                id="clubId"
                className={cx('form__field')}
                value={clubId}
                onChange={(e) => changeInput(e, 'clubId')}
              >
                <option value="">Select Club</option>
                {clubs.slice(1).map((club) => (
                  <option key={club.club_id} value={club.club_id}>
                    {club.name}
                  </option>
                ))}
              </select>
              <label className={cx('form__label')} htmlFor="clubId">
                <span>*</span> Club:
              </label>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('gameDate'),
              })}
            >
              <input
                required=""
                placeholder="Game Date"
                id="gameDate"
                className={cx('form__field')}
                autoComplete="off"
                type="date"
                value={gameDate}
                onChange={(e) => changeInput(e, 'gameDate')}
              ></input>
              <label className={cx('form__label')} htmlFor="gameDate">
                <span>*</span> Game Date:
              </label>
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('gameTime'),
              })}
            >
              <input
                required=""
                placeholder="Game Time"
                id="gameTime"
                className={cx('form__field')}
                autoComplete="off"
                type="time"
                step="1"
                value={gameTime}
                onChange={(e) => changeInput(e, 'gameTime')}
              />
              <label className={cx('form__label')} htmlFor="gameTime">
                <span>*</span> Game Time:
              </label>
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('result'),
              })}
            >
              <select
                required=""
                id="result"
                className={cx('form__field')}
                value={result}
                onChange={(e) => changeInput(e, 'result')}
              >
                <option value="">Select Result</option>
                <option value="win">Win</option>
                <option value="draw">Draw</option>
                <option value="loss">Loss</option>
              </select>
              <label className={cx('form__label')} htmlFor="result">
                <span>*</span> Result:
              </label>
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('state'),
              })}
            >
              <select
                required=""
                id="state"
                className={cx('form__field')}
                value={state}
                onChange={(e) => changeInput(e, 'state')}
              >
                <option value="">Select State</option>
                <option value="upcoming">Upcoming</option>
                <option value="in_progress">In Progress</option>
                <option value="finished">Finished</option>
              </select>
              <label className={cx('form__label')} htmlFor="state">
                <span>*</span> State:
              </label>
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('host'),
              })}
            >
              <input
                required=""
                placeholder="Host"
                id="host"
                className={cx('form__field')}
                autoComplete="off"
                type="text"
                hidden
                value={host}
                onChange={(e) => changeInput(e, 'host')}
              ></input>
              {/* <label className={cx('form__label')} htmlFor="host">
                <span>*</span> Host:
              </label> */}
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('goalsScored'),
              })}
            >
              <input
                required=""
                placeholder="Goals Scored"
                id="goalsScored"
                className={cx('form__field')}
                autoComplete="off"
                type="number"
                value={goalsScored}
                onChange={(e) => changeInput(e, 'goalsScored')}
              ></input>
              <label className={cx('form__label')} htmlFor="goalsScored">
                <span>*</span> Goals Scored:
              </label>
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('goalsConceded'),
              })}
            >
              <input
                required=""
                placeholder="Goals Conceded"
                id="goalsConceded"
                className={cx('form__field')}
                autoComplete="off"
                type="number"
                value={goalsConceded}
                onChange={(e) => changeInput(e, 'goalsConceded')}
              ></input>
              <label className={cx('form__label')} htmlFor="goalsConceded">
                <span>*</span> Goals Conceded:
              </label>
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('remainingSeats'),
              })}
            >
              <input
                required=""
                placeholder="Remaining Seats"
                id="remainingSeats"
                className={cx('form__field')}
                autoComplete="off"
                type="number"
                hidden
                value={remainingSeats}
                onChange={(e) => changeInput(e, 'remainingSeats')}
              ></input>
              {/* <label className={cx('form__label')} htmlFor="remainingSeats">
                <span>*</span> Remaining Seats:
              </label> */}
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className={cx('btn')}
            variant="secondary"
            onClick={() => {
              setDefaultValue();
              handleClose();
            }}
          >
            Cancel
          </Button>
          {match ? (
            <Button className={cx('btn')} variant="primary" onClick={handleCLickUpdate}>Update</Button>
          ) : (
            <Button className={cx('btn')} variant="primary" onClick={handleCLickCreate}>Create</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateMatches;
