import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ thumbImageUrl, onClick }) => (
  <GalleryItem onClick={onClick}>
    <GalleryItemImg src={thumbImageUrl} alt="Small search result" />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  thumbImageUrl: PropTypes.string.isRequired,
};
