/* global localStorage */
import React from 'react';
import Carousel from './Carousel.jsx';

function YourOutfitList({id, setId }) {
  if (JSON.parse(localStorage.getItem('outfits')) === null) {
    localStorage.setItem('outfits', JSON.stringify([]));
  }
  const [outfits, setOutfits] = React.useState(JSON.parse(localStorage.getItem('outfits')));

  function addClickHandler() {
    const currentList = JSON.parse(localStorage.getItem('outfits'));
    if (currentList.indexOf(id) > -1) return;
    setOutfits([...outfits, id]);
    localStorage.removeItem('outfits');
    localStorage.setItem('outfits', JSON.stringify([...outfits, id]));
  }

  function crossClickHandler(productId) {
    const outfitList = JSON.parse(localStorage.getItem('outfits'));
    const index = outfitList.indexOf(productId);
    outfitList.splice(index, 1);
    localStorage.removeItem('outfits');
    localStorage.setItem('outfits', JSON.stringify(outfitList));
    setOutfits(outfitList);
  }

  return (
    <div className="cardContainer">
      <div className="card addOutfit-card" data-testid="card">
        <span className="btn addOutfit-btn" onClick={addClickHandler}><strong>+ </strong>Add to Outfits</span>
      </div>
      <Carousel id={id} setId={setId} idList={outfits} crossClickHandler={crossClickHandler} />
    </div>
  );
}

export default YourOutfitList;
