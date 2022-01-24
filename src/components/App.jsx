import { Component } from 'react';

import { Searchbar, SearchForm, ImageGallery, Loader, Button, Modal } from './';
import { pixabayApiService } from '../utils';
import { Wrapper } from './App.styled';

export default class App extends Component {
  state = {
    fetchedData: [],
    fetchQuery: '',
    page: 1,
    showModal: false,
    modalImg: '',
    loading: false,
  };

  recordFetchQuery = searchQuery => {
    this.setState({
      fetchQuery: searchQuery,
    });
  };

  fetchData = async () => {
    const newlyFetchedData = await pixabayApiService(
      this.state.fetchQuery,
      this.state.page,
    );

    this.setState({
      fetchedData: [...this.state.fetchedData, ...newlyFetchedData],
    });
  };

  loadMoreImages = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  toggleModal = largeImg => {
    this.setState({
      showModal: !this.state.showModal,
      modalImg: largeImg,
    });

    if (this.state.showModal) {
    }
    if (this.state.showModal) {
    }
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading) {
      this.setState({
        loading: false,
      });
    }
    if (prevState.fetchQuery !== this.state.fetchQuery) {
      this.setState({
        fetchedData: [],
      });
      this.fetchData();
    }
    if (prevState.page !== this.state.page) {
      this.fetchData();
    }
    window.scrollTo({ top: 10000, behavior: 'smooth' });
    return;
  }

  render() {
    return (
      <>
        <Wrapper>
          <Searchbar>
            <SearchForm submitSearch={this.recordFetchQuery}></SearchForm>
          </Searchbar>
          {this.state.loading ? (
            <Loader />
          ) : (
            <ImageGallery
              fetchedImages={this.state.fetchedData}
              showModal={this.toggleModal}
            ></ImageGallery>
          )}
          {this.state.showModal && (
            <Modal
              hideModal={this.toggleModal}
              modalImg={this.state.modalImg}
            ></Modal>
          )}
        </Wrapper>
        <Button showMoreImages={this.loadMoreImages}></Button>
      </>
    );
  }
}

// style={{ overflow: this.state.showModal ? 'hidden' : 'auto' }}
// use later to prevent scroll under modal
