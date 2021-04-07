import React, { useContext, useState, useEffect, useRef } from 'react';
import { Input, Form, Switch, Col, Row } from 'antd';
import './Editable.less';
import { CUE_ACTIVE_FIELD, CUE_NAME_FIELD } from '../../../assets/constants/Constants';

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

  const saveName = () => {
    form.validateFields()
        .then((values) => {
          if (record[dataIndex] !== values[dataIndex]) {
            handleSave(record, values, CUE_NAME_FIELD);
          }
          toggleEdit();
        }).catch((errorInfo) => {
          console.log('save failed', errorInfo);
        });
  };

  const saveActive = () => {
    handleSave(record, { [CUE_ACTIVE_FIELD]: !record[CUE_ACTIVE_FIELD] }, CUE_ACTIVE_FIELD);
  };

  const editableCell =
        <Row className="table-row editable-cell">
          <Col xs={19} lg={20}>
            { editing ?
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
                  <Input ref={inputRef} onPressEnter={saveName} onBlur={saveName}/>
                </Form.Item> :
                <span className="editable-cell-value-wrap" onClick={toggleEdit}>
                  {children}
                </span>
            }
          </Col>
          <Col className="switch-section" xs={{ offset: 1, span: 4 }} lg={{ span: 3 }}>
            <Switch
              checked={record == null ? true : record[CUE_ACTIVE_FIELD]} onChange={saveActive}
            />
          </Col>
        </Row>;

  return (
    <td {...restProps}>
      {editable ? editableCell : children }
    </td>
  );
};
