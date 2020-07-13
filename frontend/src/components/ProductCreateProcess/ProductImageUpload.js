import React from 'react';
import {Form, Modal, Row, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import UploadService from "../../services/UploadService";

const ALLOWED_IMAGE_NUMBER = 4;

export default class ProductImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: null,
            previewTitle: null,
            fileList: this.props.product.fileList
        };
    }

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await UploadService.getBase64(file.originFileObj);
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
                <Row justify="center">
                    <Form.Item name="images"
                               value={this.state.fileList}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={this.state.fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            customRequest={UploadService.customRequest}
                            multiple
                        >
                            {fileList?.length >= ALLOWED_IMAGE_NUMBER ? null : uploadButton}
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
