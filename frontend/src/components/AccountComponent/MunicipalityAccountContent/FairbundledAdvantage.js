import React from 'react';
import {Avatar, Card, Col, Row, Typography} from "antd";
import '../OrderOverview.less'

const {Text, Title} = Typography;

export default class FairbundledAdvantage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topCertificate: null,
        }
    }

    componentDidMount() {
        let topCertificate = this.getTopCertficate();
        this.setState({
            topCertificate: topCertificate
        });
    }

    getAverageSavings() {
        let averagedSavingPercentage = this.props.municipality?.fairbundleSavings.reduce((a, b) => a + b.savingPercentage, 0) / this.props.municipality?.fairbundleSavings.length;
        if (averagedSavingPercentage > 0) {
            averagedSavingPercentage = averagedSavingPercentage.toLocaleString(undefined, {
                style: 'percent',
                minimumFractionDigits: 2
            });
        } else {
            averagedSavingPercentage = "-";
        }
        return averagedSavingPercentage;
    }

    getOverallSavings() {
        return this.props.municipality?.fairbundleSavings.reduce((a, b) => a + b.savingAbsolute, 0);
    }

    getTopCertficate() {
        let certificates = this.props.municipality?.certificates;
        if (certificates.length > 0) {
            let orderedCertificates = certificates.sort((a, b) =>
                certificates.filter(v => v._id === a._id).length
                - certificates.filter(v => v._id === b._id).length
            );
            return orderedCertificates.pop();
        } else {
            return null;
        }
    }

    render() {
        return (
            <Card title="Fairbundled Vorteile">
                <Row className="margin-vertical--sm">
                    <Title className="padding-right--sm" level={4}>
                        Ersparnisse
                    </Title>
                </Row>
                <Row className="margin--sm order-overview__kpis" gutter={8}>
                    <Col span={12}>
                        <Row className="padding-top--sm" justify="center">
                            <Text className="order-overview__number" strong>
                                {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(this.getOverallSavings())}
                            </Text>
                        </Row>
                        <Row
                            justify="center"
                            className="padding-top--xs padding-bottom--sm"
                        >
                            <Text strong>Gesamt</Text>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row className="padding-top--sm" justify="center">
                            <Text className="order-overview__number" strong>
                                {this.getAverageSavings()}
                            </Text>
                        </Row>
                        <Row
                            justify="center"
                            className="padding-top--xs padding-bottom--sm"
                        >
                            <Text strong>Durchschnitt / Produkt</Text>
                        </Row>
                    </Col>
                </Row>
                <Row className="margin-vertical--md">
                    <Title className="padding-right--sm" level={4}>
                        Wichtigstes Nachhaltigkeits-Zertifikat
                    </Title>
                </Row>
                {this.state.topCertificate ?
                    <Col span={24}>
                        <Row className="padding-top--sm" justify="center">
                            <a href={this.state.topCertificate?.url} target="_blank">
                                <Avatar
                                    shape="square"
                                    size="large"
                                    src={this.state.topCertificate?.logo}/>
                            </a>
                        </Row>
                        <Row className="padding-top--sm" justify="center">
                            <Text className="order-overview__number" strong>
                                {this.state.topCertificate?.name}
                            </Text>
                        </Row>)
                    </Col> :
                    "Es liegen noch keine Daten vor."}
            </Card>
        );
    }
}
