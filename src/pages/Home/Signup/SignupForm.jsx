import React from 'react';
import './Signup.css';
import { Row, Col, Select, Form, Input, InputNumber } from 'antd';
import {
  ELABORATE_TEXT,
  GENDER,
  GENDER_OTHER, MAX_OTHER_CHAR_LENGTH, POLITICAL_STAND, RELIGION, RELIGION_OTHER,
  SEXUAL_ORIENTATION,
  SEXUAL_ORIENTATION_OTHER,
} from '../../../assets/constants/SignUpFieldOptions';
import './SignupForm.css';
import { COUNTRIES } from '../../../assets/constants/Countries';
import { MAX_NATIONALITY } from '../../../assets/constants/Constants';

const { Option } = Select;

const SignupForm = ({ xsSpan, xlSpan }) => {
  return (
    <>
      <Row className="space-between-row">
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item name='age' label='Age' rules={[{ required: true }]}>
            <InputNumber min={1} max={120}/>
          </Form.Item>
        </Col>
      </Row>

      <Row className='space-between-row'>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item name='password' label='Password' rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        </Col>

        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item
            name='confirmPassword'
            label='Confirm Password'
            dependencies={['password']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                      new Error('The two passwords that you entered do not match!'),
                  );
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>

      <Row className='space-between-row'>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item
            name='nationality'
            label='Nationality(ies)'
            rules={[{
              type: 'array',
              max: MAX_NATIONALITY,
              message: `Too many nationalities selected. Please limit to ${MAX_NATIONALITY}`,
            }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Select one or more nationalities..."
            >
              {
                COUNTRIES.map((country) =>
                  <Option key={country.code} value={country.name}>
                    {country.name}
                  </Option>)
              }
            </Select>
          </Form.Item>
        </Col>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item label='Politically, you describe yourself as...' name='politicalAffiliation'>
            <Select placeholder="Select political affiliation..." allowClear>
              {
                POLITICAL_STAND.map((politicalAffiliation) =>
                  <Option
                    key={politicalAffiliation}
                    value={politicalAffiliation}>
                    {politicalAffiliation}
                  </Option>)
              }
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row className='space-between-row'>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item name='gender' label='Gender'>
            <Select placeholder="Select gender..." allowClear>
              { GENDER.map((gender) => <Option key={gender} value={gender}>{gender}</Option>) }
            </Select>
          </Form.Item>
        </Col>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) => {
              return getFieldValue('gender') === GENDER_OTHER ? (
                  <Form.Item label="Other Gender" name="customizeGender">
                    <Input
                      className="elaborate-input"
                      placeholder={ELABORATE_TEXT}
                      maxLength={MAX_OTHER_CHAR_LENGTH}
                    />
                  </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </Col>
      </Row>

      <Row className='space-between-row'>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item label='Sexual Orientation' name='sexualOrientation'>
            <Select placeholder="Select sexual orientation..." allowClear>
              {
                SEXUAL_ORIENTATION.map((sexualOrientation) =>
                  <Option
                    key={sexualOrientation}
                    value={sexualOrientation}>
                    {sexualOrientation}
                  </Option>)
              }
            </Select>
          </Form.Item>
        </Col>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.sexualOrientation !== currentValues.sexualOrientation
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue('sexualOrientation') === SEXUAL_ORIENTATION_OTHER ? (
                  <Form.Item label="Other Sexual Orientation" name="customizeSexualOrientation">
                    <Input
                      className="elaborate-input"
                      placeholder={ELABORATE_TEXT}
                      maxLength={MAX_OTHER_CHAR_LENGTH}
                    />
                  </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </Col>
      </Row>

      <Row className='space-between-row'>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item label='Religion or Spiritual Tradition' name='religion'>
            <Select
              placeholder="Select religion or spiritual tradition..."
              allowClear
              virtual={false}>
              {
                RELIGION.map((religion) =>
                  <Option
                    key={religion}
                    value={religion}>
                    {religion}
                  </Option>)
              }
            </Select>
          </Form.Item>
        </Col>
        <Col xs={xsSpan} xl={xlSpan}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.religion !== currentValues.religion
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue('religion') === RELIGION_OTHER ? (
                  <Form.Item label="Other Religion or Spiritual Tradition" name="customizeReligion">
                    <Input
                      className="elaborate-input"
                      placeholder={ELABORATE_TEXT}
                      maxLength={MAX_OTHER_CHAR_LENGTH}
                    />
                  </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};


export default SignupForm;
