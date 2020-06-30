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
                <Row className="margin-vertical--sm">
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
                <Row className="margin-bottom--sm margin-top--md">
                    <Title className="padding-right--sm" level={4}>
                        Laufende Fairbundle Bestellungen
                    </Title>
                </Row>
                <Row>
                    <Table columns={this.getFairbundleTableColumns()}
                           pagination={{size:"small"}}
                           dataSource={this.getFairbundleTableData()}>
                    </Table>
                </Row>
                <Row className="margin-bottom--sm margin-top--md">
                    <Title className="padding-right--sm" level={4}>
                        Abgeschlossene Bestellungen
                    </Title>
                </Row>
                <Row>
                    <Table columns={this.getOrderTableColumns()}
                           dataSource={this.getOrderTableData()}
                           pagination={{size:"small"}}
                           expandable={{
                               expandedRowRender: record => this.renderPositionRecords(record),
                               rowExpandable: record => record.type === ('Direktbestellung')
                           }}>
                    </Table>
                </Row>
            </Card>
        );
    }

    getFairbundleTableColumns() {
        return [
            {
                title: 'Produkt',
                dataIndex: 'product',
                key: 'product'
            },
            {
                title: 'Menge',
                dataIndex: 'qty',
                key: 'qty'
            },
            {
                title: 'Zielpreis',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Laufzeitende',
                dataIndex: 'expiration',
                key: 'expiration',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.rawExpiration - b.rawExpiration
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            }
        ];
    }

    getOrderTableData() {
        let fairbundlesSubmitted = this.props.municipality.fairbundlesSubmitted;
        let directOrdersSubmitted = this.props.municipality.directOrdersSubmitted;
        let data = [];
        directOrdersSubmitted.map((order) => {
            let positions = this.props.municipality.directOrdersSubmittedPositions.filter((position) => position.order._id.toString() === order._id.toString());
            let orderValue = this.props.municipality.directOrderValues.find((o) => o.order._id === order._id).value;
            let orderSubmission = order.submission;
            const price = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(orderValue);
            const submission = new Intl.DateTimeFormat(('de-DE')).format(new Date(orderSubmission));
            let entry = {
                key: order._id,
                type: "Direktbestellung",
                order: order._id,
                positions: positions.length,
                price: price,
                rawPrice: orderValue,
                submission: submission,
                rawSubmission: new Date(orderSubmission)
            };
            data.push(entry);
        });
        fairbundlesSubmitted = this.props.municipality.fairbundlesSubmitted;
        fairbundlesSubmitted.map((order) => {
            let positions = this.props.municipality.fairbundlesSubmittedPositions.filter((position) => position.order._id.toString() === order._id.toString());
            let name = positions[0].product.name;
            let orderValue = positions.reduce((a, b) => a + b.qty * order.finalUnitPrice, 0);
            const price = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(orderValue);
            let orderSubmission = order.submission;
            const submission = new Intl.DateTimeFormat(('de-DE')).format(new Date(orderSubmission));
            let entry = {
                key: order._id,
                type: "Fairbundle " + name,
                order: order._id,
                positions: positions.length,
                price: price,
                rawPrice: orderValue,
                submission: submission,
                rawSubmission: new Date(orderSubmission)
            };
            data.push(entry);
        });
        return data;
    }

    getOrderTableColumns() {
        return [
            {
                title: 'Typ',
                dataIndex: 'type',
                key: 'type',
                filters: [
                    {
                        text: 'Fairbundle',
                        value: 'Fairbundle'
                    },
                    {
                        text: 'Direktbestellung',
                        value: 'Direktbestellung'
                    }
                ],
                onFilter: (value, record) => record.type.indexOf(value) === 0,
            },
            {
                title: 'Bestellnummer',
                dataIndex: 'order',
                key: 'order'
            },
            {
                title: 'Positionen',
                dataIndex: 'positions',
                key: 'positions'
            },
            {
                title: 'Gesamtpreis',
                dataIndex: 'price',
                key: 'price',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.rawPrice - b.rawPrice
            },
            {
                title: 'Datum',
                dataIndex: 'submission',
                key: 'submission',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.rawSubmission - b.rawSubmission
            }
        ];
    }

    getFairbundleTableData() {
        let data = [];
        this.props.municipality.fairbundlesPending.map((fbp) => {
            const targetPriceLevel = fbp.product.priceLevel.find((pl) => pl.unitPrice === fbp.order.targetPrice);
            const targetQty = targetPriceLevel.minQty;
            const currentQty = fbp.order.positions.reduce((a, b) => a + b.qty, 0);
            const status = currentQty + " von " + targetQty + " " + targetPriceLevel.unit;
            const price = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(targetPriceLevel.unitPrice);
            const expiration = new Intl.DateTimeFormat(('de-DE')).format(new Date(fbp.order.expiration));
            let entry = {
                key: fbp.product._id,
                product: fbp.product.name,
                qty: fbp.qty + " " + targetPriceLevel.unit,
                price: price,
                expiration: expiration,
                rawExpiration: new Date(fbp.order.expiration),
                status: status
            };
            data.push(entry);
        });
        return data;
    }

    renderPositionRecords(record) {
        return (
            <Table columns={this.getSubTableColumns()}
                   dataSource={this.getSubTableData(record)}
                   pagination={false}
                   className="padding--md">
            </Table>
        )
    }

    getSubTableColumns() {
        return [
            {
                title: 'Produkt',
                dataIndex: 'product',
                key: 'product'
            },
            {
                title: 'Menge',
                dataIndex: 'qty',
                key: 'qty'
            },
            {
                title: 'Preis',
                dataIndex: 'price',
                key: 'price'
            }
        ];
    }

    getSubTableData(record) {
        let data = [];
        let positions = this.props.municipality.directOrdersSubmittedPositions.filter((p) =>
            p.order._id === record.key
        );
        positions.map((p) => {
            const reachedPriceLevel = p.product.priceLevel.filter((pl) => pl.minQty <= p.qty);
            const bestPrice = reachedPriceLevel.length > 0 ? reachedPriceLevel.reduce((a, b) => Math.min(a, b.unitPrice), Number.MAX_SAFE_INTEGER) : null;
            const price = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(bestPrice);
            let entry = {
                key: p.product._id,
                product: p.product.name,
                qty: p.qty + " " + reachedPriceLevel[0].unit,
                price: price,
            };
            data.push(entry);
        });
        return data;
    }
}
