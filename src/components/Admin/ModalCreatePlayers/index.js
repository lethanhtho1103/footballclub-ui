import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from './ModalCreatePlayers.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';

const cx = classNames.bind(style);

function ModalCreatePlayers({ handleClose, handleGetAllPlayers, player, access_token, countries, userId }) {
  const [isLoader, setIsLoader] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState(player?.name || '');
  const [email, setEmail] = useState(player?.email || '');
  const [password, setPassword] = useState(player?.password || '');
  const [date_of_birth, setDateOfBirth] = useState(player?.date_of_birth || '');
  const [nationality, setNationality] = useState(player?.nationality || '');
  const [position, setPosition] = useState(player?.position || '');
  const [jersey_number, setJerseyNumber] = useState(player?.jersey_number);
  const [image, setImage] = useState(player?.image || null);
  const [flag, setFlag] = useState(player?.flag || '');
  const [detail, setDetail] = useState(player?.detail || '');

  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [dateOfBirthErr, setDateOfBirthErr] = useState('');
  const [nationalityErr, setNationalityErr] = useState('');
  const [positionErr, setPositionErr] = useState('');
  const [jerseyNumberErr, setJerseyNumberErr] = useState('');
  const [imageErr, setImageErr] = useState('');
  const [detailErr, setDetailErr] = useState('');

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const changeInput = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'name': {
        setName(value);
        break;
      }
      case 'email': {
        setEmail(value);
        break;
      }
      case 'password': {
        setPassword(value);
        break;
      }
      case 'date_of_birth': {
        setDateOfBirth(value);
        break;
      }
      case 'nationality': {
        setSelectedOption(value);
        const selectedCountry = countries.find((country) => country.value.toLowerCase() === value.toLowerCase());
        if (selectedCountry) {
          setFlag(selectedCountry.value.toLowerCase());
          setNationality(selectedCountry.text);
        }
        break;
      }
      case 'position': {
        setPosition(value);
        break;
      }
      case 'jersey_number': {
        setJerseyNumber(value);
        break;
      }
      case 'detail': {
        setDetail(value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const setDefaultValue = (player) => {
    setName(player?.name || '');
    setEmail(player?.email || '');
    setPassword(player?.password || '');
    setDateOfBirth(player?.date_of_birth || '');
    setNationality(player?.nationality || '');
    setPosition(player?.position || '');
    setJerseyNumber(player?.jersey_number || '');
    setImage(player?.image || null);
    setFlag(player?.flag || '');
    setDetail(player?.detail || '');
    setNameErr('');
    setEmailErr('');
    setPasswordErr('');
    setDateOfBirthErr('');
    setNationalityErr('');
    setPositionErr('');
    setJerseyNumberErr('');
    setImageErr('');
    setDetailErr('');
    setSelectedOption('');
  };

  const checkErr = (type) => {
    switch (type) {
      case 'name': {
        return nameErr?.length > 0;
      }
      case 'email': {
        return emailErr?.length > 0;
      }
      case 'password': {
        return passwordErr?.length > 0;
      }
      case 'date_of_birth': {
        return dateOfBirthErr?.length > 0;
      }
      case 'nationality': {
        return nationalityErr?.length > 0;
      }
      case 'position': {
        return positionErr?.length > 0;
      }
      case 'jersey_number': {
        return jerseyNumberErr?.length > 0;
      }
      case 'image': {
        return imageErr?.length > 0;
      }
      case 'detail': {
        return detailErr?.length > 0;
      }
      default: {
        break;
      }
    }
  };

  const validateErrors = (errors) => {
    setNameErr(errors.name);
    setEmailErr(errors.email);
    setPasswordErr(errors.password);
    setDateOfBirthErr(errors.date_of_birth);
    setNationalityErr(errors.nationality);
    setPositionErr(errors.position);
    setJerseyNumberErr(errors.jersey_number);
    setImageErr(errors.image);
    setDetailErr(errors.detail);
  };

  const createPlayer = async () => {
    try {
      const playerData = {
        name,
        email,
        password,
        date_of_birth,
        nationality,
        flag,
        position,
        jersey_number,
        image,
        detail,
        access_token,
      };
      const res = await adminService.createPlayer(playerData);
      if (res.user) {
        setDefaultValue();
        handleGetAllPlayers();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const updatePlayer = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('date_of_birth', date_of_birth);
      formData.append('nationality', nationality);
      formData.append('flag', flag);
      formData.append('position', position);
      formData.append('jersey_number', jersey_number);
      if (player?.image !== image) {
        formData.append('image', image);
      }
      formData.append('detail', detail);
      const res = await adminService.updatePlayer(userId, formData, access_token);
      if (res.player) {
        setDefaultValue(res.player);
        handleGetAllPlayers();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const handleCLickCreate = () => {
    setIsLoader(true);
    setTimeout(() => {
      createPlayer();
      setIsLoader(false);
    }, 1000);
  };

  const handleCLickUpdate = () => {
    setIsLoader(true);
    setTimeout(() => {
      updatePlayer();
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
          setDefaultValue('er');
          handleClose();
        }}
      >
        <TableErrors
          nameErr={nameErr}
          emailErr={emailErr}
          passwordErr={passwordErr}
          dateOfBirthErr={dateOfBirthErr}
          nationalityErr={nationalityErr}
          positionErr={positionErr}
          jerseyNumberErr={jerseyNumberErr}
          imageErr={imageErr}
          detailErr={detailErr}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{player ? 'Update player' : 'Add Player'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('name'),
              })}
            >
              <input
                required=""
                placeholder="Name"
                id="name"
                className={cx('form__field')}
                autoComplete="off"
                type="input"
                value={name}
                onChange={(e) => changeInput(e, 'name')}
              ></input>
              <label className={cx('form__label')} htmlFor="name">
                <span>*</span> Name:
              </label>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('email'),
              })}
            >
              <input
                required=""
                placeholder="Email"
                id="email"
                className={cx('form__field')}
                autoComplete="off"
                type="input"
                value={email}
                onChange={(e) => changeInput(e, 'email')}
              ></input>
              <label className={cx('form__label')} htmlFor="email">
                <span>*</span> Email Address:
              </label>
            </div>
            {!player && (
              <div
                className={cx('form__group', 'field', {
                  err: checkErr('password'),
                })}
              >
                <input
                  required=""
                  placeholder="Password"
                  id="password"
                  className={cx('form__field')}
                  autoComplete="off"
                  type="password"
                  value={password}
                  onChange={(e) => changeInput(e, 'password')}
                ></input>
                <label className={cx('form__label')} htmlFor="password">
                  <span>*</span> Password:
                </label>
              </div>
            )}
            <div
              className={cx('form__group', 'field', 'section-type', {
                err: checkErr('nationality'),
              })}
            >
              <select
                value={selectedOption}
                name="nationality"
                id="nationality"
                className={cx('nationality')}
                onChange={(e) => changeInput(e, 'nationality')}
              >
                <option value="">{nationality || player?.nationality || 'Select nationality'}</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.value.toLowerCase()}>
                    {country.text}
                  </option>
                ))}
              </select>
              <label className={cx('form__label')} htmlFor="nationality">
                <span>*</span> Nationality:
              </label>
            </div>
            <div className={cx('row')}>
              <div className={cx('col-md-6')}>
                <div
                  className={cx('form__group', 'field', {
                    err: checkErr('jersey_number'),
                  })}
                >
                  <input
                    required=""
                    onChange={(e) => changeInput(e, 'jersey_number')}
                    value={jersey_number}
                    name="jersey_number"
                    placeholder="jersey_number"
                    id="jersey_number"
                    className={cx('form__field')}
                    type="number"
                  ></input>
                  <label className={cx('form__label')} htmlFor="jersey_number">
                    <span>*</span> Jersey number:
                  </label>
                </div>
              </div>
              <div className={cx('col-md-6')}>
                <div
                  className={cx('form__group', 'field', 'section-type', {
                    err: checkErr('position'),
                  })}
                >
                  <select
                    value={position}
                    name="position"
                    id="position"
                    className={cx('position')}
                    onChange={(e) => changeInput(e, 'position')}
                  >
                    <option value="">Select position</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Forward">Forward</option>
                  </select>
                  <label className={cx('form__label')} htmlFor="position">
                    <span>*</span> Position:
                  </label>
                </div>
              </div>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('date_of_birth'),
              })}
            >
              <input
                onChange={(e) => changeInput(e, 'date_of_birth')}
                id="date_of_birth"
                className={cx('form__field')}
                type="date"
                value={date_of_birth}
                autoComplete="off"
              ></input>
              <label className={cx('form__label')} htmlFor="date_of_birth">
                <span>*</span> Date of birth
              </label>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('image'),
              })}
            >
              <input onChange={handleChangeImage} id="image" className={cx('form__field')} type="file"></input>
              <label className={cx('form__label')} htmlFor="image">
                <span>*</span> Select file image:
              </label>
            </div>
            <div
              className={cx('form__group', 'field', 'detail-err', {
                err: checkErr('detail'),
              })}
            >
              <textarea
                onChange={(e) => changeInput(e, 'detail')}
                id="detail"
                name="detail"
                value={detail}
                className={cx('form__field', 'detail')}
                autoComplete="off"
              ></textarea>
              <label className={cx('form__label')} htmlFor="detail">
                Detail:
              </label>
            </div>
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
          {player ? (
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

export default ModalCreatePlayers;
