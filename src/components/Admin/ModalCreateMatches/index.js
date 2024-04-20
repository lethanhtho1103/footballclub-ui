import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from '../FormInputGroup/FormInputGroup.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';
import ToastMassage from '../ToastMassage';
import FormInputGroup from '../FormInputGroup';
import SelectInput from '../SelectInput';

const cx = classNames.bind(style);

function ModalCreateMatches({
  handleClose,
  handleGetAllMatches,
  match,
  access_token,
  matchId,
  clubs,
  stadiums,
  isMatchesUpcomming,
  convertTimeFormat,
}) {
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
    if (stadiumId === 1) {
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

  const validateErrors = (errors) => {
    if (errors) {
      if (errors.stadium_id) {
        setStadiumIdErr(errors.stadium_id);
      } else {
        setStadiumIdErr('');
      }
      if (errors.club_id) {
        setClubIdErr(errors.club_id);
      } else {
        setClubIdErr('');
      }
      if (errors.game_date) {
        setGameDateErr(errors.game_date);
      } else {
        setGameDateErr('');
      }
      if (errors.game_time) {
        setGameTimeErr(errors.game_time);
      } else {
        setGameTimeErr('');
      }
      if (errors.goals_scored) {
        setGoalsScoredErr(errors.goals_scored);
      } else {
        setGoalsScoredErr('');
      }
      if (errors.goals_conceded) {
        setGoalsConcededErr(errors.goals_conceded);
      } else {
        setGoalsConcededErr('');
      }
      if (errors.result) {
        setResultErr(errors.result);
      } else {
        setResultErr('');
      }
      if (errors.state) {
        setStateErr(errors.state);
      } else {
        setStateErr('');
      }
      if (errors.host) {
        setHostErr(errors.host);
      } else {
        setHostErr('');
      }
    }
  };

  const createMatch = async () => {
    try {
      const matchData = {
        stadium_id: stadiumId,
        club_id: clubId,
        game_date: gameDate,
        game_time: gameTime,
        host: host,
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

  console.log(host);

  const updateMatch = async () => {
    try {
      const formData = new FormData();
      formData.append('stadium_id', stadiumId);
      formData.append('club_id', clubId);
      formData.append('game_date', gameDate);
      formData.append('game_time', convertTimeFormat(gameTime));
      if (isMatchesUpcomming) {
        formData.append('goals_scored', goalsScored);
        formData.append('goals_conceded', goalsConceded);
        formData.append('state', state);
        formData.append('result', result);
        formData.append('host', host);
      }
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
    console.log(gameTime);
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
          errors={{
            stadiumId: stadiumIdErr,
            clubId: clubIdErr,
            gameDate: gameDateErr,
            gameTime: gameTimeErr,
            goalsScored: goalsScoredErr,
            goalsConceded: goalsConcededErr,
            result: resultErr,
            state: stateErr,
            host: hostErr,
            remainingSeats: remainingSeatsErr,
          }}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{match ? 'Update match' : 'Add match'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <SelectInput
              id="stadium"
              label="Stadium"
              options={stadiums.map((stadium) => ({
                value: stadium.stadium_id,
                label: stadium.name,
              }))}
              value={stadiumId}
              onChange={(e) => changeInput(e, 'stadiumId')}
              error={stadiumIdErr?.length > 0}
            />
            <SelectInput
              id="club"
              label="Club"
              options={clubs.slice(1).map((club) => ({
                value: club.club_id,
                label: club.name,
              }))}
              value={clubId}
              onChange={(e) => changeInput(e, 'clubId')}
              error={clubIdErr?.length > 0}
            />
            <FormInputGroup
              id="gameDate"
              label="Game Date"
              type="date"
              value={gameDate}
              onChange={(e) => changeInput(e, 'gameDate')}
              error={gameDateErr?.length > 0}
            />
            <FormInputGroup
              id="gameTime"
              label="Game Time"
              type="time"
              value={gameTime}
              onChange={(e) => changeInput(e, 'gameTime')}
              error={gameTimeErr?.length > 0}
              pattern="[0-2][0-9]:[0-5][0-9]" // Ensure the input follows HH:mm format
              title="Please enter the time in HH:mm format"
            />
            {!isMatchesUpcomming && (
              <SelectInput
                label="Result"
                id="result"
                options={[
                  { value: 'win', label: 'Win' },
                  { value: 'draw', label: 'Draw' },
                  { value: 'loss', label: 'Loss' },
                ]}
                value={result}
                onChange={(e) => changeInput(e, 'result')}
                error={resultErr?.length > 0}
              />
            )}
            {!isMatchesUpcomming && (
              <SelectInput
                label="State"
                id="state"
                options={[
                  { value: 'upcoming', label: 'Upcoming' },
                  { value: 'in_progress', label: 'In Progress' },
                  { value: 'finished', label: 'Finished' },
                ]}
                value={state}
                onChange={(e) => changeInput(e, 'state')}
                error={stateErr?.length > 0}
              />
            )}
            <div
              className={cx('form__group', 'field', {
                err: hostErr?.length > 0,
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
            {!isMatchesUpcomming && (
              <FormInputGroup
                id="goalsScored"
                label="Goals Scored"
                type="number"
                value={goalsScored}
                onChange={(e) => changeInput(e, 'goalsScored')}
              />
            )}
            {!isMatchesUpcomming && (
              <FormInputGroup
                id="goalsConceded"
                label="Goals Conceded"
                type="number"
                value={goalsConceded}
                onChange={(e) => changeInput(e, 'goalsConceded')}
              />
            )}

            {/* <FormInputGroup
              id="remainingSeats"
              label="Remaining Seats"
              type="number"
              value={remainingSeats}
              onChange={(e) => changeInput(e, 'remainingSeats')}
              hidden
            /> */}
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
            <Button className={cx('btn')} variant="primary" onClick={handleCLickUpdate}>
              Update
            </Button>
          ) : (
            <Button className={cx('btn')} variant="primary" onClick={handleCLickCreate}>
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateMatches;
