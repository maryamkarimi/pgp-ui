import React, { useState } from 'react';
import { Row, Col } from 'antd';
import CuesInsertForm from './CuesInsertForm';
import SearchableTable from '../../../components/SearchableTable/SearchableTable';
import './Cues.less';
import { EditableCell, EditableRow } from '../../../components/Editable';

const Cues = () => {
  // to be replaced with API call
  const [cues, setCues] = useState([
    { id: 1, name: 'Cue 1' },
    { id: 2, name: 'Cue 2' },
    { id: 3, name: 'Cue 3' },
    { id: 4, name: 'Cue 4' },
    { id: 5, name: 'Cue 5' },
    { id: 6, name: 'Cue 6' },
    { id: 7, name: 'Cue 7' },
    { id: 8, name: 'Cue 8' },
    { id: 9, name: 'Cue 9' },
    { id: 10, name: 'Cue 10' },
    { id: 11, name: 'Cue 11' },
    { id: 12, name: 'Cue 12' },
    { id: 13, name: 'Cue 13' },
    { id: 14, name: 'Cue 14' },
    { id: 15, name: 'Cue 15' },
    { id: 16, name: 'Cue 16' },
    { id: 17, name: 'Cue 17' },
    { id: 18, name: 'Cue 18' },
    { id: 19, name: 'Cue 19' },
    { id: 20, name: 'Cue 20' },
    { id: 21, name: 'Cue 21' },
  ]);

  const deleteCue = (record) => {
    // make an API call to delete, if successful do next line
    setCues((currentCues) => currentCues.filter((currRecord) => currRecord['id'] !== record['id']));
  };

  const updateCue = (record, newValue) => {
    // make an API call to update
    setCues(
        cues.map((cue) =>
            cue.id === record['id'] ?
                { ...record, name: newValue['name'] }:
                cue,
        ));
  };

  const addCues = (newCues) => {
    // make an API call to add all the above cues, once added, update the state too
    newCues.forEach((newCue) => {
      setCues((currCues) => [{ id: 100, name: newCue }, ...currCues]);
    });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const getEditSearchProps = () => ({
    onCell: (record) => ({
      record,
      editable: true,
      dataIndex: 'name',
      iconColour: '#bfbfbf',
      title: 'Cue Name',
      handleDelete: deleteCue,
      handleSave: updateCue,
    }),
  });

  return (
    <Row className="cue-page">
      <Col xs={{ offset: 3, span: 18 }}>
        <CuesInsertForm addCues={addCues}/>
        <SearchableTable
          title='Cue Name'
          dataSource={cues}
          searchIndex='name'
          columnProps={getEditSearchProps()}
          textColour='#bfbfbf'
          size='small'
          pagination={{ pageSize: 16 }}
          rowKey='id'
          components={components}
        />
      </Col>
    </Row>
  );
};

export default Cues;
