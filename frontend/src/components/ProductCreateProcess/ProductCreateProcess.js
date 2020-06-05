import React from 'react';
import {Button, Col, message, Row, Steps} from 'antd';
import ProductCategorySelection from "./ProductCategorySelection";
import ProductDescriptionInput from "./ProductDescriptionInput";
import ProductPriceLevelInput from "./ProductPriceLevelInput";
import ProductImageUpload from "./ProductImageUpload";
import './ProductCreateProcess.less'


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
                return (<ProductCategorySelection categories={this.props.categories} product={this.props.product} onFinish={this.props.onFinish}/>);
            case 'description':
                return (<ProductDescriptionInput categories={this.props.categories} product={this.props.product} onFinish={this.props.onFinish}/>);
            case 'price':
                return (<ProductPriceLevelInput categories={this.props.categories} product={this.props.product} onFinish={this.props.onFinish}/>);
            case 'image':
                return (<ProductImageUpload categories={this.props.categories} product={this.props.product} onFinish={this.props.onFinish}/>);
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

    renderPreview() {
        <ProductPreviewModelView product={}/>
    }

    render() {
        const {current} = this.state;
        return (
            <Col className="padding--md">
                Test Produkt:
                <p>{this.props.product.supplier}</p>
                <p>{this.props.product.categories}</p>
                <p>{this.props.product.name}</p>
                <p>{this.props.product.ean}</p>
                <Row>
                    <Steps current={current} className="margin-vertical--md">
                        {steps.map(item => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                </Row>
                <Row className="product-create-process__steps-content margin-vertical--md padding--md"
                     justify="center"
                     align="middle">
                    {this.getCurrentContent(steps[current].content)}
                </Row>
                <Row justify="center" className="product-create-process__navigation margin-vertical--md">
                    {current < steps.length - 1 && (
                            <Col>
                        <Button type="primary" onClick={() => this.next()} >
                            Weiter
                        </Button>
                            </Col>
                    )}
                    {current === steps.length - 1 && (
                        <Col>
                            <Col>
                                <Button type="primary" onClick={() => renderPreview()}>
                                    Vorschau
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                    Produkt veröffentlichen
                                </Button>
                            </Col>
                        </Col>

                    )}
                    {current > 0 && (
                        <Button style={{margin: '0 8px'}} onClick={() => this.prev()}>
                            Zurück
                        </Button>
                    )}
                </Row>

            </Col>
        );
    }
}

