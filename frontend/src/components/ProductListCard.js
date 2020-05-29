import React from "react";
import {Card, Col, Row} from "antd";

const gridStyle = {
    width: '40%',
    textAlign: 'center',
};

export default class CategoryHeaderMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    getCardItem(product){
        return(
            <Col span={8}>
                <Card title={product.name}
                      bordered={true}
                      hoverable>
                    {product.description}
                </Card>
            </Col>
        );
    }

    render(){
        return (
            <div className="__ProductListViewRow">
                <Row gutter={16}>
                    {this.props.products.map((p) => this.getCardItem(p))}
                </Row>
            </div>
            )

    }
}

