import React from 'react';
import {Form, Modal, Row, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const ALLOWED_IMAGE_NUMBER = 4;

export default class ProductImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: []
        };
    }

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = (res) => {
        this.setState({fileList: res.fileList});
    };

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    render() {
        const {previewVisible, previewImage, fileList, previewTitle} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div className="ant-upload-text">Hochladen</div>
            </div>
        );
        return (
            <div>
                <h3 className="margin-vertical--md">Fügen Sie bis zu vier Produktbilder hinzu</h3>
                <Row justify="space-around">
                    <Form.Item name="images"
                               value={this.state.fileList}
                    >
                        <Upload
                            // TODO: think about coming up with customRequest here...
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            multiple
                        >
                            {fileList.length >= ALLOWED_IMAGE_NUMBER ? null : uploadButton}
                        </Upload>
                    </Form.Item>
                </Row>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}
