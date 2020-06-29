import React from "react";
import {Button, Card, Col, Row, Typography} from "antd";
import "./MySupplierData.less";
import {EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const {Text} = Typography;

export default class MySupplierData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: this.props.supplier,
            user: this.props.user,
        };
    }

    getAdditionalUser(user) {
        if (user._id !== this.state.user.id) {
            return (
                <Text className="my-supplier-data__text" key={user._id}>
                    {user.email}
                </Text>
            );
        }
    }

    render() {
        return (
            <Card
                title="Anbieter Daten"
                className="padding-horizontal--sm"
                extra={
                    <Link to="/user/edit">
                        <Button size="large" type="link" icon={<EditOutlined/>}/>
                    </Link>}>
                <Row gutter={8}>
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Anbietername:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {this.state.supplier.name}
                        </Text>
                    </Col>
                </Row>
                <Row gutter={8} className="padding-top--md">
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Meine E-Mail Adresse:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {this.state.user.email}
                        </Text>
                    </Col>
                </Row>
                <Row gutter={8} className="padding-top--md">
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Weitere E-Mail Adressen:
                        </Text>
                    </Col>
                    <Col span={12}>
                        {this.state.supplier.user.map((u) =>
                            this.getAdditionalUser(u)
                        )}
                    </Col>
                </Row>
                <Row className="padding-top--md">
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Rechnungsadresse:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {this.state.supplier.billingAddress}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--md padding-bottom--sm">
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Bankverbindung:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {this.state.supplier.bankAccount}
                        </Text>
                    </Col>
                </Row>
            </Card>
        );
    }
}
