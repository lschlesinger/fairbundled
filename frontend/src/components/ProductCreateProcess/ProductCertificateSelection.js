import React from 'react';
import {Avatar, Checkbox, Col, Form, Row} from 'antd';

export default class ProductCertificateSelection extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    getCheckboxes(cert) {
        //only show certificate checkbox if at least on of the previously product categories matches
        // the mapped categories for the certificate
        if (cert.categories.some(i => this.props.product.categories.indexOf(i) >= 0)) {
            return (
                <Col span="12" key={cert._id}>
                    <Checkbox value={cert}>
                        <Avatar shape="square"
                                size="medium"
                                src={cert.logo}/>
                        <span className="padding--sm">{cert.name}</span>
                    </Checkbox>
                </Col>);
        }
    }

    render() {
        return (
            <div>
                <h3 className="margin-vertical--md">Wählen Sie die Nachhaltigkeitssiegel für Ihr Produkt</h3>
                <Form.Item name="certificates"
                >
                    <Checkbox.Group style={{width: '100%'}}>
                        <Row style={{textAlign: 'left'}} gutter={[0, 6]}>
                            {this.props.certificates.map((c) => this.getCheckboxes(c))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
            </div>
        );
    }
}
