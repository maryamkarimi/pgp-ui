import React, { useContext, useState, useEffect, useRef } from 'react';
import { Input, Form, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './EditableCell.less';

const EditableContext = React.createContext(null);

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({
  editable,
  dataIndex,
  children,
  record,
  handleSave,
  handleDelete,
  title,
  iconColour,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = () => {
    form.validateFields()
        .then((values) => {
          if (record[dataIndex] !== values[dataIndex]) {
            handleSave(record, values);
          }
          toggleEdit();
        }).catch((errorInfo) => {
          console.log('save failed', errorInfo);
        });
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
        </Form.Item>
    ):(
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {children}
        </div>
    );
  }

  return (
    <td {...restProps}>
      <div className="table-row">
        {childNode}
        <Popconfirm
          title="Are you sure to delete this item?" onConfirm={() => handleDelete(record)}>
          <Button type="link" icon={<DeleteOutlined style={{ color: iconColour }}/>} />
        </Popconfirm>
      </div>
    </td>
  );
};
