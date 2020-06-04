import React from 'react';
import "./ProductDescriptionInput.less"
import {Form, Input, InputNumber} from 'antd';

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
            <Form {...layout} className="product-create-process__description-input"
                  name="nest-messages" validateMessages={validateMessages}>
                <Form.Item name={['product', 'name']} label="Name" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name={['product', 'ean']} label="EAN">
                    <Input/>
                </Form.Item>
                <Form.Item name={['product', 'delivery']} label="Lieferbar in (Tagen)"
                           rules={[{type: 'number', min: 0, max: 99}]}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item name={['product', 'description']} label="Beschreibung">
                    <Input.TextArea autoSize={{minRows: 3, maxRows: 8}}/>
                </Form.Item>
            </Form>
        );
    }
}
