import React, { useEffect, useState } from 'react';
import { Upload, Popconfirm, Card, Row, Col, Image, List } from 'antd';
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import './Images.less';
import { Storage } from 'aws-amplify';

const { Dragger } = Upload;

const Images = () => {
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);

  const deleteImage = (deleteImage) => {
    console.log(deleteImage);
    Storage.remove(deleteImage.name);
    setImages((prevImages) => prevImages.filter(function(image) {
      return image !== deleteImage;
    }));
  };

  const forceUpdate = () => {
    if (flag || !flag) {
      setFlag((flag) => !flag);
    }
  };

  const addImage = (newImage) => {
    setImages(images.concat(newImage));
    console.log('image added');
  };

  const uploadImage = (options) => {
    const { onSuccess, file, onError } = options;
    try {
      Storage.put(file.name, file, {
        contentType: 'image/*',
      });
      const addfile = {
        name: file.name,
        url: URL.createObjectURL(file),
      };
      addImage(addfile);
      onSuccess('ok');
    } catch (err) {
      onError({ err });
    }
  };

  const onPageRendered = () => {
    getImagesFromS3();
  };

  const getImagesFromS3 = () => {
    const filestore = [];
    Storage.list('').then(function(response) {
      for (let x = 0; x < response.length; x++) {
        Storage.get(response[x].key, { download: true }).then(function(result) {
          const addfile = {
            name: response[x].key,
            url: URL.createObjectURL(result.Body),
          };
          filestore.push(addfile);
        });
      }
      console.log('filestore:', filestore);
      setImages(filestore);
    });
  };

  useEffect(() => {
    onPageRendered();
  }, []);

  return (
    <div className="admin-images-page">
      <Row>
        <Col xs={{ offset: 3, span: 18 }}>
          <div>
            <Dragger accept="image/*"
              customRequest={uploadImage}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Dragger>
            <button onClick={forceUpdate}>Show Images</button>
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
                      onConfirm={() => deleteImage(item)}>
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
