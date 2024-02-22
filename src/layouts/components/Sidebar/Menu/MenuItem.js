// import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import style from './Menu.module.scss';

// const cx = classNames.bind(style);

// function MenuItem({ to, title, icon, subMenuItems }) {
//   return (
//     <NavLink
//       to={to}
//       className={(nav) =>
//         cx('menu-item', {
//           active: nav.isActive,
//         })
//       }
//     >
//       <div className={cx('nav-link')}>
//         <span className={cx('icon')}>{icon}</span>
//         <span className={cx('title')}>{title}</span>
//       </div>

//       {subMenuItems && (
//         <div className={cx('collapse')}>
//           <ul>
//             {subMenuItems.map((item, index) => (
//               <li key={index}>
//                 <NavLink
//                   className={(nav) =>
//                     cx('sub-menu-item', {
//                       active: nav.isActive,
//                     })
//                   }
//                   to={item.to}
//                 >
//                   {item.label}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </NavLink>
//   );
// }

// MenuItem.propTypes = {
//   to: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.node.isRequired,
//   subMenuItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       to: PropTypes.string.isRequired,
//     }),
//   ),
// };

// export default MenuItem;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import { ArrowDown, ArrowRight } from '~/components/Admin/Icons';

const cx = classNames.bind(style);

function MenuItem({ to, title, icon, subMenuItems }) {
  const location = useLocation();
  const [isSubmenuActive, setSubmenuActive] = useState(false);

  useEffect(() => {
    // Check if subMenuItems is defined and has at least one item
    const isAnySubmenuActive = subMenuItems?.some((item) => location.pathname.startsWith(item.to)) ?? false;
    setSubmenuActive(isAnySubmenuActive);
  }, [location.pathname, subMenuItems]);

  return (
    <NavLink
      to={to}
      className={(nav) =>
        cx('menu-item', {
          active: nav.isActive || isSubmenuActive,
        })
      }
    >
      <div className={cx('nav-link')}>
        <span className={cx('icon')}>{icon}</span>
        <span className={cx('title')}>{title}</span>
        <div className={cx('menu-arrow')}>{isSubmenuActive ? <ArrowDown /> : <ArrowRight />}</div>
      </div>

      {subMenuItems && (
        <div className={cx('collapse')}>
          <ul>
            {subMenuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  className={(nav) =>
                    cx('sub-menu-item', {
                      active: nav.isActive,
                    })
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </NavLink>
  );
}

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  subMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }),
  ),
};

export default MenuItem;
