import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import './SearchableTable.css';

const SearchableTable = ({ title, dataSource, searchIndex, handleDelete }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(filterData(dataSource, searchText));
  }, [dataSource]);

  const getColumnSearchProps = () => ({
    render: (record) =>
      <div className="table-row">
        <Highlighter
          highlightStyle={{ color: '#bfbfbf', backgroundColor: '#7829ca', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={record[searchIndex] ? record[searchIndex].toString() : ''}
        />
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDelete(record)}>
          <Button type="link" icon={<DeleteOutlined style={{ color: '#bfbfbf' }}/>} />
        </Popconfirm>
      </div>
    ,
  });


  const filterData = (data, text) => {
    if (text === '') return data;
    return data.filter(
        (record) => record[searchIndex].toString().toLowerCase().includes(text),
    );
  };

  const handleSearch = (e) => {
    const filtered = filterData(dataSource, e.target.value);

    setSearchText(e.target.value);
    setFilteredData(filtered);
  };

  const titleRow =
      <div className="table-row">
        { title }
        <Input
          placeholder="Search..."
          onChange={handleSearch}
          style={{ width: 200 }}
          prefix={<SearchOutlined/>}
          allowClear
        />
      </div>;

  const columns = [
    {
      title: titleRow,
      ...getColumnSearchProps(),
    },
  ];

  return (
    <Table className="searchable-table" columns={columns} dataSource={filteredData} size='small'/>
  );
};

export default SearchableTable;
