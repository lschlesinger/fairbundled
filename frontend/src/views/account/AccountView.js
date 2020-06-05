import React from 'react';
import AuthService from "../../services/AuthService";
import {Button, Col, Row} from "antd";
import {LogoutOutlined, NotificationOutlined, SmileOutlined} from '@ant-design/icons';
import {MunicipalityAccountView} from "./municipality-account/MunicipalityAccountView";
import {SupplierAccountView} from "./supplier-account/SupplierAccountView";
import {Link} from "react-router-dom";

export class AccountView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            municipality: "",
            supplier: "",
            name: null,
        }
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
            name: user.supplier ? user.supplier.name : user.municipality.name
        })
    }


    renderUserTypeSpecificView() {
        if (AuthService.isAuthenticatedMunicipality()) {
            return (<MunicipalityAccountView user={this.state.user}/>);
        } else if (AuthService.isAuthenticatedSupplier()) {
            return (<SupplierAccountView user={this.state.user}/>)
        }
    }

    renderUserTypeSpecificButton() {
        if (AuthService.isAuthenticatedMunicipality()) {
            return (
                <Link to="/">
                    <Button type="primary"
                            icon={<SmileOutlined/>}>
                        Jetzt Kaufen
                    </Button>
                </Link>
            )
        } else if (AuthService.isAuthenticatedSupplier()) {
            return (
                <Link to="/product/create">
                    <Button type="primary"
                            icon={<NotificationOutlined/>}>
                        Jetzt Verkaufen
                    </Button>
                </Link>
            )
        }
    }


    render() {
        return (
            <div>
                <Row className="padding--md"
                     justify="space-around"
                     align="middle">
                    <Col>
                        {`Mein Fairbundled: ${this.state.name}`}
                    </Col>
                    <Col>
                        {this.renderUserTypeSpecificButton()}
                    </Col>
                    <Col>
                        <Button type="primary"
                                icon={<LogoutOutlined/>}
                                onClick={AuthService.logout}>
                            Logout
                        </Button>
                    </Col>
                </Row>

                {this.renderUserTypeSpecificView()}

            </div>
        );
    }
}
