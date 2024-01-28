import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

// import * as searchServices from '~/services/searchService';
// import AccountItem from '~/components/AccountsItem';
import { SearchIcon } from '~/components/Icons';
// import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
// import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  //   const debouncedValue = useDebounce(searchValue, 500);

  //   useEffect(() => {
  //     if (!debouncedValue.trim()) {
  //       setSearchResult([]);
  //       return;
  //     }

  //     const fetchApi = async () => {
  //       setLoading(true);
  //       const result = await searchServices.search(debouncedValue); // api đi theo luồng này
  //       setSearchResult(result);
  //       setLoading(false);
  //     };

  //     fetchApi();
  //   }, [debouncedValue]);

  //   const handleClear = () => {
  //     setSearchValue('');
  //     inputRef.current.focus();
  //     setShowResult(false);
  //   };

  //   const handelHideResult = () => {
  //     setShowResult(false);
  //   };

  //   const handelChange = (e) => {
  //     const searchValue = e.target.value;
  //     if (!searchValue.startsWith(' ')) {
  //       setSearchValue(searchValue);
  //     }
  //   };

  return (
    // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
      //   interactive
      //   visible={showResult && searchResult.length > 0}
      //   render={(attrs) => (
      //     <div className={cx('search-results')} tabIndex="-1" {...attrs}>
      //       <PopperWrapper>
      //         <h4 className={cx('search-title')}>Account</h4>
      //         {searchResult.map((result) => (
      //           <AccountItem key={result.id} data={result} />
      //         ))}
      //       </PopperWrapper>
      //     </div>
      //   )}
      //   onClickOutside={handelHideResult}
      >
        <div className={cx('search')}>
          <input
            value={searchValue}
            placeholder="Search accounts and videos"
            spellCheck={false}
            ref={inputRef}
            // onChange={handelChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button
              className={cx('clear')}
              // onClick={handleClear}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
          <button className={cx('search-btn')}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
