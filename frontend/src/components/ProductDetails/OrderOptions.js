import React from "react";
import {Col, Button, InputNumber, Row, Card, Typography} from "antd";
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
        if (this.state.qty  && this.state.qty > 0) {
            this.props.onCreateFairbundle({productId: this.props.productId, qty: this.state.qty});
        }
    };

    onJoinFairbundle = (fairbundleId) => {
        if (this.state.qty  && this.state.qty > 0) {
            this.props.onJoinFairbundle({fairbundleId: fairbundleId, qty: this.state.qty});
        }
    };

    onCreateOrder = (evt) => {
        if (this.state.qty && this.state.qty > 0) {
            this.props.onCreateOrder({qty: this.state.qty});
        }
    };

    onInputNumberChanged = number => {
        console.log('Old: ', this.state.qty, ' - New: ', number);

        if (this.state.qty === number) {
            return;
        }

        this.setState({qty: number})
    }

    render() {

        return (
            <Col>
                <Card className="order-options--card" style={{paddingLeft:8, marginBottom:"10px"}}>
                    <Text style={{color:"#78A262", fontSize:24, fontWeight:"bold"}}>
                        {this.props.product?.priceLevel[0].unitPrice}€ / {this.props.product?.priceLevel[0].unit}
                    </Text>
                    <br /><br />
                    <Text style={{color:"#000000"}}>
                        Lieferbar <CheckCircleOutlined /> - {this.props.product?.deliveryDays} Werktage
                    </Text>
                    <br /><br />
                    <Text style={{color:"#000000", marginRight:"10px"}}>Menge:</Text><InputNumber min={0} max={99999} defaultValue={0} onChange={this.onInputNumberChanged}/>
                </Card>
                <Card className="order-options--card" style={{padding:8, marginBottom:"20px"}}>
                    <Button type="primary" style={{width:"100%", height:"40px"}} onClick={this.onCreateFairbundle}>
                        <Text style={{color:"#ffffff", fontSize:20, fontWeight:"bold"}}>
                            Neues Fairbundle
                        </Text>
                    </Button>
                </Card>


                {this.props.fairbundles?.map((fb) => <Row key={fb._id}>
                    {fb._id}
                    <button onClick={() => this.onJoinFairbundle(fb._id)}>Join Fairbundle</button>
                </Row>)}
                <Row>
                    <button onClick={this.onCreateOrder}>Create Order</button>
                </Row>
                <Card className="order-options--card" style={{padding:8, marginBottom:"20px"}}>
                    <Button type="primary" style={{width:"100%", height:"40px"}} onClick={this.onCreateOrder}>
                        <Text style={{color:"#ffffff", fontSize:20, fontWeight:"bold"}}>
                            Neue Bestellung
                        </Text>
                    </Button>
                </Card>
            </Col>
        )
    }
}
