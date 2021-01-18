import React, { useState } from 'react';
import { Row, Col } from 'antd';
import CuesInsertForm from './CuesInsertForm';
import SearchableTable from '../../../components/SearchableTable/SearchableTable';
import './Cues.less';
import { EditableCell, EditableRow } from '../../../components/Editable';
import { CUE_ID_FIELD, CUE_NAME_FIELD } from '../../../assets/constants/Constants';

const Cues = () => {
  // to be replaced with API call
  const [cues, setCues] = useState([
    { id: 1, name: 'Cue 1', active: true },
    { id: 2, name: 'Cue 2', active: false },
    { id: 3, name: 'Cue 3', active: true },
    { id: 4, name: 'Cue 4', active: true },
    { id: 5, name: 'Cue 5', active: false },
    { id: 6, name: 'Cue 6', active: true },
    { id: 7, name: 'Cue 7', active: false },
    { id: 8, name: 'Cue 8', active: true },
    { id: 9, name: 'Cue 9', active: true },
    { id: 10, name: 'Cue 10', active: true },
    { id: 11, name: 'Cue 11', active: true },
    { id: 12, name: 'Cue 12', active: true },
    { id: 13, name: 'Cue 13', active: true },
    { id: 14, name: 'Cue 14', active: true },
    { id: 15, name: 'Cue 15', active: true },
    { id: 16, name: 'Cue 16', active: true },
    { id: 17, name: 'Cue 17', active: true },
    { id: 18, name: 'Cue 18', active: true },
    { id: 19, name: 'Cue 19', active: true },
    { id: 20, name: 'Cue 20', active: true },
    { id: 21, name: 'Cue 21', active: true },
  ]);

  const updateCue = (record, newValue, updatedField) => {
    // make an API call to update
    setCues(
        cues.map((cue) =>
            cue.id === record['id'] ?
                { ...record, [updatedField]: newValue[updatedField] }:
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
      dataIndex: CUE_NAME_FIELD,
      iconColour: '#bfbfbf',
      title: 'Cue Name',
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
          searchIndex={CUE_NAME_FIELD}
          columnProps={getEditSearchProps()}
          textColour='#bfbfbf'
          size='small'
          pagination={{ pageSize: 16 }}
          rowKey={CUE_ID_FIELD}
          components={components}
        />
      </Col>
    </Row>
  );
};

export default Cues;
