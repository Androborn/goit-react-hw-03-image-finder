import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ fetchedImages, showModal }) => (
  <Gallery>
    {fetchedImages.map(({ id, largeImageURL, webformatURL }) => {
      return (
        <ImageGalleryItem
          key={id}
          smallImageUrl={webformatURL}
          showModal={() => showModal(largeImageURL)}
        ></ImageGalleryItem>
      );
    })}
  </Gallery>
);
