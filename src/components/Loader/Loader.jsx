import { Grid } from 'react-loader-spinner';

import { Wrapper } from './Loader.styled';

export const Loader = () => (
  <Wrapper>
    <Grid height="40" width="40" color="grey" ariaLabel="loading" />
  </Wrapper>
);
