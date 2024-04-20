import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from '../FormInputGroup/FormInputGroup.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';
import FormInputGroup from '../FormInputGroup';
import SelectInput from '../SelectInput';

const cx = classNames.bind(style);

function ModalCreateDetailMatch({ handleClose, access_token, game_id, handleGetMatchLive }) {
  const [isLoader, setIsLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [player_name, setName] = useState('');
  const [type, setType] = useState('');
  const [is_away, setIsAway] = useState('');
  const [time, setTime] = useState('');

  const [playerNameErr, setNameErr] = useState('');
  const [typeErr, setTypeErr] = useState('');
  const [isAwayErr, setIsAwayErr] = useState('');
  const [timeErr, setTimeErr] = useState('');

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const changeInput = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'player_name': {
        setName(value);
        break;
      }
      case 'is_away': {
        setIsAway(value);
        break;
      }
      case 'type': {
        setType(value);
        break;
      }
      case 'time': {
        setTime(value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const setDefaultValue = (club) => {
    setName('');
    setNameErr('');
    setType('');
    setTypeErr('');
    setIsAway('');
    setIsAwayErr('');
    setTime('');
    setTimeErr('');
  };

  const validateErrors = (errors) => {
    setNameErr(errors);
    // setTypeErr(errors.type);
    // setIsAwayErr(errors.is_away);
    // setTimeErr(errors.time);
  };

  const createDetailMatch = async () => {
    try {
      const data = {
        access_token,
        game_id,
        jersey_number: 13,
        player_name,
        is_away,
        type,
        time,
      };
      const res = await adminService.createMatchDetail(data);
      if (res.data) {
        setDefaultValue();
        setObToast({ content: res.message, isShow: true });
        handleGetMatchLive();
      }
    } catch (error) {
      validateErrors(error.response.data.error);
    }
  };

  const handleCLickCreate = () => {
    setIsLoader(true);
    setTimeout(() => {
      createDetailMatch();
      setIsLoader(false);
    }, 1000);
  };

  const handleGetAllUsers = async () => {
    const res = await adminService.getAllUser();
    setUsers(res);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <>
      {isLoader && <Loader />}
      {obToast?.content?.length > 0 && (
        <ToastMassage isShow={obToast.show} content={obToast.content} handleClose={() => setObToast({ content: '' })} />
      )}
      <Modal
        show={true}
        onHide={() => {
          setDefaultValue('er');
          handleClose();
        }}
      >
        <TableErrors errors={{ name: playerNameErr }} />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>Update match</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <SelectInput
              label="Club"
              id="is_away"
              options={[
                { value: 0, label: 'Host' },
                { value: 1, label: 'Away' },
              ]}
              value={is_away}
              onChange={(e) => changeInput(e, 'is_away')}
              error={isAwayErr?.length > 0}
            />
            <SelectInput
              label="Type"
              id="type"
              options={[
                { value: 'goal', label: 'Goal' },
                { value: 'yellow', label: 'Yellow' },
                { value: 'red', label: 'Red' },
              ]}
              value={type}
              onChange={(e) => changeInput(e, 'type')}
              error={typeErr?.length > 0}
            />
            {is_away === '1' && (
              <FormInputGroup
                id="player_name"
                label="Name"
                type="text"
                value={player_name}
                onChange={(e) => changeInput(e, 'player_name')}
                required
                placeholder="Enter your name"
                error={playerNameErr?.length > 0}
              />
            )}
            {is_away === '0' && (
              <SelectInput
                id="player_name"
                label="Name"
                options={users.slice(1).map((user) => ({
                  value: user.player_name,
                  label: user.name,
                }))}
                value={player_name}
                onChange={(e) => changeInput(e, 'player_name')}
                error={playerNameErr?.length > 0}
              />
            )}
            <FormInputGroup
              id="time"
              label="Time"
              type="text"
              value={time}
              onChange={(e) => changeInput(e, 'time')}
              required
              placeholder="Enter time"
              error={timeErr?.length > 0}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={cx('btn')}
            variant="secondary"
            onClick={() => {
              setDefaultValue('er');
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button className={cx('btn')} variant="primary" onClick={handleCLickCreate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateDetailMatch;
