import { Component } from 'react';
// import { nanoid } from 'nanoid';

import {
  Searchbar,
  SearchForm,
  ImageGallery,
  // Loader,
  Button,
  // Modal,
} from './';
import { pixabayApiService } from '../utils';

import { Wrapper } from './App.styled';

export default class App extends Component {
  state = {
    fetchedData: [],
    fetchQuery: '',
    page: 1,
  };

  recordFetchQuery = searchQuery => {
    console.log('recordFetchQuery', searchQuery);

    this.setState({
      fetchQuery: searchQuery,
    });
  };

  fetchData = async () => {
    const newlyFetchedData = await pixabayApiService(
      this.fetchQuery,
      this.page,
    );

    this.setState({
      fetchedData: [...this.state.fetchedData, ...newlyFetchedData],
    });
  };

  // incrementPage() {
  //   this.page += 1;
  // }
  // resetPage() {
  //   this.page = 1;
  // }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fetchQuery !== this.state.fetchQuery) {
      this.setState({
        fetchedData: [],
      });
      this.fetchData();
    }
    return;
  }

  render() {
    console.log('app', this.state.fetchQuery);

    return (
      <>
        <Wrapper>
          <Searchbar>
            <SearchForm onSubmit={this.recordFetchQuery}></SearchForm>
          </Searchbar>
          <ImageGallery fetchedImages={this.state.fetchedData}></ImageGallery>
          {/* <Loader></Loader> */}

          {/* <Modal></Modal> */}
        </Wrapper>
        <Button></Button>
      </>
    );
  }
}
