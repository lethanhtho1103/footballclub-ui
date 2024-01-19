function PlayerSection({ title, position, players, coaches, cx }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className={cx('squad-list-wrapper')}>
        <ul className={cx('member-list')}>
          {players
            .filter((player) => player.position === position)
            .map((player, i) => (
              <li className={cx('member-item')} key={i}>
                <div className={cx('header')}>
                  <div className={cx('shirt-number')}>{player.jersey_number}</div>
                  <div className={cx('photo')}>
                    <img
                      src="https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                      alt="player"
                    />
                  </div>
                  <div className={cx('country')}>
                    <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                  </div>
                </div>
                <div className={cx('content')}>
                  <h3>
                    <span className={cx('name')}>{player.name}</span>
                  </h3>
                </div>
              </li>
            ))}
        </ul>
        {coaches && (
          <ul className={cx('member-list')}>
            {coaches.map((coache, i) => (
              <li className={cx('member-item')} key={i}>
                <div className={cx('header')}>
                  <div className={cx('shirt-number')}>{coache.jersey_number}</div>
                  <div className={cx('photo')}>
                    <img
                      src="https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                      alt="coache"
                    />
                  </div>
                  <div className={cx('country')}>
                    <img src="https://mediacdn.mancity.com/meta/media/kbujcobi/gb-eng.svg" alt="country" />
                  </div>
                </div>
                <div className={cx('content')}>
                  <h3>
                    <span className={cx('name')}>{coache.name}</span>
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default PlayerSection;
