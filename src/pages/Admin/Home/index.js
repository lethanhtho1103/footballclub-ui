import classNames from 'classnames/bind';
import style from './Home.module.scss';

import { Container } from 'react-bootstrap';
import Header from '~/components/Admin/Header';

const cx = classNames.bind(style);

function Home() {
  const links = [
    { name: 'QUẢN LÝ CẦU THỦ', to: '/admin' },
    { name: 'QUẢN LÝ TRẬN ĐẤU', to: '/admin' },
    { name: 'THỐNG KÊ', to: '/admin' },
  ];
  return (
    <>
      <div className={cx('wrap')}>
        <div className={cx('header')}>
          <Container>
            <Header links={links} />
            <div className={cx('header-main')}>
              <h2>Manchester City Club</h2>
              <span>
                Đây là trang web quản lý dành cho admin, bạn là người có quyến quyết định mọi hoạt động của câu lạc bộ
                bao gồm: quản lý cầu thủ, huẩn luyện viên, tài khoản người dùng, thống kê doanh thu,... và giải quyết
                thắc mắc sẽ do bạn quyết định và giải quyết.
              </span>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Home;
