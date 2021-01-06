import React, { useState } from 'react';
import { Button, Table, Input, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import './SearchableTable.css';

const SearchableTable = ({ title, dataSource, searchIndex, handleDelete }) => {
  const [searchText, setSearchText] = useState('');

  const getColumnSearchProps = () => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="filterDropDown">
        <Input
          className="search-input"
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
          >
              Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small">
              Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) =>
      <SearchOutlined style={{ color: filtered ? '#7829ca' : '#bfbfbf' }} />,
    onFilter: (value, record) =>
      record[searchIndex] ?
          record[searchIndex].toString().toLowerCase().includes(value.toLowerCase()) :
          '',
    render: (record) =>
      <div className="table-row">
        <Highlighter
          highlightStyle={{ color: '#bfbfbf', backgroundColor: '#7829ca', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={record[searchIndex] ? record[searchIndex].toString() : ''}
        />
        <Popconfirm
          title="Are you sure to delete this cue?"
          onConfirm={() => handleDelete(record)}>
          <Button type="link" icon={<DeleteOutlined style={{ color: '#bfbfbf' }}/>} />
        </Popconfirm>
      </div>
    ,
  });

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('' );
  };

  const columns = [
    {
      title: title,
      ...getColumnSearchProps(),
    },
  ];

  return (
    <Table columns={columns} dataSource={dataSource} size='small'/>
  );
};

export default SearchableTable;
