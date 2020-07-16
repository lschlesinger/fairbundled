import React from "react";
import { Button, Card, Col, Progress, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import "./PresentedProducts.less";

const { Text, Title } = Typography;

export default class PresentedProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    getFairbundleProgress() {
        let currentQty = this.props.presentedFairbundle.positions.reduce(
            (temp, p) => {
                return temp + p.qty;
            },
            0
        );
        let targetQty = this.props.presentedFairbundle.product.priceLevel.find(
            (pl) => pl.unitPrice === this.props.presentedFairbundle.targetPrice
        ).minQty;
        let progressPercentage = (currentQty / targetQty) * 100;
        return (
            <Row className="padding-top--md">
                <Row align="middle">
                    <Title className="presented-products__qty" level={4}>
                        {currentQty}
                    </Title>
                    <Text className="padding-left--sm presented-products__text">
                        {" "}
                        von {targetQty} erreicht
                    </Text>
                </Row>
                <Progress
                    percent={progressPercentage}
                    strokeColor="#78A262"
                    showInfo={false}
                    status="active"
                />
            </Row>
        );
    }

    getRemainingDays() {
        let currentDate = new Date();
        let diffTime =
            Date.parse(this.props.presentedFairbundle.expiration) -
            currentDate.getTime();
        let remainingDays = Math.round(diffTime / 3600 / 24 / 1000);
        return (
            <div className="padding-top--md">
                <Title className="presented-products__bold-text" level={4}>
                    {remainingDays}
                </Title>
                <Text className="presented-products__text">
                    Tage verbleibend
                </Text>
            </div>
        );
    }

    getParticipatingMunicipalities() {
        return (
            <div className="padding-top--md">
                <Title className="presented-products__bold-text" level={4}>
                    {new Set(this.props.presentedFairbundle.bundlers).size}
                </Title>
                <Text className="presented-products__text">
                    Teilnehmende Gemeinden
                </Text>
            </div>
        );
    }

    getPriceInfo() {
        let maxPrice = Math.max(
            ...this.props.presentedFairbundle.product.priceLevel.map(
                (pl) => pl.unitPrice
            )
        );
        let savings = (
            1 -
            this.props.presentedFairbundle.targetPrice / maxPrice
        ).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
        });
        return (
            <div className="padding-top--md">
                <Title className="presented-products__bold-text" level={4}>
                    {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                    }).format(this.props.presentedFairbundle.targetPrice)}
                </Title>
                <Text className="presented-products__text">
                    statt{" "}
                    {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                    }).format(maxPrice)}{" "}
                    · {savings} sparen
                </Text>
            </div>
        );
    }

    render() {
        return (
            <Card>
                <Row gutter={[36, 0]} className="padding--md">
                    <Col span={12}>
                        <img
                            src={
                                this.props.presentedFairbundle.product.images
                                    ?.length > 0
                                    ? this.props.presentedFairbundle.product
                                          .images[0]
                                    : placeholder
                            }
                            alt="bild"
                            width="80%"
                        />
                    </Col>
                    <Col span={12}>
                        <Row className="margin-bottom--lg">
                            <Title level={3}>
                                {this.props.presentedFairbundle?.product.name}
                            </Title>
                        </Row>
                        {this.getFairbundleProgress()}
                        {this.getRemainingDays()}
                        {this.getParticipatingMunicipalities()}
                        {this.getPriceInfo()}{" "}
                        <Row className="padding-top--md" align="bottom">
                            <Link
                                to={`/product/${this.props.presentedFairbundle.product._id}`}
                            >
                                <Button size="middle" type="primary" block className="margin-vertical--lg">
                                    Zum Produkt
                                </Button>
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    }
}
