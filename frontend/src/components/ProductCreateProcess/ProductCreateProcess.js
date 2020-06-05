import React from 'react';
import {Button, Col, message, Row, Steps} from 'antd';
import ProductCategorySelection from "./ProductCategorySelection";
import ProductDescriptionInput from "./ProductDescriptionInput";
import ProductPriceLevelInput from "./ProductPriceLevelInput";
import ProductImageUpload from "./ProductImageUpload";
import ProductPreviewModal from "./ProductPreviewModal";
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
                return (<ProductCategorySelection categories={this.props.categories} product={this.props.product}
                                                  onFinish={this.props.onFinish}/>);
            case 'description':
                return (<ProductDescriptionInput product={this.props.product}
                                                 onFinish={this.props.onFinish}/>);
            case 'price':
                return (<ProductPriceLevelInput product={this.props.product}
                                                onFinish={this.props.onFinish}/>);
            case 'certificate':
                return (<ProductCertificateSelection categories={this.props.categories} certificates={this.props.certificates} product={this.props.product}
                                                     onFinish={this.props.onFinish}/>)
            case 'image':
                return (<ProductImageUpload product={this.props.product}
                                            onFinish={this.props.onFinish}/>);
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
                <Row className="product-create-process__steps-content margin-vertical--md padding--md"
                     justify="center"
                     align="middle">
                    {this.getCurrentContent(steps[current].content)}
                </Row>
                <Row justify="center" className="product-create-process__navigation margin-vertical--md">
                    {current < steps.length - 1 && (
                        <Col>
                            <Button type="primary" onClick={() => this.next()}>
                                Weiter
                            </Button>
                        </Col>
                    )}
                    {current === steps.length - 1 && (
                        <Col>
                            <Col>
                                <Button type="primary" onClick={this.props.onPreview}>
                                    Vorschau
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={this.props.onPublish}>
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

