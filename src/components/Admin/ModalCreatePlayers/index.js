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
          errors={{
            name: nameErr,
            email: emailErr,
            password: passwordErr,
            date_of_birth: dateOfBirthErr,
            nationality: nationalityErr,
            position: positionErr,
            jersey_number: jerseyNumberErr,
            image: imageErr,
            detail: detailErr,
          }}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{player ? 'Update player' : 'Add Player'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <FormInputGroup
              id="name"
              label="Name"
              type="input"
              value={name}
              onChange={(e) => changeInput(e, 'name')}
              placeholder="Name"
              error={nameErr?.length > 0} // Kiểm tra lỗi trực tiếp
            />
            <FormInputGroup
              id="email"
              label="Email Address"
              type="input"
              value={email}
              onChange={(e) => changeInput(e, 'email')}
              placeholder="Email"
              error={emailErr?.length > 0} // Kiểm tra lỗi trực tiếp
            />
            {!player && (
              <FormInputGroup
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => changeInput(e, 'password')}
                placeholder="Password"
                error={passwordErr?.length > 0} // Kiểm tra lỗi trực tiếp
              />
            )}
            <SelectInput
              label="Nationality"
              id="nationality"
              options={countries.map((country, index) => ({ value: country.value.toLowerCase(), label: country.text }))}
              value={selectedOption}
              onChange={(e) => changeInput(e, 'nationality')}
              error={nationalityErr?.length > 0}
            />
            <div className={cx('row')}>
              <div className={cx('col-md-6')}>
                <FormInputGroup
                  id="jersey_number"
                  label="Jersey number"
                  type="number"
                  value={jersey_number}
                  onChange={(e) => changeInput(e, 'jersey_number')}
                  placeholder="Jersey number"
                  error={jerseyNumberErr?.length > 0} // Kiểm tra lỗi trực tiếp
                />
              </div>
              <div className={cx('col-md-6')}>
                <SelectInput
                  label="Position"
                  id="position"
                  options={[
                    { value: 'Goalkeeper', label: 'Goalkeeper' },
                    { value: 'Defender', label: 'Defender' },
                    { value: 'Midfielder', label: 'Midfielder' },
                    { value: 'Forward', label: 'Forward' },
                  ]}
                  value={position}
                  onChange={(e) => changeInput(e, 'position')}
                  error={positionErr?.length > 0}
                />
              </div>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: dateOfBirthErr?.length > 0,
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
            <FileInput label="Select file image" onChange={handleChangeImage} error={imageErr?.length > 0} />
            <FormInputGroup
              id="detail"
              label="Detail"
              type="textarea"
              value={detail}
              onChange={(e) => changeInput(e, 'detail')}
              placeholder="Detail"
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
