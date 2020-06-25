import React from "react";
import {Typography, Space, Button, Radio, DatePicker, Row, Col, Card} from "antd";

const { Title, Text } = Typography;
const style = { background: '#0092ff', padding: '8px 0' };

export default class CreateFairbundle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedOption: 0,
            selectedPriceLevel: 0,
            expirationDate: null,
            canNotSubmit: true
        };
    }

    onCreate = () => {
        this.createDOM.blur();

        let expirationAction = this.state.checkedOption == 0 ? "force" : "cancel";

        this.props.createFairbundle(
            this.state.expirationDate,
            expirationAction, 
            this.props.product.priceLevel[this.state.selectedPriceLevel].unitPrice
        );
    };

    onDateChange = (date, dateString) => {
        this.setState({
            expirationDate: date,
            canNotSubmit: date == null
        });
    }

    onPriceLevelChange = (e) => {
        this.setState({selectedPriceLevel: e.target.value});
    }

    getPriceLevel(priceLevel, index) {
        let color;

        if (index % 2) {
            color = "#c8c8c8";
        } else {
            color = "#ffffff";
        }

        return (
            <Col className="gutter-row" span={8}>
                <Card style={{background:color, borderRadius:"12px", padding:"5px"}}>
                    <Title level={3} style={{width:"100%", textAlign:"center", color:"#686868", fontWeight:"bold"}}>{new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                    }).format(priceLevel.unitPrice)} / {priceLevel.unit}</Title>
                    <Space style={{width:"100%", justifyContent:"center"}}><Text style={{color:"#686868"}}>bei einem Volumen von</Text></Space>
                    <Space style={{width:"100%", justifyContent:"center", marginBottom:10}}><Text style={{color:"#686868", fontWeight:"bold"}}>{priceLevel.minQty} {priceLevel.unit}</Text></Space>
                    <Space style={{width:"100%", justifyContent:"center"}}><Radio value={index}/></Space>
                </Card>
            </Col>
        );
    }

    render() {
        let product = this.props.product;

        return (
            <div>
                <Title level={2} style={{fontWeight:"bold"}}>Neues Fairbundle</Title>
                <br />
                
                <Radio.Group size="large" onChange={this.onPriceLevelChange} value={this.state.selectedPriceLevel} style={{width:"100%", marginBottom:30}}>
                    <Row gutter={[16, 16]}>
                        {product.priceLevel.map((p, i) => this.getPriceLevel(p, i))}
                    </Row>
                </Radio.Group>

                <br/>
                <Text style={{marginRight:"10px", fontSize:18, color:"#454545"}}>Zieldatum:</Text>
                <DatePicker onChange={this.onDateChange} placeholder="Datum wählen" format={'DD.MM.YYYY'} style={{fontSize:18, fontWeight:"bold", color:"#686868", marginBottom:30, width:"25%"}} />

                <Space style={{width:"100%", marginBottom:10}}><Text style={{fontSize:18, color:"#454545"}}>Bei Nichterreichen des Zielpreises soll</Text></Space>
                <Radio.Group onChange={e => {this.setState({checkedOption:e.target.value})}} value={this.state.checkedOption}>
                    <Radio value={0} style={{width:"100%"}}>
                        <Text style={{fontSize:18, color:"#454545"}}>das Fairbundle trotzdem zum nächsthöheren Preis ausgeführt werden</Text>
                    </Radio>
                    <Radio value={1}>
                        <Text style={{fontSize:18, color:"#454545"}}>das Fairbundle abgebrochen werden</Text>
                    </Radio>
                </Radio.Group>
                <br/>
                <br/>
                <Space style={{width:"100%", justifyContent:"flex-end"}}>
                    <Button type="primary" style={{width:"240px", height:"40px"}} disabled={this.state.canNotSubmit} ref={(buttonDOM) => { this.createDOM = buttonDOM; }} onClick={this.onCreate}>
                        <Text style={{color:"#ffffff", fontSize:18, fontWeight:"bold"}}>
                            Veröffentlichen
                        </Text>
                    </Button>
                </Space>
            </div>
        )
    }
}