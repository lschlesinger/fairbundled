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
        let currentQty = this.props.fairbundle.positions.reduce((temp, p) => {
            return temp + p.qty;
        }, 0);
        let targetQty = this.props.fairbundle.product.priceLevel.find(
            (pl) => pl.unitPrice === this.props.fairbundle.targetPrice
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
            Date.parse(this.props.fairbundle.expiration) -
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
                    {this.props.fairbundle.bundlers.length}
                </Title>
                <Text className="presented-products__text">
                    Teilnehmende Gemeinden
                </Text>
            </div>
        );
    }

    getPriceInfo() {
        let maxPrice = Math.max(
            ...this.props.fairbundle.product.priceLevel.map(
                (pl) => pl.unitPrice
            )
        );
        let savings = (
            1 -
            this.props.fairbundle.targetPrice / maxPrice
        ).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
        });
        return (
            <Col span={16}>
                <Title className="presented-products__bold-text" level={4}>
                    {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                    }).format(this.props.fairbundle.targetPrice)}
                </Title>
                <Text className="presented-products__text">
                    statt{" "}
                    {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                    }).format(maxPrice)}{" "}
                    · {savings} sparen
                </Text>
            </Col>
        );
    }

    render() {
        return (
            <Card>
                <Row gutter={[36, 0]} className="padding--sm">
                    <Col span={12}>
                        {console.log(this.props.fairbundle)}
                        <img
                            src={
                                this.props.fairbundle?.product.images?.length >
                                0
                                    ? this.props.fairbundle.product.images[0]
                                    : placeholder
                            }
                            alt="bild"
                            width="100%"
                        />
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Title level={3}>
                                {this.props.fairbundle?.product.name}
                            </Title>
                        </Row>
                        {this.getFairbundleProgress()}
                        {this.getRemainingDays()}
                        {this.getParticipatingMunicipalities()}
                        <Row className="padding-top--md" align="bottom">
                            {this.getPriceInfo()}{" "}
                            <Col span={8}>
                                <Link
                                    to={`/product/${this.props.fairbundle.product._id}`}
                                >
                                    <Button size="middle" type="primary" block>
                                        Details
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    }
}
