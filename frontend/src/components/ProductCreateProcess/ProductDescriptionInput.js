import React from 'react';
import "./ProductDescriptionInput.less"
import {Button, Form, Input, InputNumber} from 'antd';

const validateMessages = {
    required: '${label} Pflichtangabe',
    types: {
        number: '${label} Keine gültige Nummer',
    },
    number: {
        range: '${label} muss zwischen ${min} and ${max} liegen',
    },
};

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};


export default class ProductDescriptionInput extends React.Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <Form {...layout} onFinish={this.props.onFinish} className="product-create-process__description-input"
                  validateMessages={validateMessages}>
                <Form.Item name="name" label="Name" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="ean" label="EAN">
                    <Input/>
                </Form.Item>
                <Form.Item name="deliverDays" label="Lieferbar in (Tagen)"
                           rules={[{type: 'number', min: 0, max: 99}]}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item name="description" label="Beschreibung">
                    <Input.TextArea autoSize={{minRows: 3, maxRows: 8}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form__submit-button">
                        Speichern
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
