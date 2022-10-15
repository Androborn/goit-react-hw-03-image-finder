import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ fetchedImages, onClick }) => (
  <Gallery>
    {fetchedImages.map(({ id, largeImageURL, webformatURL }) => {
      const openModal = () => onClick(largeImageURL);

      return (
        <ImageGalleryItem
          key={id}
          thumbImageUrl={webformatURL}
          onClick={openModal}
        />
      );
    })}
  </Gallery>
);

ImageGallery.propTypes = {
  fetchedImages: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};
