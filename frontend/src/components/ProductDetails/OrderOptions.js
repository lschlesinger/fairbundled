import React from "react";
import {Col, Form, InputNumber, Row, Card, Typography} from "antd";
import {
    CheckCircleOutlined
  } from '@ant-design/icons';

const { Text } = Typography;

export default class OrderOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            qty: 0,
        };
    }

    onCreateFairbundle = (evt) => {
        if (this.state.qty) {
            this.props.onCreateFairbundle({productId: this.props.productId, qty: this.state.qty});
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
                <Card className="order-options--card" style={{paddingLeft:8}}>
                    <Text style={{color:"#78A262", fontSize:24, fontWeight:"bold"}}>
                        {this.props.product?.priceLevel[0].unitPrice}€ / {this.props.product?.priceLevel[0].unit}
                    </Text>
                    <br /><br />
                    <Text style={{color:"#000000"}}>
                        Lieferbar <CheckCircleOutlined /> - {this.props.product?.deliveryDays} Werktage
                    </Text>
                    <br /><br />
                </Card>
                <Row>
                    <Form.Item name="quantitiy"
                               label="Menge"
                               labelAlign="right"
                               rules={[{type: 'number', min: 0, max: 99999}]}>
                        <InputNumber/>
                    </Form.Item>
                </Row>
                <Row>
                    <button onClick={this.onCreateFairbundle()}>Create Fairbundle</button>
                </Row>
                {this.props.fairbundles?.map((fb) => <Row key={fb._id}>
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
