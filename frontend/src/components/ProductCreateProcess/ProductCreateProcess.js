import React from 'react';
import {Button, Col, Form, Row, Steps} from 'antd';
import ProductCategorySelection from "./ProductCategorySelection";
import ProductDescriptionInput from "./ProductDescriptionInput";
import ProductPriceLevelInput from "./ProductPriceLevelInput";
import ProductImageUpload from "./ProductImageUpload";
import './ProductCreateProcess.less'
import ProductCertificateSelection from "./ProductCertificateSelection";


const {Step} = Steps;

const steps = [
    {
        title: 'Kategorie auswählen',
        content: 'category',
    },
    {
        title: 'Produkt beschreiben',
        content: 'description',
    },
    {
        title: 'Stückpreis festlegen',
        content: 'price',
    },
    {
        title: 'Produktsiegel auswählen',
        content: 'certificate',
    },
    {
        title: 'Bilder hinzufügen',
        content: 'image',
    },
];

export default class ProductCreateProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    getCurrentContent(key) {
        switch (key) {
            case 'category':
                return (<ProductCategorySelection categories={this.props.categories} product={this.props.product}/>);
            case 'description':
                return (<ProductDescriptionInput product={this.props.product}/>);
            case 'price':
                return (<ProductPriceLevelInput product={this.props.product}/>);
            case 'certificate':
                return (<ProductCertificateSelection categories={this.props.categories}
                                                     certificates={this.props.certificates}
                                                     product={this.props.product}/>)
            case 'image':
                return (<ProductImageUpload product={this.props.product}/>);
        }
    }


    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }


    render() {
        const {current} = this.state;
        return (
            <Col className="padding--md">
                <Row>
                    <Steps current={current} className="margin-vertical--md">
                        {steps.map(item => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                </Row>
                <Row className="product-create-process__steps-wrapper margin-vertical--md padding--md"
                     justify="center"
                     align="middle">
                    <Form className="product-create-process__step-form"
                          onValuesChange={(changedValues, values) => this.props.onFinish(values)}>
                        {this.getCurrentContent(steps[current].content)}
                    </Form>
                </Row>

                <Row justify="left" className="product-create-process__navigation margin-vertical--md">
                    {current > 0 && (
                        <Button className="margin-horizontal--sm" onClick={() => this.prev()}>
                            Zurück
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Col>
                            <Button
                                onClick={() => this.next()}>
                                Weiter
                            </Button>
                        </Col>
                    )}
                </Row>
                {current === steps.length - 1 && (
                    <Row justify="center">
                        <Col>
                            <Button className="margin-horizontal--sm" type="primary" onClick={this.props.onPreview}>
                                Vorschau
                            </Button>
                            <Button className="margin-horizontal--sm" type="primary" onClick={this.props.onPublish}>
                                Produkt veröffentlichen
                            </Button>
                        </Col>
                    </Row>
                )}
            </Col>
        );
    }
}

