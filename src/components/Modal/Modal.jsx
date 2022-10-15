import { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalImage } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
    this.switchBodyScroll('hidden', '17px');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
    this.switchBodyScroll('scroll', '0');
  }

  switchBodyScroll(state, margin) {
    Object.assign(document.body.style, {
      overflowY: state,
      marginRight: margin,
    });

    // works either:
    // document.body.style.overflowY = state;
    // document.body.style.marginRight = margin;

    // doesn't work:
    // document.body.style = {
    //   ...document.body.style,
    //   overflowY: state,
    //   marginRight: margin,
    // };
  }

  closeModal = ({ target, currentTarget, code }) => {
    const overlayKlicked = target === currentTarget;
    const escKeyPressed = code === 'Escape';

    if (overlayKlicked || escKeyPressed) {
      this.props.closeModal();
    }
  };

  render() {
    const {
      props: { image },
      closeModal,
    } = this;

    return (
      <Overlay onClick={closeModal}>
        <ModalImage src={image} alt="Enlarged search result" />
      </Overlay>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
