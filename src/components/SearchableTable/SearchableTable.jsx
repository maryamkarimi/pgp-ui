import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import './SearchableTable.less';

const SearchableTable = ({ title, dataSource, searchIndex, handleDelete, textColour, ...rest }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(filterData(dataSource, searchText));
  }, [dataSource]);

  const getColumnSearchProps = () => ({
    render: (record) =>
      <div className="table-row">
        <Highlighter
          highlightStyle={{ color: textColour, backgroundColor: '#7829ca', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={record[searchIndex] ? record[searchIndex].toString() : ''}
        />
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDelete(record)}>
          <Button type="link" icon={<DeleteOutlined style={{ color: textColour }}/>} />
        </Popconfirm>
      </div>
    ,
  });


  const filterData = (data, text) => {
    if (text === '') return data;
    return data.filter(
        (record) => record[searchIndex].toString().toLowerCase().includes(text.toLowerCase()),
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
    <Table
      className="searchable-table"
      columns={columns}
      dataSource={filteredData}
      {...rest}
    />
  );
};

export default SearchableTable;
