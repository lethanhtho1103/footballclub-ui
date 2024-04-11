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

const cx = classNames.bind(style);

function ModalCreateCompanys({ handleClose, handleGetAllCompany, company, access_token, companyId }) {
    const [isLoader, setIsLoader] = useState(false);
    const [name, setName] = useState(company?.name || '');
    const [email, setEmail] = useState(company?.email || '');

    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

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
            default: {
                break;
            }
        }
    };

    const setDefaultValue = (company) => {
        setName(company?.name || '');
        setEmail(company?.email || '');
        setNameErr('');
        setEmailErr('');
    };

    const validateErrors = (errors) => {
        if (errors && errors.name) {
            setNameErr(errors.name);
        }
        if (errors && errors.email) {
            setEmailErr(errors.email);
        }
    };


    const createCompany = async () => {
        try {
            const companyData = {
                name,
                email,
                access_token,
            };
            const res = await adminService.createCompany(companyData);
            if (res.company) {
                setDefaultValue();
                handleGetAllCompany();
                setObToast({ content: res.message, isShow: true });
            }
        } catch (error) {
            validateErrors(error.response.data.errors);
        }
    };

    const updateCompany = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            const res = await adminService.updateCompany(companyId, formData, access_token);
            if (res.company) {
                setDefaultValue(res.company);
                handleGetAllCompany();
                setObToast({ content: res.message, isShow: true });
            }
        } catch (error) {
            validateErrors(error.response.data.errors);
        }
    };

    const handleCLickCreate = () => {
        setIsLoader(true);
        setTimeout(() => {
            createCompany();
            setIsLoader(false);
        }, 1000);
    };

    const handleCLickUpdate = () => {
        setIsLoader(true);
        setTimeout(() => {
            updateCompany();
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
                <TableErrors errors={{ name: nameErr, email: emailErr }} />
                <Modal.Header closeButton>
                    <h5 className={cx('modal-title')}>{company ? 'Update company' : 'Add company'}</h5>
                </Modal.Header>
                <Modal.Body className={cx('modal-body')}>
                    <Form>
                        <FormInputGroup
                            id="name"
                            label="Name"
                            type="input"
                            value={name}
                            onChange={(e) => changeInput(e, 'name')}
                            required
                            placeholder="Enter your name"
                            error={nameErr?.length > 0}
                        />
                        <FormInputGroup
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => changeInput(e, 'email')}
                            required
                            placeholder="Enter your email"
                            error={emailErr?.length > 0}
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
                    {company ? (
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

export default ModalCreateCompanys;
