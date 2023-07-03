import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  handleImgClick = () => {
    const { largeImageURL, id } = this.props.data;
    const { openModal } = this.props;
    openModal(largeImageURL, id);
  };

  render() {
    const { webformatURL, id } = this.props.data;

    return (
      <li className={css.galleryItem} onClick={this.handleImgClick}>
        <img src={webformatURL} alt={id} className={css.image} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
