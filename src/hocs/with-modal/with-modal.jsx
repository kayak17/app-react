import { useCallback, useState } from 'react';
import ModalsManager from '~/components/modals/manager/manager';
import { ModalIds } from '~/constants';

const withModal = (WrappedComponent) => {
  const WithModalHOC = (props) => {
    const [modalOpen, setModalOpen] = useState(ModalIds.NONE);

    const handleOpenModal = useCallback((evt) => {
      const {
        target: {
          dataset: { modal }
        }
      } = evt;

      if (modal) {
        setModalOpen(modal);
      }
    }, [setModalOpen]);

    const handleCloseModal = useCallback(() => {
      setModalOpen(ModalIds.NONE);
    }, [setModalOpen]);

    return (
      <div
        className="app-modal-container"
        onClick={handleOpenModal}
      >
        <WrappedComponent
          {...props}
        />
        <ModalsManager
          handleClose={handleCloseModal}
          modal={modalOpen}
        />
      </div>
    );
  };

  WithModalHOC.displayName = 'WithModalHOC';

  return WithModalHOC;
};

export default withModal;
