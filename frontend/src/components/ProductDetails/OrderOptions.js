import React from "react";
import {Col, Row} from "antd";


export default class OrderOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            qty: 0,
        };
    }

    onCreateFairbundle = (evt) => {
        if (this.state.qty) {
            this.props.onCreateFairbundle({qty: this.state.qty});
        }
    };

    onJoinFairbundle = (fairbundleId) => {
        this.props.onJoinFairbundle({fairbundleId: fairbundleId, qty: this.state.qty});
    };

    onCreateOrder = (evt) => {
        if (this.state.qty) {
            this.props.onCreateOrder({qty: this.state.qty});
        }
    };

    render() {

        return (
            <Col>
                <Row>{this.props.product.name}</Row>
                <Row>
                    <input/>
                    <button onClick={this.onCreateFairbundle}>Create Fairbundle</button>
                </Row>
                {this.props.fairbundles.map((fb) => <Row key={fb._id}>
                    {fb._id}
                    <button onClick={() => this.onJoinFairbundle(fb._id)}>Join Fairbundle</button>
                </Row>)}
                <Row>
                    <button onClick={this.onCreateOrder}>Create Order</button>
                </Row>
            </Col>
        )
    }
}
