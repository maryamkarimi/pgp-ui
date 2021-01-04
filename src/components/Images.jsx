import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Images = () => {
  const [images, setImages] = useState([]);

  // const addImage = (image) => {
  //   // call API to upload image, once have the url add it to the list
  //   // setImages(() => [...images, image]);
  // };

  useEffect(() => {
    setImages([{ url: 'https://maryamkarimi.net/static/media/background.8d0f72e5.jpg' }, { url: 'https://maryamkarimi.net/static/media/background.8d0f72e5.jpg' }]);
  }, []);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={images}
        // onPreview={this.handlePreview}
        // onChange={this.handleChange}
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

export default Images;
