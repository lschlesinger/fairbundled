import React from "react";
import {Button, Card, Col, Row, Typography} from "antd";
import "./AccountContent.less";
import {EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const {Text} = Typography;

export default class MyEntityData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entity: this.props.entity,
            user: this.props.user,
        };
    }

    getAdditionalUser(user) {
        if (user._id !== this.state.user.id) {
            return (
                <Text className="my-entity-data__text" key={user._id}>
                    {user.email}
                </Text>
            );
        }
    }

    renderEntitySpecificRows() {
        if (this.state.entity.bankAccount) {
            //render supplier row
            return (
                <Row className="padding-top--md padding-bottom--sm">
                    <Col span={12}>
                        <Text className="my-entity-data__text" strong>
                            Bankverbindung:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-entity-data__text">
                            {this.state.entity.bankAccount}
                        </Text>
                    </Col>
                </Row>);
        }
        if (this.state.entity.shippingAddress) {
            //render municipality row
            return (
                <Row className="padding-top--md padding-bottom--sm">
                    <Col span={12}>
                        <Text className="my-entity-data__text" strong>
                            Versandadresse:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-entity-data__text">
                            {this.state.entity.shippingAddress}
                        </Text>
                    </Col>
                </Row>);
        }
        if (this.state.entity.state) {
            return (
                <Row className="padding-top--md padding-bottom--sm">
                    <Col span={12}>
                        <Text className="my-entity-data__text" strong>
                            Bundesland:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-entity-data__text">
                            {this.state.entity.state}
                        </Text>
                    </Col>
                </Row>);
        }
    }


    render() {
        return (
            <Card
                title="Account Daten"
                extra={
                    <Link to="/user/edit">
                        <Button size="large" type="link" icon={<EditOutlined/>}/>
                    </Link>}>
                <Row>
                    <Col span={12}>
                        <Text className="my-entity-data__text" strong>
                            Account Name:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-entity-data__text">
                            {this.state.entity.name}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--md">
                    <Col span={12}>
                        <Text className="my-entity-data__text" strong>
                            Meine E-Mail Adresse:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-entity-data__text">
                            {this.state.user.email}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--md">
                    <Col span={12}>
                        <Text className="my-entity-data__text" strong>
                            Weitere E-Mail Adressen:
                        </Text>
                    </Col>
                    <Col span={12}>
                        {this.state.entity.user.map((u) =>
                            this.getAdditionalUser(u)
                        )}
                    </Col>
                </Row>
                <Row className="padding-top--md">
                    <Col span={12}>
                        <Text className="my-entity-data__text" strong>
                            Rechnungsadresse:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-entity-data__text">
                            {this.state.entity.billingAddress}
                        </Text>
                    </Col>
                </Row>
                {this.renderEntitySpecificRows()}
            </Card>
        );
    }
}
