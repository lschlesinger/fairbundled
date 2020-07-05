import {Divider, Form, Input} from 'antd';
import "./RegisterForm.less";

import React from "react";

export default class RegisterNewSupplier extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Divider orientation="left">Anbieter Daten</Divider>
                <Form.Item
                    name={["supplier", "name"]}
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie den Namen des Anbieters ein!',
                        }
                    ]}
                >
                    <Input placeholder="Name des Anbieters"/>
                </Form.Item>
                <Form.Item
                    name={["supplier", "billingAddress"]}
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie eine Rechnungsadresse ein!',
                        }
                    ]}
                >
                    <Input
                        placeholder="Rechnungsadresse"
                    />
                </Form.Item>
                <Form.Item
                    name={["supplier", "bankAccount"]}
                >
                    <Input
                        placeholder="IBAN"
                    />
                </Form.Item>
            </div>
        )
    }
}
