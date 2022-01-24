import { Component } from 'react';

import { Searchbar, SearchForm, ImageGallery, Loader, Button, Modal } from './';
import { pixabayApiService } from '../utils';
import { Wrapper } from './App.styled';

export default class App extends Component {
  state = {
    fetchedImages: [],
    fetchQuery: '',
    page: 1,
    showModal: false,
    modalImg: '',
    loading: false,
  };

  // componentDidMount() {
  //   if (this.state.fetchedImages.length <= 0) {
  //     return;
  //   }
  //   this.setState({
  //     loading: true,
  //   });
  //   this.fetchImages();
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.fetchQuery !== this.state.fetchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
    if (prevState.fetchedImages.length > 0) {
      window.scrollBy({ top: 1000, behavior: 'smooth' });
      // calculate positioning after scroll
    }
    return;
  }

  recordFetchQuery = searchQuery => {
    if (searchQuery === this.state.fetchQuery) {
      return;
    }
    this.setState({
      fetchQuery: searchQuery,
      fetchedImages: [],
      page: 1,
      loading: true,
    });
  };

  fetchImages = async () => {
    const { fetchQuery, page, fetchedImages } = this.state;
    const newlyfetchedImages = await pixabayApiService(fetchQuery, page);

    this.setState({
      fetchedImages: [...fetchedImages, ...newlyfetchedImages],
      loading: false,
    });
  };

  loadMoreImages = () => {
    this.setState({
      page: this.state.page + 1,
      loading: true,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalImg = largeImg => {
    this.setState(() => ({
      modalImg: largeImg,
    }));
  };

  render() {
    const { recordFetchQuery, loadMoreImages, toggleModal, setModalImg } = this;
    const { loading, fetchedImages, showModal, modalImg } = this.state;

    return (
      <>
        <Wrapper>
          <Searchbar>
            <SearchForm onSubmit={recordFetchQuery}></SearchForm>
          </Searchbar>
          <ImageGallery
            fetchedImages={fetchedImages}
            onClick={largeImageURL => {
              toggleModal();
              setModalImg(largeImageURL);
            }}
          ></ImageGallery>
          {loading && <Loader />}
          {showModal && (
            <Modal closeModal={toggleModal}>
              <img src={modalImg} alt="Enlarged" />
            </Modal>
          )}
        </Wrapper>
        {fetchedImages.length > 0 && (
          <Button onClick={loadMoreImages}>Load more</Button>
        )}
      </>
    );
  }
}