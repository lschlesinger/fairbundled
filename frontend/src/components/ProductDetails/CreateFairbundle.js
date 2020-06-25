import React from "react";
import {Typography, Space, Button, Radio, DatePicker} from "antd";

const { Title, Text } = Typography;

export default class CreateFairbundle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedOption:0,
            expirationDate: null
        };
    }

    onCreate = () => {
        this.createDOM.blur();

        this.props.createFairbundle();
    };

    onDateChange = (date, dateString) => {
        this.setState({expirationDate: date});
      }

    render() {
        let product = this.props.product;

        // let priceLevel = this.props.fairbundle.product.priceLevel.find(p => p.unitPrice === this.props.fairbundle.targetPrice);
        // let date = Date.parse(this.props.fairbundle.expiration);
        // let expirationAction = "trotzdem zum nächsthöheren Preis von bis zu " + this.props.fairbundle.product.priceLevel[0].unitPrice + "€ / " + this.props.fairbundle.product.priceLevel[0].unit + " ausgeführt.";

        // if (this.props.fairbundle.expirationAction == "force") {
        //     expirationAction = "abgebrochen und das Produkt wird nicht bestellt. Es entstehen keine Kosten.";
        // }

        return (
            <div>
                <Title level={2} style={{fontWeight:"bold"}}>Neues Fairbundle</Title>
                

                <br/>
                <Text style={{marginRight:"10px", fontSize:18, color:"#454545"}}>Zieldatum:</Text>
                <DatePicker onChange={this.onDateChange} placeholder="Datum wählen" format={'DD.MM.YYYY'} style={{fontSize:18, fontWeight:"bold", color:"#686868", marginBottom:30, width:"15%"}} />

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
                    <Button type="primary" style={{width:"240px", height:"40px"}} ref={(buttonDOM) => { this.createDOM = buttonDOM; }} onClick={this.onCreate}>
                        <Text style={{color:"#ffffff", fontSize:18, fontWeight:"bold"}}>
                            Veröffentlichen
                        </Text>
                    </Button>
                </Space>
            </div>
        )
    }
}

/*
<br/>
                <Card style={{width:"100%", background:"#c8c8c8", borderRadius:"12px", padding:"5px"}}>
                    <Title level={3} style={{width:"100%", textAlign:"center", color:"#686868", fontWeight:"bold"}}>{this.props.fairbundle.targetPrice}€ / {priceLevel.unit}</Title>
                    <Space style={{width:"100%", justifyContent:"center"}}><Text style={{color:"#686868"}}>bei einem Volumen von</Text></Space>
                    <Space style={{width:"100%", justifyContent:"center"}}><Text style={{color:"#686868", fontWeight:"bold"}}>{priceLevel.minQty} {priceLevel.unit}</Text></Space>
                </Card>
                
                
                */