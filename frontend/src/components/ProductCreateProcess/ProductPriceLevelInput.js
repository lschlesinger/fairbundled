import React from 'react';
import {Button, Col, Form, Input, Row, Select, Space} from 'antd';
import {InfoCircleOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

export default class ProductPriceLevelInput extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            unit: null
        };
    }

    onUnitChange = value => {
        this.setState({
            unit: value
        });
    };

    render() {
        return (
            <div>
                <Row justify="space-around" align="middle">
                    <h3 className="margin-vertical--md">Wählen Sie beliebig viele Preisstufen und ermöglichen Sie
                        Fairbundles für Ihr Produkt</h3>
                    <p><InfoCircleOutlined/> Geben Sie je Stufe den Preis je angebener Produkteinheit und einer mindestens
                        abzunehmenden Menge an.</p>
                </Row>
                <Form.List
                    label="Preisstufen"
                    rules={[{required: true}]}
                    name="priceLevel">
                    {(fields, {add, remove}) => {
                        return (
                            <Row justify="center">
                                <Col span={16}>
                                    <Row justify="space-around" align="middle">
                                        {fields.map(field => (
                                            <Space
                                                key={field.key}
                                                align="baseline">
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'unitPrice']}
                                                    fieldKey={[field.fieldKey, 'unitPrice']}
                                                    rules={[{required: true, message: 'Fehlender Preis je Einheit'}]}
                                                >
                                                    <Input placeholder="Grundpreis"
                                                           suffix={"€"}/>
                                                </Form.Item>
                                                <p>je</p>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'unit']}
                                                    fieldKey={[field.fieldKey, 'unit']}
                                                    rules={[{required: true, message: 'Fehlende Einheit'}]}
                                                >
                                                    <Select
                                                        placeholder="Produkteinheit"
                                                        onChange={this.onUnitChange}
                                                    >
                                                        <Option value="Stück">Stück</Option>
                                                        <Option value="m&sup2;">m<sup>2</sup></Option>
                                                        <Option value="m&sup3;">m<sup>3</sup></Option>
                                                        <Option value="Liter">Liter</Option>
                                                        <Option value="Kilogramm">Kilogramm</Option>
                                                        <Option value="Gramm">Gramm</Option>
                                                        <Option value="Packeinheit">Packeinheit</Option>
                                                    </Select>
                                                </Form.Item>
                                                <p>ab</p>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'minQty']}
                                                    dependencies={['unit']}
                                                    fieldKey={[field.fieldKey, 'minQty']}
                                                    rules={[{required: true, message: 'Fehlende Mindesteinheiten'}]}
                                                >
                                                    <Input placeholder="Mindesteinheiten"
                                                           suffix={this.state.unit}/>
                                                </Form.Item>

                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            </Space>
                                        ))}
                                    </Row>
                                    <Row justify="space-around" align="middle">
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                block
                                            >
                                                <PlusOutlined/> Preisstufe hinzufügen
                                            </Button>
                                        </Form.Item>
                                    </Row>
                                </Col>
                            </Row>
                        );
                    }}
                </Form.List>
            </div>
        );
    };
};
