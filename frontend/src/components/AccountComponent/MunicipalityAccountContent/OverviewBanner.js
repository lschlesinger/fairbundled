import React from 'react';
import {Col, Row, Tabs, Typography} from "antd";
import '../OrderOverview.less'

const {Text, Title} = Typography;
const {TabPane} = Tabs;

export default class OverviewBanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "all"
        };

    }

    handleChange = (key) => {
        this.setState({
            activeTab: key
        })
    };

    renderTabProductCount() {
        let productCount = 0;
        if (this.state.activeTab === 'all') {
            productCount = this.props.municipality.fairbundleProductsBought.length + this.props.municipality.directProductsBought.length;
        } else if (this.state.activeTab === 'single') {
            productCount = this.props.municipality.directProductsBought.length;
        } else if (this.state.activeTab === 'fairbundle') {
            productCount = this.props.municipality.fairbundleProductsBought.length;
        }
        return productCount;
    }

    renderTabOrderCount() {
        let orderCount = 0;
        if (this.state.activeTab === 'all') {
            orderCount = this.props.municipality.fairbundlesSubmitted.length + this.props.municipality.directOrdersSubmitted.length;
        } else if (this.state.activeTab === 'single') {
            orderCount = this.props.municipality.directOrdersSubmitted.length;
        } else if (this.state.activeTab === 'fairbundle') {
            orderCount = this.props.municipality.fairbundlesSubmitted.length;
        }
        return orderCount;
    }

    renderTabPositionsValue() {
        let positionsValue = 0;
        if (this.state.activeTab === 'all') {
            positionsValue = this.props.municipality.fairbundleSpendings + this.props.municipality.directOrderSpendings;
        } else if (this.state.activeTab === 'single') {
            positionsValue = this.props.municipality.directOrderSpendings;
        } else if (this.state.activeTab === 'fairbundle') {
            positionsValue = this.props.municipality.fairbundleSpendings;
        }
        return positionsValue;
    }


    renderCustomizedOverview() {
        return (
            <Row className="margin--sm order-overview__kpis" gutter={8}>
                <Col span={7}>
                    <Row className="padding-top--sm" justify="center">
                        <Text className="order-overview__number" strong>
                            {this.renderTabProductCount()}
                        </Text>
                    </Row>
                    <Row
                        justify="center"
                        className="padding-top--xs padding-bottom--sm"
                    >
                        <Text strong>Produkte</Text>
                    </Row>
                </Col>
                <Col span={7}>
                    <Row className="padding-top--sm" justify="center">
                        <Text className="order-overview__number" strong>
                            {this.renderTabOrderCount()}
                        </Text>
                    </Row>
                    <Row
                        justify="center"
                        className="padding-top--xs padding-bottom--sm"
                    >
                        <Text strong>Bestellungen</Text>
                    </Row>
                </Col>
                <Col span={10}>
                    <Row className="padding-top--sm" justify="center">
                        <Text className="order-overview__number" strong>
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(this.renderTabPositionsValue())}
                        </Text>
                    </Row>
                    <Row
                        justify="center"
                        className="padding-top--xs padding-bottom--sm"
                    >
                        <Text strong>Gesamtausgaben</Text>
                    </Row>
                </Col>
            </Row>);
    }

    render() {
        return (
            <Row className="margin-vertical--sm">
                <Title className="padding-right--sm" level={4}>
                    Übersicht
                </Title>
                <Tabs defaultActiveKey="all" className="activity-overview__tab-menu" onChange={this.handleChange}>
                    <TabPane tab="Gesamt" key="all">
                        {this.renderCustomizedOverview()}
                    </TabPane>
                    <TabPane tab="Fairbundle" key="fairbundle">
                        {this.renderCustomizedOverview()}
                    </TabPane>
                    <TabPane tab="Direktbestellung" key="single">
                        {this.renderCustomizedOverview()}
                    </TabPane>
                </Tabs>
            </Row>
        );
    }
}
