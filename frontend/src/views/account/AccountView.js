import React from "react";
import AuthService from "../../services/AuthService";
import {Layout, Row, Typography} from "antd";
import {MunicipalityAccountView} from "./municipality-account/MunicipalityAccountView";
import {SupplierAccountView} from "./supplier-account/SupplierAccountView";
import "./AccountView.less";

const {Text} = Typography;
const {Content} = Layout;

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
            return (
                <MunicipalityAccountView
                    user={this.state.user}
                    municipality={this.state.municipality}/>
            );
        } else if (AuthService.isAuthenticatedSupplier()) {
            return (
                <SupplierAccountView
                    user={this.state.user}
                    supplier={this.state.supplier}
                />
            );
        }
    }

    render() {
        return (
            <Layout>
                <Content>
                    <Row
                        className="padding--lg"
                        justify="left"
                        align="middle"
                    >
                        <Text className="account-view__meinFairbundled">
                            Mein Fairbundled:{" "}
                        </Text>
                        <Text className="account-view__entityName">
                            {this.state.entityName}
                        </Text>
                    </Row>
                    {this.renderUserTypeSpecificView()}
                </Content>
            </Layout>
        );
    }
}
