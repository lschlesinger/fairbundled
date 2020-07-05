import {Divider, Form, Input} from 'antd';
import "./RegisterForm.less";

import React from "react";

export default class RegisterNewMunicipality extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Divider orientation="left">Gemeinde Daten</Divider>
                <Form.Item
                    name={["municipality", "name"]}
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie den Namen der Gemeide ein!',
                        }
                    ]}
                >
                    <Input placeholder="Name der Gemeinde"/>
                </Form.Item>
                <Form.Item
                    name={["municipality", "state"]}
                >
                    <Input
                        placeholder="Bundesland"
                    />
                </Form.Item>
                <Form.Item
                    name={["municipality", "billingAddress"]}
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
                    name={["municipality", "shippingAddress"]}
                >
                    <Input
                        placeholder="Lieferadresse"
                    />
                </Form.Item>
            </div>
        )
    }
}
