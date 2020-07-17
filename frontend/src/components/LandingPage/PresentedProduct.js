import React from "react";
import { Button, Card, Col, Progress, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import "./PresentedProducts.less";
import FairbundleService from "../../services/FairbundleService";
import ProductService from "../../services/ProductService";

const { Text, Title } = Typography;

export default class PresentedProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    getFairbundleProgress(fairbundleCharacteristics) {
        return (
            <Row className="padding-top--md">
                <Row align="middle">
                    <Title className="presented-products__qty" level={4}>
                        {fairbundleCharacteristics.currentQuantity}
                    </Title>
                    <Text className="padding-left--sm presented-products__text">
                        {" "}
                        von {fairbundleCharacteristics.requiredQuantity} {" "}
                        {ProductService.getMaxPriceLevel(this.props.presentedFairbundle.product)?.unit} erreicht
                    </Text>
                </Row>
                <Progress
                    percent={fairbundleCharacteristics.bundleCompletion}
                    strokeColor="#78A262"
                    showInfo={false}
                    status="active"
                />
            </Row>
        );
    }

    getRemainingDays(fairbundleCharacteristics) {
        return (
            <div className="padding-top--md">
                <Title className={fairbundleCharacteristics.remainingTime.includes("Std.") ? `presented-products__bold-text presented-products__remaining-hours` : "presented-products__bold-text"} level={4}>
                    {fairbundleCharacteristics.remainingTime}
                </Title>
                <Text className="presented-products__text">
                    verbleibende Laufzeit
                </Text>
            </div>
        );
    }

    getParticipatingMunicipalities(fairbundleCharacteristics) {
        return (
            <div className="padding-top--md">
                <Title className="presented-products__bold-text" level={4}>
                    {fairbundleCharacteristics.bundlerStatus.split(' ')[0]}
                </Title>
                <Text className="presented-products__text">
                    Teilnehmende Kommunen
                </Text>
            </div>
        );
    }

    getPriceInfo(fairbundleCharacteristics) {
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
                    }).format(fairbundleCharacteristics.maxPrice)}{" "}
                    · {fairbundleCharacteristics.savings} sparen
                </Text>
            </div>
        );
    }

    render() {
        let fairbundleCharacteristics = FairbundleService.getFairbundleCharacteristics(this.props.presentedFairbundle);
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
                        {this.getFairbundleProgress(fairbundleCharacteristics)}
                        {this.getRemainingDays(fairbundleCharacteristics)}
                        {this.getParticipatingMunicipalities(fairbundleCharacteristics)}
                        {this.getPriceInfo(fairbundleCharacteristics)}{" "}
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
