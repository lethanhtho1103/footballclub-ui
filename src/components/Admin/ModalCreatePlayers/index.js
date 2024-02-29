import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import style from './ModalCreatePlayers.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import * as request from '~/utils/httpRequest';
import Loader from '~/components/Loader';

const cx = classNames.bind(style);

function ModalCreatePlayers({ isShow, handleClose, handleGetAllPlayers }) {
  const [countries, setCountries] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [position, setPosition] = useState('');
  const [jersey_number, setJerseyNumber] = useState();
  const [image, setImage] = useState();
  const [flag, setFlag] = useState('');
  const [detail, setDetail] = useState('');

  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [dateOfBirthErr, setDateOfBirthErr] = useState('');
  const [nationalityErr, setNationalityErr] = useState('');
  const [positionErr, setPositionErr] = useState('');
  const [jerseyNumberErr, setJerseyNumberErr] = useState('');
  const [imageErr, setImageErr] = useState('');
  const [flagErr, setFlagErr] = useState('');
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
        setNationality(value);
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
      case 'flag': {
        setFlag(value);
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

  const setDefaultValue = (type) => {
    if (type === 'er') {
      // setNameErr('');
      // setEmailErr('');
      // setPasswordErr('');
      // setDateOfBirthErr('');
      // setNationalityErr('');
      // setPositionErr('');
      // setJerseyNumberErr('');
      // setImageErr('');
      // setFlagErr('');
      // setDetailErr('');
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setDateOfBirth('');
      setNationality('');
      setPosition('');
      setJerseyNumber('');
      setImage();
      setFlag('');
      setDetail('');
      setNameErr('');
      setEmailErr('');
      setPasswordErr('');
      setDateOfBirthErr('');
      setNationalityErr('');
      setPositionErr('');
      setJerseyNumberErr('');
      setImageErr('');
      setFlagErr('');
      setDetailErr('');
    }
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
      case 'flag': {
        return flagErr?.length > 0;
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
    setFlagErr(errors.flag);
    setDetailErr(errors.detail);
  };

  const createPlayer = async () => {
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
      formData.append('image', image);

      const res = await adminService.createPlayer(formData);
      if (res.user) {
        setDefaultValue();
        handleGetAllPlayers();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const handleCLickSuccess = () => {
    setIsLoader(true);
    let isLoader = setTimeout(() => {
      createPlayer();
      setIsLoader(false);
      clearTimeout(isLoader);
    }, 800);
  };

  const handleGetAllCountries = async () => {
    const res = await request.get();
    setCountries(res);
  };

  useEffect(() => {
    handleGetAllCountries();
  }, []);

  return (
    <>
      {isLoader && <Loader />}
      {obToast?.content?.length > 0 && (
        <ToastMassage isShow={obToast.show} content={obToast.content} handleClose={() => setObToast({ content: '' })} />
      )}
      <Modal
        show={isShow}
        onHide={() => {
          setDefaultValue('er');
          handleClose();
        }}
      >
        <div
          className={cx('table-err', {
            show:
              nameErr ||
              emailErr ||
              passwordErr ||
              dateOfBirthErr ||
              nationalityErr ||
              positionErr ||
              jerseyNumberErr ||
              imageErr ||
              flagErr ||
              detailErr,
          })}
        >
          <h2>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faBug} />
            </div>
            <span>Please check the entered data:</span>
          </h2>
          <div className={cx('wrap-err')}>
            <ul>
              {nameErr && (
                <li>
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {nameErr}
                  </label>
                </li>
              )}
              {emailErr && (
                <li>
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {emailErr}
                  </label>
                </li>
              )}
              {passwordErr && (
                <li>
                  <label htmlFor="password">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {passwordErr}
                  </label>
                </li>
              )}
              {dateOfBirthErr && (
                <li>
                  <label htmlFor="date_of_birth">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {dateOfBirthErr}
                  </label>
                </li>
              )}
              {nationalityErr && (
                <li>
                  <label htmlFor="nationality">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {nationalityErr}
                  </label>
                </li>
              )}
              {positionErr && (
                <li>
                  <label htmlFor="position">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {positionErr}
                  </label>
                </li>
              )}
              {jerseyNumberErr && (
                <li>
                  <label htmlFor="jersey_number">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {jerseyNumberErr}
                  </label>
                </li>
              )}
              {imageErr && (
                <li>
                  <label htmlFor="image">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {imageErr}
                  </label>
                </li>
              )}
              {flagErr && (
                <li>
                  <label htmlFor="flag">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {flagErr}
                  </label>
                </li>
              )}
              {detailErr && (
                <li>
                  <label htmlFor="detail">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {detailErr}
                  </label>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>Add Player</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div className={cx('row')}>
              <div className={cx('col-md-6')}>
                {/* <div
                  className={cx('form__group', 'field', {
                    err: checkErr('nationality'),
                  })}
                >
                  <input
                    required=""
                    onChange={(e) => changeInput(e, 'nationality')}
                    value={nationality}
                    name="nationality"
                    placeholder="nationality"
                    id="nationality"
                    className={cx('form__field')}
                    type="input"
                  ></input>
                  <label className={cx('form__label')} htmlFor="nationality">
                    <span>*</span> Nationality:
                  </label>
                </div> */}
                <div
                  className={cx('form__group', 'field', 'section-type', {
                    err: checkErr('nationality'),
                  })}
                >
                  <select
                    value={nationality}
                    name="nationality"
                    id="nationality"
                    className={cx('nationality')}
                    onChange={(e) => changeInput(e, 'nationality')}
                  >
                    <option value="">Select nationality</option>
                    {countries.map((country, index) => {
                      return (
                        <option key={index} value={country.name.common}>
                          {country.name.common}
                        </option>
                      );
                    })}
                  </select>
                  <label className={cx('form__label')} htmlFor="nationality">
                    <span>*</span> Nationality:
                  </label>
                </div>
              </div>

              <div className={cx('col-md-6')}>
                <div
                  className={cx('form__group', 'field', {
                    err: checkErr('flag'),
                  })}
                >
                  <input
                    onChange={(e) => changeInput(e, 'flag')}
                    required=""
                    name="flag"
                    min="1"
                    placeholder="flag"
                    value={flag}
                    id="flag"
                    className={cx('form__field')}
                    type="input"
                  ></input>
                  <label className={cx('form__label')} htmlFor="flag">
                    <span>*</span> Flag:
                  </label>
                </div>
              </div>
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
            <div>
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
            </div>
            <div>
              <div
                className={cx('form__group', 'field', {
                  err: checkErr('image'),
                })}
              >
                <input
                  onChange={handleChangeImage}
                  id="image"
                  className={cx('form__field')}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/jpg"
                  autoComplete="off"
                ></input>
                <label className={cx('form__label')} htmlFor="image">
                  <span>*</span> Select file image:
                </label>
              </div>
            </div>
            <div>
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
          <Button className={cx('btn')} variant="primary" onClick={handleCLickSuccess}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreatePlayers;
