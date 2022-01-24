import { Btn } from './Button.styled';

export const Button = ({ showMoreImages }) => {
  return (
    <Btn type="button" onClick={() => showMoreImages()}>
      Load more
    </Btn>
  );
};
