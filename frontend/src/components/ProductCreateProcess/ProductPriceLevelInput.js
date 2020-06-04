import React from 'react';
import {Button, Form, Input, Space} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import './ProductPriceLevelInput.less';

const onFinish = values => {
    console.log('Received values of form:', values)
};


export default class ProductPriceLevelInput extends React.Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <Form className="product-create-process__price-level-input-form"
                  name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.List
                    name="priceLevel">
                    {(fields, {add, remove}) => {
                        return (
                            <div>
                                {fields.map(field => (
                                    <Space key={field.key} style={{display: 'flex', marginBottom: 8}} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'price']}
                                            fieldKey={[field.fieldKey, 'price']}
                                            rules={[{required: true, message: 'Fehlender Preis je Einheit'}]}
                                        >
                                            <Input placeholder="Preis (€) je Einheit"/>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'units']}
                                            fieldKey={[field.fieldKey, 'units']}
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
                            </div>
                        );
                    }}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Hinterlegen
                    </Button>
                </Form.Item>
            </Form>
        );
    };
};
