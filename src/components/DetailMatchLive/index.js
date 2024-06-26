import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailMatch.module.scss';
import bg1 from '~/assets/images/bg.jpg';
import cityLogo from '~/assets/images/manchester_city.webp';
import { baseUrl } from '~/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import adminService from '~/services/adminService';
import { Button, Modal } from 'react-bootstrap';
import Loader from '../Loader';
import ToastMassage from '../Admin/ToastMassage';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';

const cx = classNames.bind(styles);

function DetailMatchLive({ match, isLive, handleGetMatchLive }) {
    const access_token = useSelector(accessTokenSelector);
    const [, setTime] = useState(new Date());
    const [gameDetailId, setGameDetailId] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
    const [matchStatus, setMatchStatus] = useState('live');
    const [showClock, setShowClock] = useState(true); // State để kiểm soát việc hiển thị đồng hồ
    const [elapsedMinutes, setElapsedMinutes] = useState(0); // Thêm state để lưu trữ số phút đã trôi qua

    const [obToast, setObToast] = useState({
        content: '',
        isShow: false,
    });

    useEffect(() => {
        // Tính toán thời gian khi component được render lần đầu
        const startMatchTime = new Date(match?.game_date + 'T' + match?.game_time);
        const currentTime = new Date();
        const diffMilliseconds = currentTime - startMatchTime;
        const elapsedMinutes = Math.ceil(diffMilliseconds / (1000 * 60));
        setElapsedMinutes(elapsedMinutes);

        // Đặt thời gian cho đồng hồ hiển thị
        setTime(currentTime);
    }, [match]);

    const handleDelete = () => {
        setIsLoader(true);
        setTimeout(async () => {
            const res = await adminService.deleteDetailMatchLive(gameDetailId, access_token);
            setObToast({ content: res.message, isShow: true });
            setIsLoader(false);
            handleGetMatchLive();
            handleClose();
        }, 500);
    };

    const handleClose = () => setShowDeleteConfirmationDialog(false);

    const DeleteConfirmationDialog = () => {
        return (
            <Modal show={showDeleteConfirmationDialog} onHide={handleClose} centered>
                <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#fff', borderRadius: '5px', padding: '20px 20px 10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                    <Modal.Title style={{ fontSize: '24px' }}>Confirm details of match deletion?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body" style={{ padding: '20px 20px 20px', fontSize: '1.4rem' }}>
                    Are you sure you want to delete?
                </Modal.Body>
                <Modal.Footer className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: '#385678', color: '#fff', fontSize: '1.3rem', fontWeight: '600', borderRadius: '5px', padding: '7.4px 16px', marginRight: '8px', border: 'none' }}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} style={{ backgroundColor: '#d9534f', color: '#fff', fontSize: '1.3rem', fontWeight: '600', borderRadius: '5px', padding: '7px 16px' }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    useEffect(() => {
        let interval;
        if (isLive) {
            interval = setInterval(() => {
                setTime(new Date());
                setElapsedMinutes(prevMinutes => prevMinutes + 1); // Cập nhật elapsedMinutes mỗi giây
            }, 60000);
        }
        return () => clearInterval(interval);
    }, [isLive]);

    function convertTimeFormat(timeString) {
        var timeParts = timeString?.split(':');
        if (!timeParts) return '';
        var hour = timeParts[0];
        var minute = timeParts[1];
        return `${hour}:${minute}`;
    }

    const handlePauseMatch = () => {
        setMatchStatus('paused');
        setShowClock(false); // Ẩn đồng hồ khi pause
    };

    const handleContinueMatch = () => {
        setMatchStatus('live');
        setShowClock(true); // Hiện lại đồng hồ khi tiếp tục
        setTime(new Date());
        // Cập nhật lại elapsedMinutes, bắt đầu từ số 45
        setElapsedMinutes(45);
    };

    return (
        <>
            {isLoader && <Loader />}
            {DeleteConfirmationDialog()}
            {obToast?.content?.length > 0 && (
                <ToastMassage isShow={obToast.show} content={obToast.content} handleClose={() => setObToast({ content: '' })} />
            )}
            <div className={cx('container')}>
                <div className={cx('background')}>
                    <img src={bg1} alt="bg1" />
                </div>
                <div className={cx('wrapper')}>
                    <div className={cx('competition')}>Premier League</div>
                    <div className={cx('venue')}>
                        <time>{match?.game_date}</time>
                        <p>{match?.stadium.name}</p>
                    </div>
                    <div className={cx('fixture')}>
                        <div className={cx('first')}>
                            <div className={cx('name')}>{match?.host === 1 ? 'Manchester City' : match?.club.name}</div>
                            <div className={cx('logo')}>
                                {match?.host === 1 ? (
                                    <img src={cityLogo} alt="man-city" />
                                ) : (
                                    <img src={`${baseUrl}${match?.club.image}`} alt="Name" />
                                )}
                            </div>
                        </div>
                        {matchStatus === 'live' || matchStatus === 'paused' ? (
                            match?.host === 1 ? (
                                <>
                                    <div className={cx('score')}>
                                        <div className={cx('host')}>{match?.goals_scored}</div>
                                        <span>-</span>
                                        <div className={cx('away')}>{match?.goals_conceded}</div>
                                    </div>
                                    {match?.state === 'in_progress' && showClock && <div className={cx('minute')}>{elapsedMinutes}'</div>}
                                </>
                            ) : (
                                <>
                                    <div className={cx('score')}>
                                        <div className={cx('away')}>{match?.goals_conceded}</div>
                                        <span>-</span>
                                        <div className={cx('host')}>{match?.goals_scored}</div>
                                    </div>
                                    {match?.state === 'in_progress' && showClock && <div className={cx('minute')}>{elapsedMinutes}'</div>}
                                </>
                            )
                        ) : (
                            <div className={cx('time')}>
                                <time>{convertTimeFormat(match?.game_time)}</time>
                                <p>GMT</p>
                            </div>
                        )}
                        <div className={cx('second')}>
                            {match?.host !== 1 ? (
                                <img src={cityLogo} alt="man-city" />
                            ) : (
                                <img src={`${baseUrl}${match?.club.image}`} alt="Name" />
                            )}
                            <div className={cx('name')}>{match?.host !== 1 ? 'Manchester City' : match?.club.name}</div>
                        </div>
                    </div>

                    {isLive ? (
                        matchStatus === 'live' ? (
                            <div className={cx('live')}>Live now</div>
                        ) : matchStatus === 'paused' ? (
                            <div className={cx('halftime')}>Halftime</div>
                        ) : null
                    ) : (
                        <div className={cx('upcoming')}>Upcoming</div>
                    )}

                </div>
            </div>
            {match?.state === 'in_progress' && (
                <div className={cx('detail-match')}>
                    <div className={cx('haft-first')}>
                        <div className={cx('title')}>
                            <span>Detail match</span>
                        </div>
                        <div className={cx('detail', { reverse: match?.host === 0 })}>
                            <div className={cx('host')}>
                                <ul>
                                    {match?.game_detail
                                        .filter((detail) => detail.is_away === 0)
                                        .map((detail) => (
                                            <li key={detail.game_detail_id}>
                                                {detail.time}'
                                                {detail.type === 'yellow' && (
                                                    <div>
                                                        <span className={cx('yellow')}></span>
                                                    </div>
                                                )}
                                                {detail.type === 'red' && (
                                                    <div>
                                                        <span className={cx('red')}></span>
                                                    </div>
                                                )}
                                                <p>{detail.player_name}</p>
                                                <i
                                                    className={cx('icon-delete')}
                                                    onClick={() => {
                                                        setGameDetailId(detail.game_detail_id);
                                                        setShowDeleteConfirmationDialog(true);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCircleMinus} />
                                                </i>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className={cx('away')}>
                                <ul>
                                    {match?.game_detail
                                        .filter((detail) => detail.is_away === 1)
                                        .map((detail) => (
                                            <li key={detail.game_detail_id}>
                                                {detail.time}'
                                                {detail.type === 'yellow' && (
                                                    <div>
                                                        <span className={cx('yellow')}></span>
                                                    </div>
                                                )}
                                                {detail.type === 'red' && (
                                                    <div>
                                                        <span className={cx('red')}></span>
                                                    </div>
                                                )}
                                                <p>{detail.player_name}</p>
                                                <i
                                                    className={cx('icon-delete')}
                                                    onClick={() => {
                                                        setGameDetailId(detail.game_detail_id);
                                                        setShowDeleteConfirmationDialog(true);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCircleMinus} />
                                                </i>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {matchStatus === 'live' ? (
                        <Button onClick={handlePauseMatch}>Pause</Button>
                    ) : matchStatus === 'paused' ? (
                        <Button onClick={handleContinueMatch}>Continue</Button>
                    ) : null}
                </div>
            )}
        </>
    );
}

export default DetailMatchLive;
