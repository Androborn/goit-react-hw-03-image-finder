import { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { resetForm } = this;
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    e.preventDefault();
    onSubmit(searchQuery.toLowerCase());
    resetForm();
  };

  resetForm = () =>
    this.setState({
      searchQuery: '',
    });

  render() {
    const {
      state: { searchQuery },
      handleInputChange,
      handleSearchSubmit,
    } = this;

    return (
      <Form onSubmit={handleSearchSubmit}>
        <FormBtn type="submit">
          <FormBtnLabel>Search</FormBtnLabel>
        </FormBtn>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Type to search for images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </Form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
