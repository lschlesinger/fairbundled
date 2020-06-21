import React from "react";
import { Card, Typography, Row, Col } from "antd";

const { Text } = Typography;

export default class MySupplierData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: null,
        };
    }

    render() {
        return (
            <Card title="Verkaufsübersicht" className="padding-horizontal--sm">
                <p>{this.props.supplier.activeProducts}</p>
                {console.log(this.props.supplier)}
            </Card>
        );
    }
}
