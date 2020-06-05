import React from 'react';
import {Button, Checkbox, Col, Form, Row} from 'antd';

export default class ProductCertificateSelection extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: undefined,
        }
    }


    onChange = value => {
        this.setState({value});
    };

    getCheckboxes(cert) {
        //only show certificate checkbox if at least on of the previously product categories matches
        // the mapped categories for the certificate
        if (cert.categories.some(i => this.props.product.categories.indexOf(i) >= 0)) {
            return (
                <Checkbox value={cert._id}>
                    {cert.name}
                </Checkbox>);
        }
    }


    render() {
        return (
            <Form onFinish={this.props.onFinish}>
                <Form.Item name="certificates"
                           className="product-create-process__certificate-multiple-select padding--md"
                           value={this.state.value}
                >
                    <Checkbox.Group onChange={this.onChange}>
                        <Row>
                            <Col span={8}>
                                {this.props.certificates.map((c) => this.getCheckboxes(c))}
                            </Col>
                        </Row>
                    </Checkbox.Group>
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
