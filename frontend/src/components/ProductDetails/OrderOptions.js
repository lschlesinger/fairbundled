import React from "react";
import {Button, Card, Col, InputNumber, Progress, Row, Tooltip} from "antd";
import {CalendarOutlined, CheckCircleOutlined, TeamOutlined} from '@ant-design/icons';
import AuthService from "../../services/AuthService";
import './OrderOptions.less';
import FairbundleService from "../../services/FairbundleService";
import ProductService from "../../services/ProductService";

export default class OrderOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            canBuy: this.props.minQty <= 1
        };
    }

    onCreateFairbundle = (evt) => {
        this.createDOM.blur();

        if (!AuthService.isAuthenticatedMunicipality()) {
            window.location = `/login?product=${this.props.product._id}`;

            return;
        }

        if (this.state.qty && this.state.qty > 0) {
            this.props.onCreateFairbundle({
                productId: this.props.productId,
                qty: this.state.qty,
            });
        }
    };

    onJoinFairbundle = (fairbundleId) => {
        this.joinDOM.blur();

        if (!AuthService.isAuthenticatedMunicipality()) {
            window.location = `/login?product=${this.props.product._id}`;

            return;
        }

        if (this.state.qty && this.state.qty > 0) {
            this.props.onJoinFairbundle({
                fairbundleId: fairbundleId,
                qty: this.state.qty,
            });
        }
    };

    onCreateOrder = (evt) => {
        this.orderDOM.blur();

        if (!AuthService.isAuthenticatedMunicipality()) {
            window.location = `/login?product=${this.props.product._id}`;

            return;
        }

        if (this.state.qty && this.state.qty > 0) {
            this.props.onCreateOrder(this.state.qty);
        }
    };

    onInputNumberChanged = (number) => {
        if (this.state.qty === number) {
            return;
        }

        this.setState({
            qty: number,
            canBuy: number >= this.props.minQty
        });
    };

    createFairbundleCard = (fairbundle) => {
        let fairbundleCharacteristics = FairbundleService.getFairbundleCharacteristics(fairbundle);
        return (
            <Card
                className="order-options__card margin-bottom--sm"
                key={fairbundle._id}
            >
                <Row align="middle">
                    <Col className="order-options__prices">
                        {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        }).format(fairbundle.targetPrice)}{" "}
                        / {fairbundle.product.priceLevel[0].unit}
                    </Col>
                </Row>
                {fairbundle.targetPrice ===
                fairbundleCharacteristics.maxPrice ? (
                    ""
                ) : (
                    <Row>
                        <Col className="margin-right--sm order-options__delete-prices">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(fairbundleCharacteristics.maxPrice)}
                        </Col>
                        <Col>
                            <i>{fairbundleCharacteristics.savings} sparen</i>
                        </Col>
                    </Row>
                )}
                <Progress
                    className="margin-top--md"
                    percent={fairbundleCharacteristics.bundleCompletion}
                    strokeWidth={3}
                    strokeColor="#78A262"
                    showInfo={false}
                />
                <Row align="middle" className="margin-bottom--md">
                    <Col style={{color: "#78A262"}}>
                        <b>{fairbundleCharacteristics.currentQuantity}</b>
                    </Col>
                    <Col className="padding-horizontal--sm">
                        von {fairbundleCharacteristics.requiredQuantity} {fairbundle.product.priceLevel[0].unit}{" "}
                        erreicht
                    </Col>
                </Row>
                <Row align="middle">
                    <Col>
                        <CalendarOutlined style={{fontSize: 25}}/>
                    </Col>
                    <Col className="order-options__remaining-time padding-horizontal--sm padding-vertical--xs">
                        noch <b className={fairbundleCharacteristics.remainingTime.includes("Std.") ? `order-options__remaining-hours` : ""} >{fairbundleCharacteristics.remainingTime}</b>{" "}
                        bis zur Bestellung
                    </Col>
                </Row>
                <Row align="middle">
                    <Col>
                        <TeamOutlined style={{fontSize: 25}}/>
                    </Col>
                    <Col className="padding-horizontal--sm padding-vertical--xs">
                        aktuell <b>{fairbundleCharacteristics.bundlerStatus}</b>
                    </Col>
                </Row>
                <Row justify="center" align="middle">
                    <Col span={24}>
                        <Tooltip
                            title={`
                    ${!AuthService.isAuthenticatedMunicipality()
                                ? "Nur angemeldete Nutzer von Kommunen können Fairbundle beitreten"
                                : "Weiter zu Konditionen"
                            }`}
                        >
                            <Button
                                type="primary"
                                className="order-options__buttons margin-top--md"
                                ref={(buttonDOM) => {
                                    this.joinDOM = buttonDOM;
                                }}
                                onClick={(evt) => this.onJoinFairbundle(fairbundle._id)}
                            >
                                Fairbundle beitreten
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
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
                            }).format(ProductService.getMaxPriceLevel(this.props.product)?.unitPrice)}{" "}
                            / {ProductService.getMaxPriceLevel(this.props.product)?.unit}
                        </h1>
                    </Row>
                    <Row>
                        <Col>Lieferbar</Col>
                        <Col className="padding-horizontal--sm">
                            <CheckCircleOutlined/> -{" "}
                            <b>{this.props.product?.deliveryDays}</b>
                        </Col>
                        <Col>Werktage</Col>
                    </Row>
                    <Row align="middle" className="margin-vertical--md">
                        <Col>Bestellmenge:</Col>
                        <Col className="padding-horizontal--sm">
                            <InputNumber
                                min={0}
                                max={99999}
                                defaultValue={this.state.qty}
                                onChange={this.onInputNumberChanged}
                            />
                        </Col>
                        <Col>{this.props.product.priceLevel[0]?.unit}</Col>
                    </Row>
                </Card>
                {/*only render "Neues Fairbundle" Button if bundling is possible (more than 1 price level)*/}
                {this.props.product?.priceLevel.length > 1 ? (
                    <Card className="order-options__card margin-vertical--sm">
                        <Row justify="center" align="middle">
                            <Col span={24}>
                                <Tooltip
                                    title={`
                            ${!AuthService.isAuthenticatedMunicipality()
                                        ? "Nur angemeldete Nutzer von Kommunen können Fairbundle erstellen"
                                        : "Weiter zur Konfiguration"
                                    }`}
                                >
                                    <Button
                                        type="primary"
                                        block
                                        className="order-options__buttons"
                                        ref={(buttonDOM) => {
                                            this.createDOM = buttonDOM;
                                        }}
                                        onClick={this.onCreateFairbundle}
                                    >
                                        Neues Fairbundle
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Card>
                ) : (
                    <Row className="order-options__card margin-vertical--sm">
                        <i>
                            Dieses Produkt ist leider nicht im Fairbundle erhältlich.
                        </i>
                    </Row>
                )}
                {this.props.fairbundles?.map((fb) =>
                    this.createFairbundleCard(fb)
                )}
                <Card className="order-options__card margin-vertical--sm">
                    <Row justify="center" align="middle">
                        <Col span={24}>
                            <Tooltip
                                title={`
                        ${!AuthService.isAuthenticatedMunicipality()
                                    ? "Nur angemeldete Nutzer von Kommunen können Artikel bestellen"
                                    : !this.state.canBuy
                                        ? "Mindestbestellmenge von " +
                                        this.props.minQty + " " +
                                        this.props.product?.priceLevel[0]?.unit +
                                        " nicht erreicht"
                                        : "In den Warenkorb"
                                }`}
                            >
                                <Button type="primary"
                                        className="order-options__buttons"
                                        block
                                        disabled={!this.state.canBuy}
                                        ref={(buttonDOM) => {
                                            this.orderDOM = buttonDOM;
                                        }}
                                        onClick={this.onCreateOrder}
                                >
                                    Direktbestellung
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }
}
