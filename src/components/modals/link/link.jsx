import PropTypes from 'prop-types';
import { AppRoutes, AppTitles, ModalIds } from '~/constants';

const ModalsLink = ({
  linkClass = '',
  isLowerCase = false,
  propsConst,
}) => {
  const onClick = (evt) => {
    evt.preventDefault();
  };

  const title = isLowerCase ?
    AppTitles[propsConst].toLowerCase() : AppTitles[propsConst];

  return (
    <a
      className={linkClass}
      href={AppRoutes[propsConst]}
      data-modal={ModalIds[propsConst]}
      onClick={onClick}
    >
      {title}
    </a>
  );
};

ModalsLink.propTypes = {
  linkClass: PropTypes.string,
  isLowerCase: PropTypes.bool,
  propsConst: PropTypes.string.isRequired,
};

export default ModalsLink;
