import React from "react";
import { Card, Typography, Row, Col } from "antd";

const { Text } = Typography;

export default class MySupplierData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: this.props.supplier,
        };
    }

    render() {
        return (
            <Card
                title="Gebührenübersicht"
                className="padding-horizontal--sm"
            ></Card>
        );
    }
}
