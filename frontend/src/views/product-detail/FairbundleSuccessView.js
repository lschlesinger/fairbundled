import React from 'react';
import {Modal} from 'antd';
import JoinedFairbundle from '../../components/ProductDetails/JoinedFairbundle';

export default class FairbundleSuccessView extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: true
        }

    }

    render() {
        return (
            <Modal
                visible={this.props.modalVisible}
                onCancel={this.props.onClose}
                footer={null}
                centered
                width="40%"
            >
                <JoinedFairbundle />
            </Modal>
        );
    }
}