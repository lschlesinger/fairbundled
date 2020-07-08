import React from "react";
import "./LandingCategories.less";
import {Button, Col, Row} from "antd";
import {Link} from "react-router-dom";


const catExplanation = ['Bestens ausgestattet - für jeden Job', 'Noch nie etwas von Green IT gehört?', 'Sorgen Sie vor in Zeiten von Corona', ''

];

export default class LandingCategories extends React.Component {

    constructor(props) {
        super(props);
    }


    getCategoryCard(cat, index) {
        return (
            <Col span={7} className="card" key={cat._id}>
                <Row className="content">
                    <h2 className="title">{cat.name}</h2>
                    <Row justify="start">
                        <p className="copy">{catExplanation[index]}</p>
                    </Row>
                    <Link to={`/product?category=${cat._id}`}>
                        <Button className="btn" type="primary" >Jetzt suchen</Button>
                    </Link>

                </Row>
            </Col>
        )
    }

    render() {

        return (
            <Row justify="space-around" className="margin-vertical--md topCategory__content">
                {this.props.topCategories.map((cat, index) => this.getCategoryCard(cat, index))}
            </Row>
        )
    }
}
