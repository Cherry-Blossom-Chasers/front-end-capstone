/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import CharacteristicRow from './CharacteristicRow.jsx';
// in the end, want an array of objects that looks like:
// [ { id: characID, charac: 'Fit', rateMsg: Array(5), value: userInputVal }, {...}, {...} ]
// because POST accepts a single object of all charac as { id: value, id: value }
// but we need to render different rows of radio buttons and each row needs their own state

// prodCharac is an array of all charac associated with product ['Fit', ]
export default function SelectCharacteristics({ prodCharac, characObj, makeCharacObj }) {
  // make a state in here that will be the useEffect that triggers MakeCharacObj: every time we get a new row result, call makeCharacObj with that row
  const [newRow, setNewRow] = useState({});

  useEffect(() => {
    if (JSON.stringify(newRow) !== '{}') {
      makeCharacObj(newRow);
    }
  }, [newRow]);

  const radioRow = prodCharac.map((charac) => {
    const characMetaData = {};
    const ratingMsg = [];
    if (charac === 'Size') {
      ratingMsg.push('A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big');
    } else if (charac === 'Width') {
      ratingMsg.push('Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide');
    } else if (charac === 'Comfort') {
      ratingMsg.push('Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect');
    } else if (charac === 'Quality') {
      ratingMsg.push('Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect');
    } else if (charac === 'Length') {
      ratingMsg.push('Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long');
    } else {
      ratingMsg.push('Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose');
    }
    characMetaData.id = characObj[charac].id;
    characMetaData.charac = charac;
    characMetaData.ratingMsg = ratingMsg;
    characMetaData.value = 0; // for now
    return characMetaData;
  });

  function updateRow(index, value) {
    radioRow[index].value = value;
    const formId = radioRow[index].id;
    const formVal = radioRow[index].value;
    const formResults = { [formId]: formVal };
    setNewRow(formResults);
  }

  // make this whole object a state?
  // console.log('THE ROW OBJECT IS ', radioRow);
  return (
    <div className="characteristic-selection-container">
      {radioRow.map((row, i) => (
        <CharacteristicRow row={row} i={i} updateRow={updateRow} key={row.id} />
      ))}
    </div>
  );
}
