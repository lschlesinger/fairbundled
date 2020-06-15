import React from 'react';
import {Form, Input, InputNumber, Row} from 'antd';
import QuillTextArea from "./QuillTextArea";


export default class ProductInformationInput extends React.Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div style={{textAlign: "left"}}>
                <Row justify="space-around" align="middle">
                    <h3 className="margin-vertical--md">Beschreiben Sie Ihr neues Produkt</h3>
                </Row>
                <Form.Item name="name"
                           label="Name"
                           rules={[{required: true}]}
                           labelAlign="right"
                           labelCol={{span: 5, offset: 0}}>
                    <Input/>
                </Form.Item>
                <Form.Item name="ean"
                           label="EAN"
                           labelAlign="right"
                           labelCol={{span: 5, offset: 0}}>
                    <Input/>
                </Form.Item>
                <Form.Item name="deliveryDays"
                           label="Lieferbar in (Tagen)"
                           labelAlign="right"
                           labelCol={{span: 5, offset: 0}}
                           rules={[{type: 'number', min: 0, max: 365}, {required: true}]}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item name="description"
                           label="Beschreibung"
                           labelAlign="right"
                           labelCol={{span: 5, offset: 0}}>
                    <QuillTextArea
                        product={this.props.product}
                        onChange={this.props.onChange}/>
                </Form.Item>
            </div>
        );
    }
}
