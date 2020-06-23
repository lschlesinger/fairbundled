import React from "react";
import {Col, Button, InputNumber, Progress, Card, Typography, Space} from "antd";
import {
    CheckCircleOutlined,
    CalendarOutlined,
    TeamOutlined
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

    createFairbundleCard = (fairbundle, product) => {
        let savings = (1 - (fairbundle.targetPrice / product.priceLevel[0].unitPrice)) * 100;

        let requiredBundlers = product.priceLevel.find(l => l.unitPrice == fairbundle.targetPrice).minQty;
        let completedBundle = fairbundle.bundlers.length / requiredBundlers * 100;

        let currentDate = new Date();
        let diffTime = Date.parse(fairbundle.expiration) - currentDate.getTime();
        let remainingDays = Math.round(diffTime / 3600 / 24 / 1000);

        let bundlersString = "";

        if (fairbundle.bundlers.length > 1) {
            bundlersString = "Kommunen";
        } else {
            bundlersString = "Kommune";
        }

        return(
            <Card className="order-options--card" style={{padding:8, marginBottom:"10px"}}>
                <Space direction="horizontal" style={{width:"100%", marginBottom:4}}>
                    <Text style={{color:"#78A262", fontSize:24, fontWeight:"bold", marginRight:16}}>
                        {fairbundle.targetPrice}€ / {product.priceLevel[0].unit}
                    </Text>
                    <Text delete style={{color:"#a1a1a1", fontSize:14, fontWeight:"bold"}}>
                        {product.priceLevel[0].unitPrice}€
                    </Text>
                </Space>
                <Text style={{color:"#000000", fontStyle:"italic"}}>
                    {savings}% sparen
                </Text>
                <Progress percent={completedBundle} strokeWidth={3} strokeColor="#78A262" showInfo={false} style={{width:"100%", marginTop:16}}/>
                <Space direction="horizontal" style={{width:"100%", marginBottom:24}}>
                    <Text style={{color:"#78A262", fontWeight:"bold"}}>
                        {fairbundle.bundlers.length}
                    </Text>
                    <Text style={{color:"#a1a1a1"}}>
                        von {requiredBundlers} erreicht
                    </Text>
                </Space>
                <Space direction="horizontal" style={{width:"100%", marginBottom:4}}>
                    <CalendarOutlined style={{fontSize:25, paddingTop:4, color:"#a1a1a1"}}/>
                    <Text style={{color:"#000000", fontWeight:"normal"}}>Noch</Text>
                    <Text style={{color:"#000000", fontWeight:"bold"}}>{remainingDays}</Text>
                    <Text style={{color:"#000000", fontWeight:"normal"}}>Tage</Text>
                </Space>
                <Space direction="horizontal" style={{width:"100%"}}>
                    <TeamOutlined style={{fontSize:25, paddingTop:4, color:"#a1a1a1"}}/>
                    <Text style={{color:"#000000", fontWeight:"bold"}}>{fairbundle.bundlers.length}</Text>
                    <Text style={{color:"#000000", fontWeight:"normal"}}>teilnehmende {bundlersString}</Text>
                </Space>
                <Button type="primary" style={{width:"100%", height:"40px", marginTop:24}} onClick={this.onJoinFairbundle}>
                    <Text style={{color:"#ffffff", fontSize:20, fontWeight:"bold"}}>
                        Fairbundle beitreten
                    </Text>
                </Button>
            </Card>
        );
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
                <Card className="order-options--card" style={{padding:8, marginBottom:"10px"}}>
                    <Button type="primary" style={{width:"100%", height:"40px"}} onClick={this.onCreateFairbundle}>
                        <Text style={{color:"#ffffff", fontSize:20, fontWeight:"bold"}}>
                            Neues Fairbundle
                        </Text>
                    </Button>
                </Card>
                {this.props.fairbundles?.map((fb) => this.createFairbundleCard(fb, this.props.product))}
                <Card className="order-options--card" style={{padding:8, marginBottom:"10px"}}>
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
