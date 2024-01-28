import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], hideOnclick = false, onChange = defaultFn }) {
   const [history, setHistory] = useState([{ data: items }]);

   const current = history[history.length - 1];

   const renderItems = () => {
      return current.data.map((item, index) => {
         const isParent = !!item.children;
         return (
            <MenuItem
               key={index}
               data={item}
               onClick={() => {
                  if (isParent) {
                     setHistory((pre) => [...pre, item.children]);
                  } else {
                     onChange(item);
                  }
               }}
            />
         );
      });
   };

   const handleResetMenu = () => {
      setHistory((pre) => pre.slice(0, 1));
   };

   return (
      <Tippy
         interactive
         delay={[0, 700]}
         offset={[12, 8]}
         placement="bottom-end"
         hideOnClick={hideOnclick}
         render={(attrs) => (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
               <PopperWrapper className={cx('menu-popper')}>
                  {history.length > 1 && (
                     <Header
                        title={current.title}
                        onBack={() => {
                           setHistory((pre) => pre.slice(0, history.length - 1));
                        }}
                     />
                  )}
                  <div className={cx('menu-scrollable')}>{renderItems()}</div>
               </PopperWrapper>
            </div>
         )}
         onHide={handleResetMenu}
      >
         {children}
      </Tippy>
   );
}

Menu.propTypes = {
   children: PropTypes.node.isRequired,
   items: PropTypes.array,
   hideOnclick: PropTypes.bool,
   onChange: PropTypes.func,
};

export default Menu;
