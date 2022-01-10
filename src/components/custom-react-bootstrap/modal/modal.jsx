import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import { AppTitles } from '~/constants';

const CustomModal = (props) => {
  const {
    id,
    children,
    centered = true,
    hasButtons = false,
    show = false,
    size = 'md',
    title = AppTitles.NO_TITLE_EXIST,
    titleBtnAccept = AppTitles.ACCEPT,
    titleBtnCancel = AppTitles.CANCEL,
    handleAccept = () => false,
    handleCancel = () => false,
    handleClose = () => false,
  } = props;

  const childProps = { ...props };
  delete childProps.id;
  delete childProps.hasButtons;
  delete childProps.title;
  delete childProps.titleBtnAccept;
  delete childProps.titleBtnCancel;
  delete childProps.handleAccept;
  delete childProps.handleCancel;
  delete childProps.handleClose;

  return (
    <Modal
      {...childProps}
      animation={false}
      aria-labelledby={`form-${id}-modal`}
      centered={centered}
      show={show}
      size={size}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id={`form-${id}-modal`}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </Modal.Body>
      {hasButtons && (
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            {titleBtnCancel}
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            {titleBtnAccept}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

CustomModal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  centered: PropTypes.bool,
  hasButtons: PropTypes.bool,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  titleBtnAccept: PropTypes.string,
  titleBtnCancel: PropTypes.string,
  handleAccept: PropTypes.func,
  handleCancel: PropTypes.func,
  handleClose: PropTypes.func,
};

export default CustomModal;
