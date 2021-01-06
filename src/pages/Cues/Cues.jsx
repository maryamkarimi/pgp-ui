import React, { useState } from 'react';
import { Row, Col } from 'antd';
import SearchableTable from '../../components/SearchableTable';
import './Cues.css';
import CuesInsertForm from './CuesInsertForm';

const Cues = () => {
  // to be replaced with API call
  const [cues, setCues] = useState([
    { id: 1, name: 'Cue 1' },
    { id: 1, name: 'Cue 2' },
    { id: 1, name: 'Cue 3' },
    { id: 1, name: 'Cue 4' },
    { id: 1, name: 'Cue 5' },
    { id: 1, name: 'Cue 6' },
    { id: 1, name: 'Cue 7' },
    { id: 1, name: 'Cue 8' },
    { id: 1, name: 'Cue 9' },
    { id: 1, name: 'Cue 10' },
    { id: 1, name: 'Cue 11' },
    { id: 1, name: 'Cue 12' },
    { id: 1, name: 'Cue 13' },
    { id: 1, name: 'Cue 20' },
    { id: 1, name: 'Cue 21' },
    { id: 1, name: 'Cue 22' },
    { id: 1, name: 'Cue 23' },
    { id: 1, name: 'Cue 30' },
    { id: 1, name: 'Cue 31' },
    { id: 1, name: 'Cue 32' },
    { id: 1, name: 'Cue 33' },
    { id: 1, name: 'Cue 40' },
    { id: 1, name: 'Cue 41' },
    { id: 1, name: 'Cue 42' },
    { id: 1, name: 'Cue 43' },
    { id: 1, name: 'Cue 50' },
    { id: 1, name: 'Cue 51' },
    { id: 1, name: 'Cue 52' },
    { id: 1, name: 'Cue 53' },
    { id: 1, name: 'Cue 60' },
    { id: 1, name: 'Cue 61' },
    { id: 1, name: 'Cue 62' },
    { id: 1, name: 'Cue 63' },
    { id: 1, name: 'Cue 70' },
    { id: 1, name: 'Cue 71' },
    { id: 1, name: 'Cue 72' },
    { id: 1, name: 'Cue 73' },
    { id: 1, name: 'Cue 80' },
    { id: 1, name: 'Cue 81' },
    { id: 1, name: 'Cue 82' },
    { id: 1, name: 'Cue 83' },
    { id: 1, name: 'Cue 90' },
    { id: 1, name: 'Cue 91' },
    { id: 1, name: 'Cue 92' },
    { id: 1, name: 'Cue 93' },
  ]);

  const deleteCue = (record) => {
    // make an API call to delete, if successful do next line
    setCues((currentCues) => currentCues.filter((currRecord) => currRecord !== record));
  };

  const addCues = (newCues) => {
    // make an API call to add all the above cues, once added, update the state too
    newCues.forEach((newCue) => {
      setCues((currCues) => [{ id: 1, name: newCue }, ...currCues]);
    });
  };

  return (
    <Row className="cue-page">
      <Col xs={{ offset: 3, span: 18 }}>
        <CuesInsertForm addCues={addCues}/>
        <SearchableTable
          title='Cue Name'
          dataSource={cues}
          searchIndex='name'
          handleDelete={deleteCue}
        />
      </Col>
    </Row>
  );
};

export default Cues;
