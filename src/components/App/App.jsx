import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import getPictures from 'API/getPictures';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

export default class App extends Component {
  state = {
    searchQuery: '',
    picturesData: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 1,
    modalImg: {},
    isModalOpen: false,
  };

  handleSubmit = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  openModal = (url, id) => {
    this.setState({ isModalOpen: true, modalImg: { url, id } });
  };

  onModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;

    searchQuery !== prevState.searchQuery &&
      this.setState({ picturesData: [] });

    if (
      searchQuery !== prevState.searchQuery ||
      currentPage !== prevState.currentPage
    ) {
      this.setState({ isLoading: true });
      getPictures(searchQuery, currentPage)
        .then(response => {
          if (response.data.hits.length === 0) {
            alert('Sorry, but no pictures were found');
          } else {
            this.setState(prevState => ({
              picturesData: [...prevState.picturesData, ...response.data.hits],
              totalPages: Math.ceil(response.data.totalHits / 12),
            }));
          }
        })
        .catch(error => {
          alert(error.massage);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const {
      picturesData,
      isLoading,
      currentPage,
      totalPages,
      modalImg,
      isModalOpen,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        <ImageGallery
          data={picturesData}
          openModal={this.openModal}
        ></ImageGallery>
        {isLoading && <Loader />}
        {picturesData.length !== 0 && currentPage !== totalPages && (
          <Button onClick={this.loadMore} />
        )}
        {isModalOpen && (
          <Modal onModalClose={this.onModalClose} modalImg={modalImg}></Modal>
        )}
      </>
    );
  }
}
