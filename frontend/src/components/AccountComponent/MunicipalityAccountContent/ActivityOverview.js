import React from 'react';
import {Badge, Card, Col, Row, Table, Typography} from "antd";
import ActivityOverviewBanner from "./ActivityOverviewBanner";
import {CloseCircleOutlined, SendOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

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
        let orderTypes = [fairbundlesSubmitted, directOrdersSubmitted];
        let data = [];
        orderTypes.forEach((orderType) => {
            orderType.forEach((order) => {
                let orderValue = 0;
                let type = "";
                if (orderType === fairbundlesSubmitted) {
                    let positions = this.props.municipality.fairbundlesSubmittedPositions.filter((position) => position.order._id.toString() === order._id.toString());
                    orderValue = positions.reduce((a, b) => a + b.qty * order.finalUnitPrice, 0);
                    type = "Fairbundle";
                } else if (orderType === directOrdersSubmitted) {
                    orderValue = this.props.municipality.directOrderValues.find((o) => o.order._id === order._id).value;
                    type = "Direktbestellung";
                }
                let orderSubmission = order.submission;
                const price = new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                }).format(orderValue);
                const submission = new Intl.DateTimeFormat(('de-DE')).format(new Date(orderSubmission));
                let entry = {
                    key: order._id,
                    type: type,
                    order: order._id,
                    price: price,
                    rawPrice: orderValue,
                    submission: submission,
                    rawSubmission: new Date(orderSubmission)
                };
                data.push(entry);
            });
        });
        return data;
    }


    getFairbundleTableData() {
        let data = [];
        this.props.municipality.fairbundlesPending.forEach((fbp) => {
            console.log(fbp);
            const targetPriceLevel = fbp.product.priceLevel.find((pl) => pl.unitPrice === fbp.order.targetPrice);
            const targetQty = targetPriceLevel.minQty;
            const currentQty = fbp.order.positions.reduce((a, b) => a + b.qty, 0);
            const reachedPriceLevel = fbp.product.priceLevel.filter((pl) => pl.minQty <= currentQty);
            let currentPrice = reachedPriceLevel.length > 0 ? reachedPriceLevel.reduce((a, b) => Math.min(a, b.unitPrice), Number.MAX_SAFE_INTEGER): null;
            const targetprice = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(targetPriceLevel.unitPrice);
            currentPrice = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(currentPrice);
            const status = currentQty + " von " + targetQty + " " + targetPriceLevel.unit;
            const expiration = new Intl.DateTimeFormat(('de-DE')).format(new Date(fbp.order.expiration));
            const expirationAction = fbp.order.expirationAction;
            let entry = {
                key: fbp.product._id,
                product: fbp.product.name,
                qty: fbp.qty + " " + targetPriceLevel.unit,
                price: targetprice + " | " + currentPrice,
                expiration: expiration,
                expirationAction: expirationAction,
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
        let fairbundlesSubmitted = this.props.municipality.fairbundlesSubmittedPositions;
        let directOrdersSubmitted = this.props.municipality.directOrdersSubmittedPositions;
        let positions = [];

        if (record.type === "Fairbundle") {
            positions = fairbundlesSubmitted.filter((p) =>
                p.order._id === record.key);
        } else if (record.type === "Direktbestellung") {
            console.log(directOrdersSubmitted);
            positions = directOrdersSubmitted.filter((p) =>
                p.order._id === record.key);
        }
        positions.forEach((p) => {
            let bestPrice = 0;
            if (record.type === "Fairbundle") {
                console.log(p);
                bestPrice = p.order.finalUnitPrice
            } else if (record.type === "Direktbestellung") {
                let reachedPriceLevel = p.product.priceLevel.filter((pl) => pl.minQty <= p.qty);
                bestPrice = reachedPriceLevel.length > 0 ? reachedPriceLevel.reduce((a, b) => Math.min(a, b.unitPrice), Number.MAX_SAFE_INTEGER) : null;
            }
            const price = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(bestPrice);
            let entry = {
                key: p.product._id,
                product: p.product.name,
                qty: p.qty + " " + p.product.priceLevel[0].unit,
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
                <ActivityOverviewBanner municipality={this.props.municipality}/>
                <Row className="margin-bottom--sm margin-top--md">
                    <Title className="padding-right--sm" level={4}>
                        Offene Fairbundle Bestellungen
                    </Title>
                    <Badge count={this.props.municipality.fairbundlesPending.length}
                           style={{backgroundColor: 'gold'}}/>
                </Row>
                <Row>
                    <Table columns={this.props.fairbundleTableColumns}
                           pagination={{size: "small"}}
                           dataSource={this.getFairbundleTableData()}
                           footer={() =>
                               <Col>
                                   <Row justify="start" align="middle">

                                       <SendOutlined/> <Text type="secondary"  className="padding-left--md">Die Bestellung wird in jedem Fall
                                       getätigt, eventuell nicht zum Zielpreis</Text>
                                   </Row>
                                   <Row justify="start" align="middle">
                                       <CloseCircleOutlined/> <Text type="secondary"  className="padding-left--md">Die Bestellung wird abgebrochen, wenn der Zielpreis nicht erreicht wird</Text>
                                   </Row>
                               </Col>

                           }>
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
                               expandedRowRender: record => this.renderPositionRecords(record)
                           }}>
                    </Table>
                </Row>
            </Card>
        );
    }
}
