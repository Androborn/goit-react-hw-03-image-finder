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

  componentDidUpdate(_, prevState) {
    const {
      state: { fetchQuery, page, fetchedImages },
      fetchImages,
      scrollToNewlyLoaded,
    } = this;
    const searchUpdated = prevState.fetchQuery !== fetchQuery;
    const searchPageChanged = prevState.page !== page;
    const fetchResultUpdated = fetchedImages !== prevState.fetchedImages;
    const fetchResultExisted = prevState.fetchedImages.length > 0;

    if (searchUpdated || searchPageChanged) {
      fetchImages();
    }
    if (fetchResultUpdated && fetchResultExisted) {
      scrollToNewlyLoaded();
    }
    return;
  }

  fetchImages = async () => {
    const { fetchQuery, page, fetchedImages } = this.state;

    this.setState({
      loading: true,
    });

    try {
      const newlyfetchedImages = await pixabayApiService(fetchQuery, page);

      this.setState({
        fetchedImages: [...fetchedImages, ...newlyfetchedImages],
      });
    } catch (error) {
      console.log(error);
      alert(
        `An error occured processing your request. Retry, or contact site Admin for "${error.message}" if repeats.`,
      );
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  scrollToNewlyLoaded = () => {
    window.scrollBy({ top: 1000, behavior: 'smooth' });
  };

  recordFetchQuery = searchQuery => {
    const searchQueryChanged = searchQuery !== this.state.fetchQuery;

    if (!searchQueryChanged) {
      return;
    }

    this.setState({
      fetchQuery: searchQuery,
      fetchedImages: [],
      page: 1,
    });
  };

  loadMoreImages = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalImg = largeImg => {
    this.setState({
      modalImg: largeImg,
    });
  };

  openModal = largeImageURL => {
    const { toggleModal, setModalImg } = this;

    toggleModal();
    setModalImg(largeImageURL);
  };

  render() {
    const {
      state: { loading, fetchedImages, showModal, modalImg },
      recordFetchQuery,
      loadMoreImages,
      toggleModal,
      openModal,
    } = this;
    const imagesShown = fetchedImages.length > 0;

    return (
      <>
        <Wrapper>
          <Searchbar>
            <SearchForm onSubmit={recordFetchQuery} />
          </Searchbar>
          <ImageGallery fetchedImages={fetchedImages} onClick={openModal} />
          {loading && <Loader />}
          {showModal && <Modal closeModal={toggleModal} image={modalImg} />}
          {imagesShown && !loading && (
            <Button onClick={loadMoreImages}>Load more</Button>
          )}
        </Wrapper>
      </>
    );
  }
}
