import React from 'react';
import {Button, Col, Form, Input, Row, Space} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';


export default class ProductPriceLevelInput extends React.Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div>
                <Row justify="space-around" align="middle">
                    <h3 className="margin-vertical--md">Wählen Sie beliebig viele Preisstufen</h3>
                </Row>
                <Form.List
                    name="priceLevel">
                    {(fields, {add, remove}) => {
                        return (
                            <Col>
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
                                                <Input placeholder="Preis (€) je Einheit"/>
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'minQty']}
                                                fieldKey={[field.fieldKey, 'minQty']}
                                                rules={[{required: true, message: 'Fehlende Mindesmenge'}]}
                                            >
                                                <Input placeholder="Mindestmenge"/>
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
                        );
                    }}
                </Form.List>
            </div>
        );
    };
};
