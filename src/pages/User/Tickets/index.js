import classNames from 'classnames/bind';
import style from './Tickets.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import premier from '~/assets/images/premier.webp';
const cx = classNames.bind(style);

function Tickets() {
  return (
    <div>
      <HeaderUser />
      <main className={cx('main-content')}>
        <header className={cx('header')}>
          <div className={cx('banner')}>
            <h3>TICKETS</h3>
            <div className={cx('text')}>
              Buy official Manchester City tickets and hospitality experiences direct from the Club
            </div>
          </div>
          <div className={cx('ticket-filter')}>
            <h3 className={cx('title')}>Upcoming matches</h3>
            <div className={cx('filters')}>
              <div className={cx('filter-item')}>
                <div className={cx('label')}>Location</div>
                <select>
                  <option value="">All Locations</option>
                  <option value="1">Home</option>
                  <option value="0">Away</option>
                </select>
              </div>
              <div className={cx('filter-item')}>
                <div className={cx('btn-filter')}>Filter</div>
              </div>
            </div>
          </div>
        </header>
        <div className={cx('body')}>
          <div className={cx('container')}>
            <ul className={cx('list-match')}>
              <li className={cx('match-item')}>
                <div className={cx('wrapper')}>
                  <div className={cx('heading')}>
                    <div className={cx('logo-premier')}>
                      <img src={premier} alt="Premier" />
                    </div>
                    <div className={cx('info')}>
                      <time>Wed 31 Jan</time>
                      <div>Premier League</div>
                      <div>Etihad Stadium</div>
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <div className={cx('wrapper')}>
                      <div className={cx('first')}>
                        <div className={cx('name')}>Tottenham Hotspur</div>
                        <img
                          src="https://www.mancity.com/meta/media/t02jppxo/spurs-logo-with-outline.png?width=52&height=52"
                          alt="first-name"
                        />
                      </div>
                      <div className={cx('time')}>
                        <time>14:00</time>
                        <p>GMT</p>
                      </div>
                      <div className={cx('second')}>
                        <div className={cx('logo')}>
                          <img
                            src="https://www.mancity.com/meta/media/yzscd2rf/manchester_city_fc_badge.png?width=52&height=52"
                            alt="second-name"
                          />
                        </div>
                        <div className={cx('name')}>Manchester City</div>
                      </div>
                    </div>
                  </div>
                  <div className={cx('btn')}>
                    <div className={cx('btn-buy')}>Buy now</div>
                    <div className={cx('description')}>Tickets available</div>
                  </div>
                </div>
                <div className={cx('status')}>
                  <span className={cx('bg-yellow')}></span>
                  <div>Upcoming</div>
                </div>
              </li>
              <li className={cx('match-item')}>
                <div className={cx('wrapper')}>
                  <div className={cx('heading')}>
                    <div className={cx('logo-premier')}>
                      <img src={premier} alt="Premier" />
                    </div>
                    <div className={cx('info')}>
                      <time>Wed 31 Jan</time>
                      <div>Premier League</div>
                      <div>Etihad Stadium</div>
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <div className={cx('wrapper')}>
                      <div className={cx('first')}>
                        <div className={cx('name')}>Tottenham Hotspur</div>
                        <img
                          src="https://www.mancity.com/meta/media/t02jppxo/spurs-logo-with-outline.png?width=52&height=52"
                          alt="first-name"
                        />
                      </div>
                      <div className={cx('time')}>
                        <time>14:00</time>
                        <p>GMT</p>
                      </div>
                      <div className={cx('second')}>
                        <div className={cx('logo')}>
                          <img
                            src="https://www.mancity.com/meta/media/yzscd2rf/manchester_city_fc_badge.png?width=52&height=52"
                            alt="second-name"
                          />
                        </div>
                        <div className={cx('name')}>Manchester City</div>
                      </div>
                    </div>
                  </div>
                  <div className={cx('btn')}>
                    <div className={cx('btn-buy')}>Buy now</div>
                    <div className={cx('description')}>Tickets available</div>
                  </div>
                </div>
                <div className={cx('status')}>
                  <span className={cx('bg-yellow')}></span>
                  <div>Upcoming</div>
                </div>
              </li>
              <li className={cx('match-item')}>
                <div className={cx('wrapper')}>
                  <div className={cx('heading')}>
                    <div className={cx('logo-premier')}>
                      <img src={premier} alt="Premier" />
                    </div>
                    <div className={cx('info')}>
                      <time>Wed 31 Jan</time>
                      <div>Premier League</div>
                      <div>Etihad Stadium</div>
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <div className={cx('wrapper')}>
                      <div className={cx('first')}>
                        <div className={cx('name')}>Tottenham Hotspur</div>
                        <img
                          src="https://www.mancity.com/meta/media/t02jppxo/spurs-logo-with-outline.png?width=52&height=52"
                          alt="first-name"
                        />
                      </div>
                      <div className={cx('time')}>
                        <time>14:00</time>
                        <p>GMT</p>
                      </div>
                      <div className={cx('second')}>
                        <div className={cx('logo')}>
                          <img
                            src="https://www.mancity.com/meta/media/yzscd2rf/manchester_city_fc_badge.png?width=52&height=52"
                            alt="second-name"
                          />
                        </div>
                        <div className={cx('name')}>Manchester City</div>
                      </div>
                    </div>
                  </div>
                  <div className={cx('btn')}>
                    <div className={cx('btn-buy')}>Buy now</div>
                    <div className={cx('description')}>Tickets available</div>
                  </div>
                </div>
                <div className={cx('status')}>
                  <span className={cx('bg-yellow')}></span>
                  <div>Upcoming</div>
                </div>
              </li>
              <li className={cx('match-item')}>
                <div className={cx('wrapper')}>
                  <div className={cx('heading')}>
                    <div className={cx('logo-premier')}>
                      <img src={premier} alt="Premier" />
                    </div>
                    <div className={cx('info')}>
                      <time>Wed 31 Jan</time>
                      <div>Premier League</div>
                      <div>Etihad Stadium</div>
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <div className={cx('wrapper')}>
                      <div className={cx('first')}>
                        <div className={cx('name')}>Tottenham Hotspur</div>
                        <img
                          src="https://www.mancity.com/meta/media/t02jppxo/spurs-logo-with-outline.png?width=52&height=52"
                          alt="first-name"
                        />
                      </div>
                      <div className={cx('time')}>
                        <time>14:00</time>
                        <p>GMT</p>
                      </div>
                      <div className={cx('second')}>
                        <div className={cx('logo')}>
                          <img
                            src="https://www.mancity.com/meta/media/yzscd2rf/manchester_city_fc_badge.png?width=52&height=52"
                            alt="second-name"
                          />
                        </div>
                        <div className={cx('name')}>Manchester City</div>
                      </div>
                    </div>
                  </div>
                  <div className={cx('btn')}>
                    <div className={cx('btn-buy')}>Buy now</div>
                    <div className={cx('description')}>Tickets available</div>
                  </div>
                </div>
                <div className={cx('status')}>
                  <span className={cx('bg-yellow')}></span>
                  <div>Upcoming</div>
                </div>
              </li>
              <li className={cx('match-item')}>
                <div className={cx('wrapper')}>
                  <div className={cx('heading')}>
                    <div className={cx('logo-premier')}>
                      <img src={premier} alt="Premier" />
                    </div>
                    <div className={cx('info')}>
                      <time>Wed 31 Jan</time>
                      <div>Premier League</div>
                      <div>Etihad Stadium</div>
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <div className={cx('wrapper')}>
                      <div className={cx('first')}>
                        <div className={cx('name')}>Tottenham Hotspur</div>
                        <img
                          src="https://www.mancity.com/meta/media/t02jppxo/spurs-logo-with-outline.png?width=52&height=52"
                          alt="first-name"
                        />
                      </div>
                      <div className={cx('time')}>
                        <time>14:00</time>
                        <p>GMT</p>
                      </div>
                      <div className={cx('second')}>
                        <div className={cx('logo')}>
                          <img
                            src="https://www.mancity.com/meta/media/yzscd2rf/manchester_city_fc_badge.png?width=52&height=52"
                            alt="second-name"
                          />
                        </div>
                        <div className={cx('name')}>Manchester City</div>
                      </div>
                    </div>
                  </div>
                  <div className={cx('btn')}>
                    <div className={cx('btn-buy')}>Buy now</div>
                    <div className={cx('description')}>Tickets available</div>
                  </div>
                </div>
                <div className={cx('status')}>
                  <span className={cx('bg-yellow')}></span>
                  <div>Upcoming</div>
                </div>
              </li>
              <li className={cx('match-item')}>
                <div className={cx('wrapper')}>
                  <div className={cx('heading')}>
                    <div className={cx('logo-premier')}>
                      <img src={premier} alt="Premier" />
                    </div>
                    <div className={cx('info')}>
                      <time>Wed 31 Jan</time>
                      <div>Premier League</div>
                      <div>Etihad Stadium</div>
                    </div>
                  </div>
                  <div className={cx('content')}>
                    <div className={cx('wrapper')}>
                      <div className={cx('first')}>
                        <div className={cx('name')}>Tottenham Hotspur</div>
                        <img
                          src="https://www.mancity.com/meta/media/t02jppxo/spurs-logo-with-outline.png?width=52&height=52"
                          alt="first-name"
                        />
                      </div>
                      <div className={cx('time')}>
                        <time>14:00</time>
                        <p>GMT</p>
                      </div>
                      <div className={cx('second')}>
                        <div className={cx('logo')}>
                          <img
                            src="https://www.mancity.com/meta/media/yzscd2rf/manchester_city_fc_badge.png?width=52&height=52"
                            alt="second-name"
                          />
                        </div>
                        <div className={cx('name')}>Manchester City</div>
                      </div>
                    </div>
                  </div>
                  <div className={cx('btn')}>
                    <div className={cx('btn-buy')}>Buy now</div>
                    <div className={cx('description')}>Tickets available</div>
                  </div>
                </div>
                <div className={cx('status')}>
                  <span className={cx('bg-yellow')}></span>
                  <div>Upcoming</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <FooterUser />
    </div>
  );
}

export default Tickets;
