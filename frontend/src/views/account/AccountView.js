import React from "react";
import AuthService from "../../services/AuthService";
import { Button, Col, Row, Typography, Space } from "antd";
import {
    LogoutOutlined,
    NotificationOutlined,
    SmileOutlined,
} from "@ant-design/icons";
import { MunicipalityAccountView } from "./municipality-account/MunicipalityAccountView";
import { SupplierAccountView } from "./supplier-account/SupplierAccountView";
import { Link } from "react-router-dom";
import "./AccountView.less";

const { Title, Text } = Typography;

export class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            municipality: "",
            supplier: "",
            entityName: null,
        };
    }

    componentWillMount() {
        this.getUserAndEntity();
    }

    getUserAndEntity() {
        let user = AuthService.getCurrentUser();

        this.setState({
            user: user,
            municipality: user.municipality,
            supplier: user.supplier,
            entityName: AuthService.getEntityName(),
        });
    }

    renderUserTypeSpecificView() {
        if (AuthService.isAuthenticatedMunicipality()) {
            return <MunicipalityAccountView user={this.state.user} />;
        } else if (AuthService.isAuthenticatedSupplier()) {
            return <SupplierAccountView user={this.state.user} />;
        }
    }

    renderUserTypeSpecificButton() {
        if (AuthService.isAuthenticatedMunicipality()) {
            return (
                <Link to="/">
                    <Button type="primary" icon={<SmileOutlined />}>
                        Jetzt Kaufen
                    </Button>
                </Link>
            );
        } else if (AuthService.isAuthenticatedSupplier()) {
            return (
                <Link to="/product/create">
                    <Button type="primary" icon={<NotificationOutlined />}>
                        Jetzt Verkaufen
                    </Button>
                </Link>
            );
        }
    }

    render() {
        return (
            <div>
                <Row
                    className="padding--md"
                    justify="space-around"
                    align="middle"
                >
                    <Col span={8}>
                        <Row align="middle" justify="center">
                            <Text class="account-view__meinFairbundled">
                                Mein Fairbundled:{" "}
                            </Text>
                            <Text class="account-view__entityName">
                                {this.state.entityName}
                            </Text>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row align="middle" justify="center">
                            {this.renderUserTypeSpecificButton()}
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row align="middle" justify="center">
                            <Button
                                type="primary"
                                icon={<LogoutOutlined />}
                                onClick={AuthService.logout}
                            >
                                Logout
                            </Button>
                        </Row>
                    </Col>
                </Row>

                {this.renderUserTypeSpecificView()}
            </div>
        );
    }
}
