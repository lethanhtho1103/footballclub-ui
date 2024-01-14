import HeaderUser from '~/components/HeaderUser';
import styles from './Players.module.scss';
import classNames from 'classnames/bind';
import FooterUser from '~/components/FooterUser';

const cx = classNames.bind(styles);
function Players() {
  return (
    <div className={cx('mc-page')}>
      <HeaderUser />
      <main className={cx('contain')}>
        <header className={cx('header')}>
          <div className={cx('container')}>
            <div className={cx('sub-header')}>
              <h1>Players</h1>
              <div className={cx('sponsor')}>
                <span>BROUGHT TO YOU BY</span>
                <img src="https://www.mancity.com/dist/images/puma_crest.png" alt="sponsor" />
              </div>
            </div>
          </div>
        </header>
        <div className={cx('squad-group')}>
          <section>
            <h2>GOALKEEPERS</h2>
            <div className={cx('squad-list-wrapper')}>
              <ul className={cx('member-list')}>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Ederson</span>
                      {/* <span className={cx('name')}>Carson</span> */}
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <h2>GOALKEEPERS</h2>
            <div className={cx('squad-list-wrapper')}>
              <ul className={cx('member-list')}>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Ederson</span>
                      {/* <span className={cx('name')}>Carson</span> */}
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Scott</span>
                      <span className={cx('name')}>Carson</span>
                    </h3>
                  </div>
                </li>
                <li className={cx('member-item')}>
                  <div className={cx('header')}>
                    <div className={cx('shirt-number')}>33</div>
                    <div className={cx('photo')}>
                      <img
                        src="	https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                        alt="player"
                      />
                    </div>
                    <div className={cx('country')}>
                      <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <h3>
                      <span className={cx('name')}>Ederson</span>
                      {/* <span className={cx('name')}>Carson</span> */}
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <FooterUser />
      </main>
    </div>
  );
}

export default Players;
