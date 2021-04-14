import React, { useEffect, useState } from 'react';
import { Upload, Popconfirm, Card, Row, Col, List, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, InboxOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { addImage, getImages, updateImage } from '../../../services/api/image';
import imageCompression from 'browser-image-compression';
import { Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import './Images.less';

const { Dragger } = Upload;

const Images = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages()
        .then((imageResult) => setImages(imageResult))
        .catch(() => {
          message.error('Failed to load images. Please try again!');
        });
  }, []);

  const updateImageVisibility = (image) => {
    updateImage({ ...image, isActive: !image.isActive })
        .then(() => {
          setImages((currentImages) =>
            currentImages.map((img) =>
            image.key === img.key ?
                { ...image, isActive: !image.isActive } :
                img,
            ));
        });
  };

  const uploadImage = (options) => {
    const { onSuccess, file, onError } = options;

    const compressionOptions = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    imageCompression(file, compressionOptions)
        .then((compressedFile) => {
          Storage
              .put(uuidv4(), compressedFile, {
                contentType: 'image/*',
              })
              .then(({ key }) => {
                addImage(key)
                    .then((image) => {
                      setImages((currentImages) => [...currentImages, image]);
                      onSuccess('Image uploaded successfully');
                    })
                    .catch((err) => {
                      onError({ err });
                    });
              })
              .catch((err) => {
                onError({ err });
              });
        })
        .catch((err) => {
          onError({ err });
        });
  };

  return (
    <div className="admin-images-page">
      <Row>
        <Col xs={{ offset: 2, span: 20 }} md={{ offset: 3, span: 18 }}>
          <div>
            <Dragger multiple customRequest={uploadImage}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined/>
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
                      okText="Yes"
                      title={`Are you sure you want to make this image
                      ${item.isActive ? 'invisible':'visible'}?`}
                      onConfirm={() => updateImageVisibility(item)}>
                      {item.isActive ? <EyeOutlined/>:<EyeInvisibleOutlined/>}
                    </Popconfirm>,
                  ]}
                >
                  <S3Image className="image-container" imgKey={item.key}/>
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
