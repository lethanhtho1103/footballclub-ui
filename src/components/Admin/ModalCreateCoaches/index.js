import React, { useState } from 'react';
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
import FileInput from '../FileInput/FileInput';
import SelectInput from '../SelectInput';

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

  const validateErrors = (errors) => {
    setNameErr(errors.name);
    setEmailErr(errors.email);
    setPasswordErr(errors.password);
    setDateOfBirthErr(errors.date_of_birth);
    setNationalityErr(errors.nationality);
    setPositionErr(errors.position);
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
            <FormInputGroup
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => changeInput(e, 'name')}
              required
              placeholder="Enter your name"
              error={nameErr?.length > 0}
            />
            <FormInputGroup
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => changeInput(e, 'email')}
              required
              placeholder="Enter your email address"
              error={emailErr?.length > 0}
            />
            {!coach && (
              <FormInputGroup
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => changeInput(e, 'password')}
                required
                placeholder="Enter your password"
                error={passwordErr?.length > 0}
              />
            )}
            <div className={cx('row')}>
              <div className={cx('col-md-6')}>
                <SelectInput
                  id="nationality"
                  label="Nationality"
                  options={countries.map((country) => ({
                    value: country.value.toLowerCase(),
                    label: country.text,
                  }))}
                  value={selectedOption}
                  onChange={(e) => changeInput(e, 'nationality')}
                  error={nationalityErr?.length > 0}
                />
              </div>
              <div className={cx('col-md-6')}>
                <SelectInput
                  id="position"
                  label="Position"
                  options={[
                    { value: 'head', label: 'Head' },
                    { value: 'assistant', label: 'Assistant' },
                    { value: 'rehabilitation', label: 'Rehabilitation' },
                    { value: 'fitness', label: 'Fitness' },
                  ]}
                  value={position}
                  onChange={(e) => changeInput(e, 'position')}
                  error={positionErr?.length > 0}
                />
              </div>
            </div>

            <FormInputGroup
              id="date_of_birth"
              label="Date of birth"
              type="date"
              value={date_of_birth}
              onChange={(e) => changeInput(e, 'date_of_birth')}
              placeholder="Select your date of birth"
              error={dateOfBirthErr?.length > 0}
            />
            <FileInput label="Select file image" onChange={handleChangeImage} error={imageErr?.length > 0} />
            <FormInputGroup
              id="detail"
              label="Detail"
              type="textarea"
              value={detail}
              onChange={(e) => changeInput(e, 'detail')}
              className={cx('detail')}
              autoComplete="off"
              placeholder="Enter details"
              error={detailErr?.length > 0}
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
