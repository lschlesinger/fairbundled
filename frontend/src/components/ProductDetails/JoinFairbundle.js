import React from "react";
import {Button, Card, Col, Row, Typography} from "antd";
import './JoinFairbundle.less';

const {Text} = Typography;

export default class JoinFairbundle extends React.Component {

    constructor(props) {
        super(props);
    }

    formatDate = date => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('.');
    };

    onJoin = () => {
        this.joinDOM.blur();

        this.props.joinFairbundle();
    };

    getMaxPriceLevel = () => {
        if (this.props.fairbundle?.product == null) {
            return null;
        }

        let max = Math.max(...this.props.fairbundle.product.priceLevel.map(p => p.unitPrice));

        return this.props.fairbundle.product.priceLevel.find(p => p.unitPrice === max);
    };

    render() {
        let priceLevel = this.props.fairbundle.product.priceLevel.find(p => p.unitPrice === this.props.fairbundle.targetPrice);
        let date = Date.parse(this.props.fairbundle.expiration);

        let maxPrice = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(this.getMaxPriceLevel().unitPrice);

        let expirationAction = "Ihre zum Fairbundle gehörende Bestellung trotzdem zum nächsthöheren Preis von bis zu " + maxPrice + " / " + this.getMaxPriceLevel().unit + " bestellt.";

        if (this.props.fairbundle.expirationAction === "cancel") {
            expirationAction = "Ihre zum Fairbundle gehörende Bestellung nicht durchgeführt. Es entstehen keine Kosten.";
        }

        return (
            <Col>
                <Card className="create-fairbundle__card-odd padding--sm">
                    <Row justify="center">
                        <h3>Zielpreis des ausgewählten Fairbundles</h3>
                    </Row>
                    <Row justify="center">
                        <h3>{new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        }).format(this.props.fairbundle.targetPrice)} / {priceLevel.unit}</h3>
                    </Row>
                    <Row justify="center" className="margin-top--sm">
                        bei einem Volumen von insgesamt {priceLevel.minQty} {priceLevel.unit}
                    </Row>
                    <Row justify="center" className="margin-top--md">
                        Sie treten nach der Bestätigung mit einer Bestellmenge von &nbsp; <b>{ this.props.quantity }</b> &nbsp; <b>{ priceLevel.unit }</b> &nbsp;  bei.
                    </Row>
                </Card>
                <Row className="margin-vertical--md">
                    <Text>Laufzeit bis: <b>{this.formatDate(date)}</b> </Text>
                </Row>
                <Row>
                    Bei Nichterreichen des Zielpreises wird {expirationAction}
                </Row>
                <Row justify="end">
                    <Button type="primary" ref={(buttonDOM) => {
                        this.joinDOM = buttonDOM;
                    }} onClick={this.onJoin}>
                        Beitreten
                    </Button>
                </Row>
            </Col>
        )
    }
}
