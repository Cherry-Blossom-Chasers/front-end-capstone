import React, { useState } from 'react';
import Carousel from './CarouselV2.jsx';
import Thumbnails from './Thumbnails.jsx';
import SingleImage from './SingleImage.jsx';
import ExpandedView from './ExpandedView.jsx';

// image gallery renders image carousel from styles of selected product
export default function ImageGallery({ selectedStyle, zoomView, setZoomView, activeImage, setActiveImage }) {
  const [modal, setModal] = React.useState(false);
  let stylePhotos = [];
  let styleThumbs = [];
  for (let i = 0; i < selectedStyle.photos.length; i++) {
    stylePhotos.push(selectedStyle.photos[i]);
    styleThumbs.push(selectedStyle.photos[i].thumbnail_url);
  }
  function handlePrevClick() {
    if (activeImage === 0) {
      setActiveImage(stylePhotos.length - 1);
    } else {
      setActiveImage(activeImage - 1);
    }
  }
  function handleNextClick() {
    if (activeImage === stylePhotos.length - 1) {
      setActiveImage(0);
    } else {
      setActiveImage(activeImage + 1);
    }
  }
  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }
  function toggleModal() {
    setModal(!modal);
  }
  return (
    <div className="image-gallery" data-testid="imgGallery">
      <button className="carousel-button prev" id="prev" type="button" onClick={handlePrevClick} aria-abel="view previous image">&#8592;</button>
      <button className="carousel-button next" id="next" type="button" onClick={handleNextClick} aria-abel="view next image">&#8594;</button>
      {stylePhotos.map((photoUrl, index) => (
        <SingleImage
          photoUrl={photoUrl.url}
          activeImage={activeImage}
          index={index}
          toggleModal={toggleModal}
          key={index}
        />
      ))}
      <Carousel nameOfImageClass={'.single-image'} />
      {styleThumbs.length > 3 && (
        <div className="thumbnails scrollbar">
          {styleThumbs.map((thumbNailUrl, index) => (
            <Thumbnails
              thumbNailUrl={thumbNailUrl}
              index={index}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              key={index}
            />
          ))}
        </div>
      )}
      {modal && (
        <ExpandedView
          stylePhotos={stylePhotos}
          activeImage={activeImage}
          toggleModal={toggleModal}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          zoomView={zoomView}
          setZoomView={setZoomView}
        />
      )}
    </div>
  );
}
