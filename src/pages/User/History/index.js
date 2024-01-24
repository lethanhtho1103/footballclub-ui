import classNames from 'classnames/bind';
import style from './History.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import bgHistory from '../../../assets/images/bg-history.webp';

const cx = classNames.bind(style);

function History() {
  return (
    <div>
      <HeaderUser />
      <div className={cx('treble-winners')}>
        <img src="https://www.mancity.com/dist/images/events/treble/treble.svg" alt="treble" />
        <img src="https://www.mancity.com/dist/images/events/treble/treble-trophies.svg" alt="cup" />
        <img src="https://www.mancity.com/dist/images/events/treble/winners.svg" alt="winners" />
      </div>
      <main className={cx('main-content')}>
        <header className={cx('header-content')}>
          <img src={bgHistory} alt="Etihad" />
        </header>
        <div className={cx('content')}>
          <div className={cx('container')}>
            <h2>Club Records</h2>
            <p>
              <strong>Highest appearance maker:&nbsp;</strong>Alan Oakes (680)
            </p>
            <p>
              <strong>Club record goal-scorer: </strong>Sergio Aguero (260)
            </p>
            <p>
              <strong>First club to win an English domestic treble: </strong>2018/19 (plus 2018 FA Community/Charity
              Shield)
            </p>
            <p>
              <strong>Most points in a season (2 for a win):&nbsp;</strong>62 (Division Two, 1946/47)
            </p>
            <p>
              <strong>Most points in a season (3 for a win):&nbsp;</strong>100 (Premier League, 2017/18)
            </p>
            <p>
              <strong>Most league goals in a season: </strong>108 (Division Two, 1926/27: 42 games) and Division One
              (2001/02: 46 games)
            </p>
            <p>
              <strong>Most goals in a season (all competitions):</strong> 169 (2018/19)
            </p>
            <p>
              <strong>Most league goals by one player in a season:&nbsp;</strong>36:{' '}
              <a href="https://www.mancity.com/players/erling-haaland">Erling Haaland</a> (Premier League, 2022/23)
            </p>
            <p>
              <strong>Most wins in a row (all competitions) - English top-flight record: </strong>21 (19 December 2020 -
              2 March 2021)
            </p>
            <p>
              <strong>Most league wins in a row:&nbsp;</strong>18 (26 August – 27 December 2017)
            </p>
            <p>
              <strong>Most Premier League wins in a row:</strong> 11 (equalling City's previous record in 2017 and
              Chelsea's of 2008)
            </p>
            <p>
              <strong>Most home league wins in a row:</strong> 20 (5 March 2011 – 21 March 2012)
            </p>
            <p>
              <strong>Most home wins in a row (all competitions):</strong> 20 (9 September 2017 – 4 March 2018)
            </p>
            <p>
              <strong>Most away league wins in a row:</strong> 11 (21 May 2017 - 27 December 2017)
            </p>
            <p>
              <strong>Most away wins in a row (all competitions):</strong> 19 (19 December 2020 - 1 May 2021)
            </p>
            <p>
              <strong>Club record unbeaten run:</strong> 28 (27 April 2017 - 3 December 2017 and 25 November 2020 - 2
              March 2021)
            </p>
            <p>
              <strong>Club record unbeaten run away from home:</strong> 22 (5 November 2020 - 1 May 2021)
            </p>
            <p>
              <strong>Premier League record for longest winning run of games in a calendar year:</strong> 13 (3 January
              - 2 March 2021)
            </p>
            <p>
              <strong>Highest number of wins achieved in a single month in English football:</strong> 9: January 2021
            </p>
            <p>
              <strong>Longest winning run by an English side in the Champions League:&nbsp;</strong>7 (9 December 2020 -
              4 May 2021)
            </p>
            <p>
              <strong>Club record unbeaten home run in the Champions League:</strong> 25 (7 November 2018 - 17 May 2023)
            </p>
            <p>
              <strong>Club record unbeaten run in the Champions League:&nbsp;</strong>13 (6 September 2022 - 10 June
              2023)&nbsp;
            </p>
            <p>
              <strong>Most clean sheets in one season:</strong> 33 (61 matches, 2018/19)
            </p>
            <p>
              <strong>Most clean sheets by an individual goalkeeper in one season:</strong> 29: Joe Hart (2010/11)
            </p>
            <p>
              <strong>Most consecutive league clean sheets during a season:</strong> 6 (15 September 2018 – 29 October
              2018)
            </p>
            <p>
              <strong>Record league victory: </strong>11–3 v Lincoln City, 23 March 1895
            </p>
            <p>
              <strong>Record FA Cup victory: </strong>12–0<span> v</span>
              <span>&nbsp;Liverpool Stanley, 4 October 1890</span>
            </p>
            <p>
              <strong>Record European victory: </strong>7–0 v&nbsp; Schalke 04 (UEFA Champions League: Round of 16
              second leg), 12 March 2019
            </p>
            <p>
              <strong>Highest home attendance: </strong>84,569 v Stoke City, 3 March 1934. (Record home attendance in
              English football)
            </p>
            <p>
              <strong>Most capped player: </strong>David Silva (Spain)&nbsp;
            </p>
            <h2>Timeline</h2>
            <h2>2000s</h2>
            <p>
              <strong>2000</strong>&nbsp;City return to the Premiership following back-to-back promotions. A 4-1 victory
              over Blackburn at Ewood Park to seal promotion is followed by a celebratory pitch invasion by the Blues’
              enormous travelling support.
            </p>
            <p>
              <strong>2002</strong> Future manager Stuart Pearce captains City as we are promoted back to the
              Premiership, breaking club records for the most goals scored and most points gained in a season along the
              way.
            </p>
            <p>
              <strong>2003</strong>&nbsp;It’s an emotional farewell to Maine Road as City’s home for 80 years stages its
              last football match, City vs. Southampton on Sunday 11th May. The club make the move to the impressive,
              48,000 capacity, City of Manchester Stadium.
            </p>
            <p>
              <strong>2007</strong>&nbsp;Sven Goran Eriksson replaces Stuart Pearce as manager, and on 15th December
              City establish a 'top flight' club-record of nine straight home League wins at the start of the season.
            </p>
            <p>
              <strong>2008</strong>&nbsp;The Abu Dhabi United Group become the new owners of Manchester City. Former
              Wales, Barcelona, Bayern Munich and Manchester United star Mark Hughes becomes the new City Manager. The
              club break the British transfer record for the second time with the £32.5m signing of Robinho from Real
              Madrid.
            </p>
            <p>
              <strong>2009</strong>&nbsp;Roberto Mancini, former manager of Inter Milan replaces Mark Hughes in
              December.
            </p>
            <p>
              <strong>2010</strong>&nbsp;The Blues enjoy their best ever Premier League campaign, finishing 5
              <sup>th</sup>&nbsp;and qualifying for the Europa League in the process, as well as reaching the League Cup
              semi finals.
            </p>
            <p>
              <strong>2011</strong>&nbsp;The long wait for a trophy ends when the Blues beat Stoke 1-0 to lift the FA
              Cup, and qualify for the 2011/12 Champions League for the first time too!
            </p>
            <p>
              <strong>2012</strong>&nbsp;City win the League Championship for the first time in 44 years following a
              thrilling Premier League campaign. A last-gasp Sergio Aguero goal against QPR secures the title in the
              most dramatic of fashions at a jubilant Etihad Stadium.
            </p>
            <p>
              <strong>2014</strong>&nbsp;Manuel Pellegrini's side clinch two trophies in one season for the first time
              since 1970, lifting the Capital One Cup and Premier League title. A 3-1 win over Sunderland at Wembley in
              March earns the Club's first League Cup win since 1976 before the Blues go on to win the League
              Championship by two points.
            </p>
            <p>
              <strong>2016&nbsp;</strong>In February,&nbsp;City lift the League Cup for the second time in three
              seasons, winning a shootout against Liverpool following a 1-1 draw at Wembley. Willy Caballero saves three
              penalties in a row to clinch the third trophy of Manuel Pellegrini's reign. Earlier in the same month it's
              announced that <a href="https://www.mancity.com/players/pep-guardiola">Pep Guardiola</a> will replace
              Pellegrini in the summer after agreeing a three-year contract with the Club.
            </p>
            <p>
              <strong>2018</strong>: City beat Arsenal 3-0 to win the Carabao Cup at Wembley.
            </p>
            <p>
              <strong>2018:&nbsp;</strong>City crowned Premier League champions for the fifth time after a
              record-breaking campaign under <a href="https://www.mancity.com/players/pep-guardiola">Pep Guardiola</a>.
            </p>
            <p>
              <strong>2019:</strong>&nbsp;City beat Chelsea on penalties to win Carabao Cup at Wembley.&nbsp;
            </p>
            <p>
              <strong>2019</strong>: City beat Brighton and are confirmed as Premier League champions for the sixth time
              in the Club's history.
            </p>
            <p>
              <strong>2019:</strong>&nbsp;City win FA Cup with record-equalling 6-0 win over Watford
            </p>
            <p>
              <strong>2020:</strong>&nbsp;City win third-successive League Cup with 2-1 win over Aston
              Villa.&nbsp;&nbsp;
            </p>
            <p>
              <strong>2021:&nbsp;</strong>City secure a third Premier League title in four seasons, and also clinch a
              fourth successive League Cup triumph.
            </p>
            <p>
              <strong>2022:&nbsp;</strong>After an epic battle with Liverpool, City claim a fourth Premier League title
              in five years with a dramatic last-day win over Aston Villa.
            </p>
            <p>
              <strong>2023:&nbsp;</strong>City reach new heights as we win the Treble. A third consecutive Premier
              League title in May, followed by an FA Cup triumph in an all-Manchester final. And for the first time in
              the Club's history, the team lifted the Champions League trophy after a 1-0 win over Inter. We followed
              that up with victory in the UEFA Super Cup, defeating Sevilla on penalties in Greece. But that's wasn't
              all for 2023 - in December we won the FIFA Club World Cup, ensuring our position as ‘The Best Team in the
              World and all the Land’.
            </p>
            <h2>
              <b>1990s</b>
            </h2>
            <p>
              <strong>1992</strong>&nbsp;The FA Premier League is formed, with City v QPR being the first ever live
              Monday night Sky game.
            </p>
            <p>
              <strong>1994&nbsp;</strong>City say farewell to the much loved Kippax Stand as legislation forces the
              closure of terracing at Premier League grounds. In its day the ‘Kippax’ was the largest standing area in
              the country.
            </p>
            <p>
              <strong>1995/96</strong>&nbsp;A dramatic season sees City appoint three different managers; Alan Ball,
              Steve Coppell and Frank Clark as well as significant spells as caretaker for Asa Hartford and Phil Neal.
            </p>
            <p>
              <strong>1997&nbsp;</strong>City unveil a new club badge. This new design features the Latin motto
              “Superbia in proelio” meaning ‘Pride in battle’.
            </p>
            <p>
              <strong>1999</strong>&nbsp;One of the most dramatic games ever played at Wembley sees City promoted after
              a penalty shoot-out against Gillingham in the Division Two Play-Off.
            </p>
            <h2>
              <b>1980s</b>
            </h2>
            <p>
              <strong>1981&nbsp;</strong>City reach the 100th FA Cup final against Spurs. Following a 1-1 draw on the
              Saturday, a replay was played again at Wembley, regarded as one of the most entertaining Cup finals ever.
              City were narrowly defeated 3-2 following a famous Ricky Villa goal but for City fans, Steve Mackenzie’s
              30 yard volley was the better strike.
            </p>
            <p>
              <strong>1986&nbsp;</strong>City play in the inaugural Full Members’ Cup final at Wembley before a crowd of
              68,000.
            </p>
            <p>
              <strong>1987&nbsp;</strong>A club record 10-1 demolition of Huddersfield Town is recorded at Maine Road in
              1987.
            </p>
            <p>
              <strong>1989&nbsp;</strong>City are promoted in dramatic style in the last game of the season at Bradford.
              The highest-ever Maine Road derby win is recorded with City thumping neighbours United 5-1.
            </p>
            <h2>
              <b>1970s</b>
            </h2>
            <p>
              <strong>1970&nbsp;</strong>City complete a brilliant European and domestic cup double by winning the
              European Cup Winners Cup and the League Cup.
            </p>
            <p>
              <strong>1972&nbsp;</strong>The City badge is replaced with the red rose of Lancashire.
            </p>
            <p>
              <strong>1974&nbsp;</strong>City lose the League Cup final to Wovles.
            </p>
            <p>
              <strong>1976&nbsp;</strong>The Blues beat Newcastle United 2-1 at Wembley, with goals goals from Peter
              Barnes and a spectacular over-head kick from Dennis Tueart.
            </p>
            <p>
              <strong>1979&nbsp;</strong>The club break the transfer record, signing Steve Daley for £1,450,277.&nbsp;
              Within 2 years the Blues became the first side to sign three individual £1m+ players (Kevin Reeves &amp;
              Trevor Francis were the other two).
            </p>
            <h2>
              <b>1960s</b>
            </h2>
            <p>
              <b>
                <strong>1965&nbsp;</strong>
              </b>
              A new club badge is developed in 1965, based around the central part of the City of Manchester coat of
              arms.
            </p>
            <p>
              <b>
                <strong>1966&nbsp;</strong>
              </b>
              City are promoted as champions of Division Two, under the management team of Joe Mercer and Malcolm
              Allison.
            </p>
            <p>
              <b>
                <strong>1968&nbsp;</strong>
              </b>
              The Blues defeat Newcastle United on the final day of the season to clinch the League Championship for the
              second time.
            </p>
            <p>
              <b>
                <strong>1969&nbsp;</strong>
              </b>
              Manchester City beat Leicester City 1-0 at Wembley to win the FA Cup.
            </p>
            <h2>
              <b>1950s</b>
            </h2>
            <p>
              <strong>1955&nbsp;</strong>City lose to Newcastle in the 1955 FA Cup Final at Wembley
            </p>
            <p>
              <strong>1956</strong>&nbsp;The Blues play their second successive FA Cup Final, this time beating
              Birmingham 3-1 to lift the trophy – their homecoming parade is the first outside transmission by Granada
              Television.
            </p>
            <p>
              <strong>1958&nbsp;</strong>The Munich Air Disaster devastates Manchester United’s first team squad and
              also kills several journalists including former City goalkeeper Frank Swift.
            </p>
            <h2>
              <b>1945-50</b>
            </h2>
            <p>
              <strong>1947&nbsp;</strong>City are promoted as Champions of Division Two.
            </p>
            <p>
              <strong>1949&nbsp;</strong>The MCFC Official Supporters Club is formed.
            </p>
            <h2>
              <b>1939 to 1945 World War 2</b>
            </h2>
            <p>
              A Wartime League is set up with City playing in the Northern division. Substantial damage to Old Trafford
              means United are forced to play their home games at Maine Road. However City would never allow United
              usage of the home team changing room when the two teams met!
            </p>
            <h2>
              <b>1930s</b>
            </h2>
            <p>
              <strong>1934&nbsp;</strong>After losing the final last year, City beat Portsmouth 2-1 to lift the FA Cup.
            </p>
            <p>
              <strong>1934&nbsp;</strong>A record provincial crowd of 84,569 is recorded at Maine Road when the Blues
              entertain Stoke City.
            </p>
            <p>
              <strong>1937</strong>&nbsp;Manchester City win the League Championship for the first time.
            </p>
            <h2>
              <b>1920s</b>
            </h2>
            <p>
              <strong>1920&nbsp;</strong>City’s Hyde Road ground becomes the first provincial football stadium to be
              visited by a reigning monarch.
            </p>
            <p>
              <strong>1923&nbsp;</strong>After Hyde Road is destroyed by fire, the club moves to the 85,000 capacity
              Maine Road.
            </p>
            <p>
              <strong>1926&nbsp;</strong>A topsy-turvy year for the Blues – manager-less City become first Manchester
              side to play at Wembley (FA Cup runners-up), record the highest Manchester derby victory (6-1 at Old
              Trafford) and suffer relegation in the same season.
            </p>
            <p>
              <strong>1928</strong>&nbsp;City promoted as Champions&nbsp; of Division Two – and are the Football
              League’s best-supported club.
            </p>
            <h2>
              <b>1914 to 1918 World War 1</b>
            </h2>
            <p>
              League football is suspended from 1915-1919, though regional Subsidiary tournaments are still in place
              with City taking part in the Lancashire division.
            </p>
            <h2>
              <b>1875 - 1910</b>
            </h2>
            <p>
              <strong>1880</strong>&nbsp;St Mark’s Church forms a football team which would later evolve into MCFC.
            </p>
            <p>
              <strong>1884</strong>&nbsp;The first known ‘City shirt’ is created – in black, with a Maltese-style
              cross.&nbsp; Some say this is because of the club’s strong links with Freemasonry in the 1880s, others
              believe the white cross proves the link with St Mark’s was still strong.
            </p>
            <p>
              <strong>1887&nbsp;</strong>St Mark’s team evolves into Ardwick AFC and moves to Hyde Road.
            </p>
            <p>
              <strong>1889</strong>&nbsp;An explosion at the nearby Hyde Road coal mine results in the death of 23
              miners – Ardwick and Newton Heath play a friendly match under floodlights in aid of the disaster fund.
            </p>
            <p>
              <strong>1892&nbsp;</strong>The second division of the English Football League is created, with Ardwick AFC
              as founder members.
            </p>
            <p>
              <strong>1894&nbsp;</strong>Ardwick AFC reforms as Manchester City Football Club, in a bid to represent the
              whole city.
            </p>
            <p>
              <strong>1889</strong>&nbsp;City finish champions of Division Two, becoming the first team to gain
              automatic promotion.
            </p>
            <p>
              <strong>1904&nbsp;</strong>The Blues beat Bolton Wanderers in the FA Cup final at Crystal Palace, becoming
              the first Manchester side to win a major trophy<b>.</b>
            </p>
          </div>
        </div>
      </main>
      <FooterUser />
    </div>
  );
}

export default History;
