import React from "react";
import {Card, Typography, Space, Button} from "antd";

const { Title, Text } = Typography;

export default class JoinFairbundle extends React.Component {

    constructor(props) {
        super(props);
    }

    formatDate = date => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [day, month, year].join('.');
    }

    onJoin = () => {
        this.joinDOM.blur();

        this.props.joinFairbundle();
    };

    getMaxPriceLevel = () => {
        if (this.props.fairbundle?.product == null) {
            return null;
        }

        let max = Math.max(...this.props.fairbundle.product.priceLevel.map(p => p.unitPrice));
        
        return this.props.fairbundle.product.priceLevel.find(p => p.unitPrice == max);
    }

    render() {
        let priceLevel = this.props.fairbundle.product.priceLevel.find(p => p.unitPrice === this.props.fairbundle.targetPrice);
        let date = Date.parse(this.props.fairbundle.expiration);
        let expirationAction = "trotzdem zum nächsthöheren Preis von bis zu " + this.getMaxPriceLevel().unitPrice + "€ / " + this.getMaxPriceLevel().unit + " ausgeführt.";

        if (this.props.fairbundle.expirationAction == "cancel") {
            expirationAction = "abgebrochen und das Produkt wird nicht bestellt. Es entstehen keine Kosten.";
        }

        return (
            <div>
                <Title level={2} style={{fontWeight:"bold"}}>Fairbundle beitreten</Title>
                <br/>
                <Card style={{width:"100%", background:"#c8c8c8", borderRadius:"12px", padding:"5px"}}>
                    <Title level={3} style={{width:"100%", textAlign:"center", color:"#686868", fontWeight:"bold"}}>{this.props.fairbundle.targetPrice}€ / {priceLevel.unit}</Title>
                    <Space style={{width:"100%", justifyContent:"center"}}><Text style={{color:"#686868"}}>bei einem Volumen von</Text></Space>
                    <Space style={{width:"100%", justifyContent:"center"}}><Text style={{color:"#686868", fontWeight:"bold"}}>{priceLevel.minQty} {priceLevel.unit}</Text></Space>
                </Card>
                <br/>
                <Text style={{marginRight:"10px", fontSize:18, color:"#454545"}}>Zieldatum:</Text>
                <Text style={{fontSize:18, fontWeight:"bold", color:"#686868"}}>{this.formatDate(date)}</Text>
                <br/>
                <br/>
                <Text style={{fontSize:18, color:"#454545"}}>Bei Nichterreichen des Zielpreises wird das Fairbundle </Text>
                <Text style={{fontSize:18, color:"#454545", fontWeight:"bold"}}>{expirationAction}</Text>
                <br/>
                <br/>
                <Space style={{width:"100%", justifyContent:"flex-end"}}>
                    <Button type="primary" style={{width:"240px", height:"40px"}} ref={(buttonDOM) => { this.joinDOM = buttonDOM; }} onClick={this.onJoin}>
                        <Text style={{color:"#ffffff", fontSize:18, fontWeight:"bold"}}>
                            Beitreten
                        </Text>
                    </Button>
                </Space>
            </div>
        )
    }
}