import React, { useEffect, useState } from 'react';
import { Table, Input, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './SearchableTable.less';

const SearchableTable = ({
  title,
  dataSource,
  searchIndex,
  textColour,
  columnProps,
  ...rest }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(filterData(dataSource, searchText));
  }, [dataSource]);

  const getColumnSearchProps = () => ({
    render: (record) =>
      <Highlighter
        highlightStyle={{ color: textColour, backgroundColor: '#7829ca', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={record[searchIndex] ? record[searchIndex].toString() : ''}
      />,
    ...columnProps,
  });

  const filterData = (data, text) => {
    if (text==='') return data;
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
      <Row className="title-row">
        <Col xs={19} lg={20} className="table-row">
          {title}
          <Input
            className="search-box"
            placeholder="Search..."
            onChange={handleSearch}
            prefix={<SearchOutlined/>}
            allowClear
          />
        </Col>
        <Col xs={{ offset: 1, span: 4 }} lg={{ span: 3 }} className="switch-title">
              Active
        </Col>
      </Row>;

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
