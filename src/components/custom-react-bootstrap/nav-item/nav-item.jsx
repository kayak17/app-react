import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const CustomNavItem = forwardRef(
  ({
    children,
    className,
    href = '',
    role,
    style,
    onClick,
  }, ref) => (
    <a
      ref={ref}
      href={href}
      role={role}
      style={style}
      className={className}
      onClick={(evt) => {
        evt.preventDefault();
        onClick(evt);
      }}
    >
      {children}
    </a>
  )
);

CustomNavItem.displayName = 'CustomNavItem';

CustomNavItem.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  href: PropTypes.string,
  role: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default CustomNavItem;
