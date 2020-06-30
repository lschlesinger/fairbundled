import React from 'react';
import {Card, Col, Row, Table, Tabs, Typography} from "antd";

const {Text, Title} = Typography;
const {TabPane} = Tabs;

export default class ActivityOverview extends React.Component {

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
            <Card title="Meine Aktivitäten">
                {/* Bestellungen (normale und Fairbundle) der letzten 30 oder 60 Tage */}
                <Row className="margin-bottom--sm">
                    <Title className="padding-right--sm" level={4}>
                        Übersicht
                    </Title>
                </Row>
                <Tabs defaultActiveKey="all" onChange={this.handleChange}>
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
                <Row className="margin-bottom--sm">
                    <Title className="padding-right--sm" level={4}>
                        Laufende Fairbundle Bestellungen
                    </Title>
                </Row>
                <Row>
                    <Table columns={this.getFairbundleTableColumns()}
                           dataSource={this.getFairbundleTableData()}>

                    </Table>
                </Row>
                <Row className="margin-bottom--sm">
                    <Title className="padding-right--sm" level={4}>
                        Abgeschlossene Bestellungen
                    </Title>
                </Row>
                <Row>
                    Hier Tabelle
                </Row>
            </Card>
        );
    }

    getFairbundleTableColumns() {
        let columns = [{title: 'Produkt', dataIndex: 'product', key: 'product'}, {
            title: 'Laufzeit',
            dataIndex: 'expiration',
            key: 'expiration'
        }];
        this.props.municipality.fairbundlesPending.map((fb) => {
            columns.push(fb);
        });
        return columns;
    }

    getFairbundleTableData() {
        let data = [];
        this.props.municipality.fairbundlesPending.map((fb) => {
            let entry = {
                key: fb.product._id,
                product: fb.product.name,
                expiration: fb.expiration
            };
            console.log(entry);
            data.push(entry);
        });
        console.log(data);
        return data;
    }
}
