import React from 'react';
import axios from 'axios';
import QnAList from './QnAList.jsx';

const { useState, useEffect } = React;

function QnA({ id }) {
  const [quests, setQuests] = useState([]);

  const grabQuestions = () => {
    const config = { params: { product_id: id, page: 1, count: 99999 } };
    axios('/qa/questions', config)
      .then((response) => {
        setQuests(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    grabQuestions();
  }, []);

  return (

    <div>
      <QnAList quests={quests} />
    </div>

  );
}

export default QnA;