import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ fetchedImages }) => (
  <Gallery>
    {fetchedImages.map(({ id, largeImageURL, webformatURL }) => {
      return (
        <ImageGalleryItem
          key={id}
          largeImageUrl={largeImageURL}
          smallImageUrl={webformatURL}
        ></ImageGalleryItem>
      );
    })}
  </Gallery>
);
