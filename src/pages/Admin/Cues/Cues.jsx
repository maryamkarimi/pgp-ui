import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CuesInsertForm from './CuesInsertForm';
import SearchableTable from '../../../components/SearchableTable/SearchableTable';
import { EditableCell, EditableRow } from '../../../components/Editable';
import { CUE_ID_FIELD, CUE_NAME_FIELD } from '../../../assets/constants/Constants';
import './Cues.less';

const Cues = () => {
  const [cues, setCues] = useState([
    { id: 1, cueText: 'Cue 1', isActive: true },
    { id: 2, cueText: 'Cue 2', isActive: false },
    { id: 3, cueText: 'Cue 3', isActive: true },
    { id: 4, cueText: 'Cue 4', isActive: true },
    { id: 5, cueText: 'Cue 5', isActive: false },
    { id: 6, cueText: 'Cue 6', isActive: true },
    { id: 7, cueText: 'Cue 7', isActive: false },
    { id: 8, cueText: 'Cue 8', isActive: true },
    { id: 9, cueText: 'Cue 9', isActive: true },
    { id: 10, cueText: 'Cue 10', isActive: true },
    { id: 11, cueText: 'Cue 11', isActive: true },
    { id: 12, cueText: 'Cue 12', isActive: true },
    { id: 13, cueText: 'Cue 13', isActive: true },
    { id: 14, cueText: 'Cue 14', isActive: true },
    { id: 15, cueText: 'Cue 15', isActive: true },
    { id: 16, cueText: 'Cue 16', isActive: true },
    { id: 17, cueText: 'Cue 17', isActive: true },
    { id: 18, cueText: 'Cue 18', isActive: true },
    { id: 19, cueText: 'Cue 19', isActive: true },
    { id: 20, cueText: 'Cue 20', isActive: true },
    { id: 21, cueText: 'Cue 21', isActive: true },
  ]);

  // to be replaced with API call
  useEffect(() => {
  }, []);

  const updateCue = (record, newValue, updatedField) => {
    // make an API call to update
    setCues(
        cues.map((cue) =>
            cue[CUE_ID_FIELD] === record[CUE_ID_FIELD] ?
                { ...record, [updatedField]: newValue[updatedField] }:
                cue,
        ));
  };

  const addCues = (newCues) => {
    // make an API call to add all the above cues, once added, update the state too
    newCues.forEach((newCue) => {
      setCues((currCues) => [{ id: 100, cueText: newCue }, ...currCues]);
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
      <Col xs={{ offset: 2, span: 20 }} md={{ offset: 3, span: 18 }}>
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
