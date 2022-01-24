import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ hideModal, modalImg }) => (
  <Overlay
    onClick={e => {
      if (e.target === e.currentTarget) {
        hideModal();
      }
    }}
    onKeyPress={e => {
      if (e.key === 'Escape') {
        hideModal();
      }
    }}
  >
    <ModalWindow>
      <img src={modalImg} alt="Enlarged" />
    </ModalWindow>
  </Overlay>
);

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
};
