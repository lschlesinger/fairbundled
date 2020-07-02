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

    getTotalPrice() {
        if (this.state.order) {
            let orderValue = OrderService.getPositionsValue(this.state.order.positions);
            let totalPrice = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(orderValue);
            return (`Gesamtpreis: ${totalPrice}`);
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
                    <Table columns={AccountService.getPositionSubTableColumns()}
                           dataSource={this.getSubTableData()}
                           pagination={false}
                           footer={() => this.getTotalPrice()}>
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
