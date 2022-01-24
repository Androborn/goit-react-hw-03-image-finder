import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, showModal, smallImageUrl }) => (
  <GalleryItem key={id} onClick={() => showModal()}>
    <GalleryItemImg src={smallImageUrl} alt="Found image" />
  </GalleryItem>
);
