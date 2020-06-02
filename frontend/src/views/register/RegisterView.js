import React from 'react';
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import {message, Row} from "antd";
import AuthService from "../../services/AuthService";
import {withRouter} from "react-router-dom";
import MunicipalityService from "../../services/MunicipalityService";
import SupplierService from "../../services/SupplierService";


class RegisterView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            municipalities: [],
            suppliers: [],
        };
    }

    componentWillMount() {
        this.getMunicipalities();
        this.getSuppliers();
    }


    async getMunicipalities() {
        try {
            this.setState({
                municipalities: await MunicipalityService.getMunicipalities()
            });
        } catch (e) {
            message.error("Error fetching municipalities.");
        }
    }

    async getSuppliers() {
        try {
            this.setState({
                suppliers: await SupplierService.getSuppliers()
            });
        } catch (e) {
            message.error("Error fetching suppliers.");
        }
    }

    onFinish(values) {
        console.log(values);
        const {email, password, municipality, supplier} = values;
        AuthService.register(email, password, municipality, supplier)
            .then(() => {
                this.props.history.push('/login');
                message.success(`Willkommen an Board!`);
            })
            .catch((err) => {
                message.error('Registrierung fehlgeschlagen!');
            });
    }

    render() {
        return (
            <Row className="padding--md"
                 justify="center"
                 align="middle">
                <RegisterForm onFinish={this.onFinish.bind(this)}
                              municipalities={this.state.municipalities}
                              suppliers={this.state.suppliers}/>
            </Row>
        );
    }
}

export default withRouter(RegisterView);

