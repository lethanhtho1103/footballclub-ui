import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from './ModalCreateCoaches.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';

const cx = classNames.bind(style);

function ModalCreateCoaches({ handleClose, handleGetAllCoaches, coach, access_token, countries, userId }) {
  const [isLoader, setIsLoader] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState(coach?.name || '');
  const [email, setEmail] = useState(coach?.email || '');
  const [password, setPassword] = useState(coach?.password || '');
  const [date_of_birth, setDateOfBirth] = useState(coach?.date_of_birth || '');
  const [nationality, setNationality] = useState(coach?.nationality || '');
  const [position, setPosition] = useState(coach?.position || '');
  const [image, setImage] = useState(coach?.image || null);
  const [flag, setFlag] = useState(coach?.flag || '');
  const [detail, setDetail] = useState(coach?.detail || '');

  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [dateOfBirthErr, setDateOfBirthErr] = useState('');
  const [nationalityErr, setNationalityErr] = useState('');
  const [positionErr, setPositionErr] = useState('');
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

  const setDefaultValue = (coach) => {
    setName(coach?.name || '');
    setEmail(coach?.email || '');
    setPassword(coach?.password || '');
    setDateOfBirth(coach?.date_of_birth || '');
    setNationality(coach?.nationality || '');
    setPosition(coach?.position || '');
    setImage(coach?.image || null);
    setFlag(coach?.flag || '');
    setDetail(coach?.detail || '');
    setNameErr('');
    setEmailErr('');
    setPasswordErr('');
    setDateOfBirthErr('');
    setNationalityErr('');
    setPositionErr('');
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
    setImageErr(errors.image);
    setDetailErr(errors.detail);
  };

  const createCoach = async () => {
    try {
      const playerData = {
        name,
        email,
        password,
        date_of_birth,
        nationality,
        flag,
        position,
        image,
        detail,
        access_token,
      };
      const res = await adminService.createCoach(playerData);
      if (res.user) {
        setDefaultValue();
        handleGetAllCoaches();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const updateCoach = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('date_of_birth', date_of_birth);
      formData.append('nationality', nationality);
      formData.append('position', position);
      formData.append('flag', flag);
      if (coach?.image !== image) {
        formData.append('image', image);
      }
      formData.append('detail', detail);

      const res = await adminService.updateCoach(userId, formData, access_token);
      if (res.coach) {
        setDefaultValue(res.Coach);
        handleGetAllCoaches();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const handleCLickCreate = () => {
    setIsLoader(true);
    setTimeout(() => {
      createCoach();
      setIsLoader(false);
    }, 1000);
  };

  const handleCLickUpdate = () => {
    setIsLoader(true);
    setTimeout(() => {
      updateCoach();
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
          errors={{
            name: nameErr,
            email: emailErr,
            password: passwordErr,
            date_of_birth: dateOfBirthErr,
            nationality: nationalityErr,
            position: positionErr,
            image: imageErr,
            detail: detailErr,
          }}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{coach ? 'Update coach' : 'Add coach'}</h5>
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
            {!coach && (
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
            <div className={cx('row')}>
              <div className={cx('col-md-6')}>
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
                    <option value="">{nationality || coach?.nationality || 'Select nationality'}</option>
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
                    <option value="head">Head</option>
                    <option value="assistant">Assistant</option>
                    <option value="rehabilitation">Rehabilitation</option>
                    <option value="fitness">Fitness</option>
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
          {coach ? (
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

export default ModalCreateCoaches;
