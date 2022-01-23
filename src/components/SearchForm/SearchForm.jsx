import { Component } from 'react';

import { Form, FormBtn, FormBtnLabel, FormInput } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = ({ target: { name, value } }) => {
    return this.setState({
      [name]: value,
    });
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchQuery);

    this.resetForm();
  };

  resetForm = () =>
    this.setState({
      searchQuery: '',
    });

  render() {
    return (
      <Form onSubmit={this.handleSearchSubmit}>
        <FormBtn type="submit">
          <FormBtnLabel>Search</FormBtnLabel>
        </FormBtn>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeHolder="Search images and photos"
          name="searchQuery"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
      </Form>
    );
  }
}
