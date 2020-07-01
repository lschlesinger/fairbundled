import React from 'react';
import {withRouter} from "react-router-dom";
import OrderService from "../../../services/OrderService";
import {Button, Col, message, Row, Table, Typography} from "antd";
import "../AccountView.less";
import AccountService from "../../../services/AccountService";

const {Text} = Typography;

class CheckoutView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: null
        }
    }

    componentWillMount() {
        this.getUnsubmittedOrder();
    }

    async getUnsubmittedOrder() {
        let orders = await OrderService.getOrders();
        let order = orders.find((order) =>
            order.submission === null && order.cancellation === null
        );
        if (order) {
            this.setState({
                order: order,
            });
        }
    }

    onCheckout = async () => {
        OrderService.submitOrder(this.state.order._id).then((order) => {
            message.success("Bestellung erfolgreich");
            this.props.history.push(`/account`);
        }).catch((err) => message.info("Bestellung nicht abgeschickt."));
    };

    getOrderOverviewTableColumns() {
        return [
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
        ];
    }

    getOrderTableData() {
        let data = [];
        if (this.state.order) {
            let order = this.state.order;
            let positions = this.state.order.positions;
            let orderValue = OrderService.getPositionsValue(positions);
            const price = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(orderValue);
            let entry = {
                key: order._id,
                order: order._id,
                positions: positions.length,
                price: price,
                rawPrice: orderValue,
            };
            data.push(entry);
        }
        return data;
    }

    renderPositionRecords(record) {
        return (
            <Table columns={AccountService.getPositionSubTableColumns()}
                   dataSource={this.getSubTableData(record)}
                   pagination={false}
                   className="padding--md">
            </Table>
        )
    }


    getSubTableData(record) {
        if (this.state.order) {
            let data = [];
            let positions = this.state.order.positions;
            positions.forEach((p) => {
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

    render() {
        return (
            <Col>
                <Row className="padding--lg"
                     justify="left"
                     align="middle">
                    <Text className="account-view__meinFairbundled">
                        Mein Warenkorb
                    </Text>
                </Row>
                <Row className="padding-horizontal--lg"
                     justify="space-around">
                    <Table columns={this.getOrderOverviewTableColumns()}
                           dataSource={this.getOrderTableData()}
                           expandable={{
                               expandedRowRender: record => this.renderPositionRecords(record),
                           }}>
                    </Table>
                </Row>
                <Row className="padding-horizontal--lg padding-vertical--md">
                    <Button type="primary"
                            onClick={this.onCheckout}
                            disabled={this.state.order === null}>
                        Jetzt Bestellen
                    </Button>
                </Row>
            </Col>
        );
    }
}

export default withRouter(CheckoutView);
