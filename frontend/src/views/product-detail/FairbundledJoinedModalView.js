import React from 'react';
import {Modal} from 'antd';
import JoinFairbundle from '../../components/ProductDetails/JoinFairbundle';

export default class FairbundleJoinedModalView extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: true
        }

    }

    render() {
        if (this.props.fairbundle == null) {
            return (<p/>);
        }

        return (
            <Modal
                visible={this.props.modalVisible}
                onCancel={this.props.onClose}
                footer={null}
                centered
                title={"Fairbundle beitreten"}
                width="50%"

            >
                <JoinFairbundle
                        quantity={this.props.quantity}
                        fairbundle={this.props.fairbundle}
                        joinFairbundle={this.props.joinFairbundle} />
            </Modal>
        );
    }
}
