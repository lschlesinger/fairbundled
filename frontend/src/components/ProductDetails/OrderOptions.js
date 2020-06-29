import React from "react";
import {Button, Card, Col, InputNumber, Progress, Row, Tooltip} from "antd";
import {CalendarOutlined, CheckCircleOutlined, TeamOutlined} from '@ant-design/icons';
import './OrderOptions.less';

export default class OrderOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            canBuy: false
        };
    }

    getMinQuantity = () => {
        if (this.props.product == null) {
            return 0;
        }
        return Math.min(...this.props.product.priceLevel.map(p => p.minQty));
    };

    getMaxPriceLevel = () => {
        if (this.props.product == null) {
            return null;
        }

        let max = Math.max(...this.props.product.priceLevel.map(p => p.unitPrice));

        return this.props.product.priceLevel.find(p => p.unitPrice === max);
    };

    onCreateFairbundle = (evt) => {
        this.createDOM.blur();

        if (this.state.qty && this.state.qty > 0) {
            this.props.onCreateFairbundle({productId: this.props.productId, qty: this.state.qty});
        }
    };

    onJoinFairbundle = (fairbundleId) => {
        this.joinDOM.blur();

        if (this.state.qty && this.state.qty > 0) {
            this.props.onJoinFairbundle({fairbundleId: fairbundleId, qty: this.state.qty});
        }
    };

    onCreateOrder = (evt) => {
        this.orderDOM.blur();

        if (this.state.qty && this.state.qty > 0) {
            this.props.onCreateOrder(this.state.qty);
        }
    };

    onInputNumberChanged = number => {
        if (this.state.qty === number) {
            return;
        }

        let minQty = this.getMinQuantity();

        this.setState({
            qty: number,
            canBuy: number >= minQty
        })
    };

    createFairbundleCard = (fairbundle, product) => {

        let savings = ((1 - (fairbundle.targetPrice / this.getMaxPriceLevel()?.unitPrice))).toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 2
        });

        let requiredQuantity = product.priceLevel.find(l => l.unitPrice === fairbundle.targetPrice).minQty;
        let currentQuantity = fairbundle.positions.reduce(function (r, a) {
            return r + a.qty;
        }, 0);

        let completedBundle = currentQuantity / requiredQuantity * 100;

        let currentDate = new Date();
        let diffTime = Date.parse(fairbundle.expiration) - currentDate.getTime();
        let remainingDays = Math.round(diffTime / 3600 / 24 / 1000);

        return (
            <Card className="order-options__card margin-bottom--sm" key={fairbundle._id}>
                <Row align="middle">
                    <Col className="order-options__prices">
                        {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        }).format(fairbundle.targetPrice)} / {this.getMaxPriceLevel()?.unit}
                    </Col>
                </Row>
                {fairbundle.targetPrice === this.getMaxPriceLevel()?.unitPrice ? '' :
                    <Row>
                        <Col className="margin-right--sm order-options__delete-prices">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(this.getMaxPriceLevel()?.unitPrice)}
                        </Col>
                        <Col>
                            <i>{savings} sparen</i>
                        </Col>
                    </Row>}
                <Progress
                    className="margin-top--md"
                    percent={completedBundle}
                    strokeWidth={3}
                    strokeColor="#78A262"
                    showInfo={false}/>
                <Row align="middle" className="margin-bottom--md">
                    <Col style={{color: "#78A262"}}>
                        <b>{currentQuantity}</b>
                    </Col>
                    <Col className="padding-horizontal--sm">
                        von {requiredQuantity} {this.getMaxPriceLevel()?.unit} erreicht
                    </Col>
                </Row>
                <Row className="margin-vertical--md">
                    <Row align="middle">
                        <Col>
                            <CalendarOutlined style={{fontSize: 25}}/>
                        </Col>
                        <Col className="padding-horizontal--sm padding-vertical--xs">
                            noch <b>{remainingDays}</b> {`Tag${remainingDays > 1 ? 'e' : ''} bis zur Bestellung`}
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col>
                            <TeamOutlined style={{fontSize: 25}}/>
                        </Col>
                        <Col className="padding-horizontal--sm padding-vertical--xs">
                            aktuell <b>{fairbundle.bundlers.length}</b> {`teilnehmende Kommune${fairbundle.bundlers.length > 1 ? 'n' : ''}`}
                        </Col>
                    </Row>
                </Row>
                <Button type="primary" className="order-options__buttons margin-top--md" ref={(buttonDOM) => {
                    this.joinDOM = buttonDOM;
                }} onClick={(evt) => this.onJoinFairbundle(fairbundle._id)}>
                    Fairbundle beitreten
                </Button>
            </Card>
        );
    };

    render() {
        return (
            <Col>
                <Card className="order-options__card" key="order-head">
                    <Row>
                        <h1 className="order-options__prices">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(this.getMaxPriceLevel()?.unitPrice)} / {this.getMaxPriceLevel()?.unit}
                        </h1>
                    </Row>
                    <Row>
                        <Col>
                            Lieferbar
                        </Col>
                        <Col className="padding-horizontal--sm">
                            <CheckCircleOutlined/> - <b>{this.props.product?.deliveryDays}</b>
                        </Col>
                        <Col>
                            Werktage
                        </Col>
                    </Row>
                    <Row align="middle" className="margin-vertical--md">
                        <Col>
                            Bestellmenge:
                        </Col>
                        <Col className="padding-horizontal--sm">
                            <InputNumber min={0} max={99999}
                                         defaultValue={this.state.qty}
                                         onChange={this.onInputNumberChanged}/>
                        </Col>
                        <Col>
                            {this.getMaxPriceLevel()?.unit}
                        </Col>
                    </Row>
                </Card>
                {/*only render "Neues Fairbundle" Button if bundling is possible (more than 1 price level)*/}
                {this.props.product?.priceLevel.length > 1 ? (
                    <Card className="order-options__card margin-vertical--sm">
                        <Button type="primary"
                                block
                                className="order-options__buttons"
                                ref={(buttonDOM) => {
                                    this.createDOM = buttonDOM;
                                }} onClick={this.onCreateFairbundle}>
                            Neues Fairbundle
                        </Button>
                    </Card>
                ) : (<Row className="order-options__card margin-vertical--sm">
                    <i>Der Hersteller bietet dieses Produkt leider nicht im Fairbundle an.</i>
                </Row>)}
                {this.props.fairbundles?.map((fb) => this.createFairbundleCard(fb, this.props.product))}
                <Card className="order-options__card margin-vertical--sm">
                    <Tooltip title={!this.state.canBuy ? "Mindestbestellmenge nicht erfüllt" : "Sofort bestellen"}>
                        <Button type="primary"
                                className="order-options__buttons"
                                block
                                disabled={!this.state.canBuy}
                                ref={(buttonDOM) => {
                                    this.orderDOM = buttonDOM;
                                }} onClick={this.onCreateOrder}>
                            Direktbestellung
                        </Button>
                    </Tooltip>
                </Card>
            </Col>
        )
    }
}
