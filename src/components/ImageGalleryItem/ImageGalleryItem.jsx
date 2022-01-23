import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, largeImageURL, smallImageUrl }) => (
  <GalleryItem key={id} largeImageUrl={largeImageURL}>
    <GalleryItemImg src={smallImageUrl} alt="Found image" />
  </GalleryItem>
);
