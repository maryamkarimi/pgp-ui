import React, { useEffect, useState } from 'react';
import { Upload, Popconfirm, Card, Row, Col, Image, List } from 'antd';
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import './Images.less';

const { Dragger } = Upload;

const Images = () => {
  const [images, setImages] = useState([]);

  const deleteImage = (imageId) => {
    // make API call to delete image and then the next line
    setImages((currentImages) => currentImages.filter((image) => image.id !== imageId));
  };

  // eslint-disable-next-line no-unused-vars
  const addImages = (newImages) => {
    setImages((currentImages) => [...newImages, ...currentImages]);
  };

  const draggerProps = {
    name: 'file',
    multiple: true,
    customRequest: ({ onSuccess, onError, file }) => {
      // fetch('hdjhk/upload', {
      //   method: 'POST',
      //   success: (resp) => {
      //     onSuccess();
      //   },
      //   failure: (err) => {
      //     onError();
      //   },
      // },
      // );
    },
  };

  useEffect(() => {
    // to be replaced with API call
    setImages([
      { id: 1, url: 'https://maryamkarimi.net/static/media/background.8d0f72e5.jpg' },
      { id: 2, url: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png' },
      { id: 3, url: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png' },
      { id: 4, url: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png' },
      { id: 5, url: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png' },
      { id: 6, url: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png' },
      { id: 7, url: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png' },
      { id: 8, url: 'https://maryamkarimi.net/static/media/background.8d0f72e5.jpg' },
      { id: 9, url: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png' },
      { id: 10, url: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png' },
      { id: 11, url: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png' },
      { id: 12, url: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png' },
      { id: 13, url: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png' },
      { id: 14, url: 'https://maryamkarimi.net/static/media/background.8d0f72e5.jpg' }],
    );
  }, []);

  return (
    <div className="admin-images-page">
      <Row>
        <Col xs={{ offset: 3, span: 18 }}>
          <div>
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Dragger>
          </div>
          <List
            className="images-list"
            grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }}
            pagination={{ size: 'small', pageSize: 12, hideOnSinglePage: true }}
            dataSource={images}
            renderItem={(item) => (
              <List.Item>
                <Card
                  actions={[
                    <Popconfirm
                      key="delete"
                      title="Are you sure you want to delete this image?"
                      onConfirm={() => deleteImage(item.id)}>
                      <DeleteOutlined />
                    </Popconfirm>,
                  ]}
                >
                  <Image src={item.url}/>
                </Card>
              </List.Item>
            )}
          />,
        </Col>
      </Row>
    </div>
  );
};

export default Images;
