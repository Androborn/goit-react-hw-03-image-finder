import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, showModal, smallImageUrl }) => (
  <GalleryItem key={id} onClick={() => showModal()}>
    <GalleryItemImg src={smallImageUrl} alt="Found image" />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  smallImageUrl: PropTypes.string.isRequired,
};
