import React from 'react';
import {Card, Row, Table, Tabs, Typography} from "antd";
import OverviewBanner from "./OverviewBanner";

const {Text, Title} = Typography;
const {TabPane} = Tabs;

export default class ActivityOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "all"
        };

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
            <Table columns={this.props.positionSubTableColumns}
                   dataSource={this.getSubTableData(record)}
                   pagination={false}
                   className="padding--md">
            </Table>
        )
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


    render() {
        return (
            <Card title="Meine Aktivitäten">
                {/* Übersichtsbanner (normale und Fairbundle*/}
                <OverviewBanner municipality={this.props.municipality}/>
                <Row className="margin-bottom--sm margin-top--md">
                    <Title className="padding-right--sm" level={4}>
                        Laufende Fairbundle Bestellungen
                    </Title>
                </Row>
                <Row>
                    <Table columns={this.props.fairbundleTableColumns}
                           pagination={{size:"small"}}
                           dataSource={this.getFairbundleTableData()}>
                    </Table>
                </Row>
                <Row className="margin-vertical--sm">
                    <Title className="padding-right--sm" level={4}>
                        Abgeschlossene Bestellungen
                    </Title>
                </Row>
                <Row>
                    <Table columns={this.props.orderTableColums}
                           dataSource={this.getOrderTableData()}
                           pagination={{size: "small"}}
                           expandable={{
                               expandedRowRender: record => this.renderPositionRecords(record),
                               rowExpandable: record => record.type === ('Direktbestellung')
                           }}>
                    </Table>
                </Row>

            </Card>
        );
    }
}
