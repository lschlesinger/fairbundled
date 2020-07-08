import React from "react";
import {SmileTwoTone} from '@ant-design/icons';
import {Col, Row} from "antd";
import Principle from "../../assets/principle.png";
import "./FairbundlePrinciple.less";

const principles = [{
    buzzword: "Faire Preise",
    explanation: "Das Fairbundle-Prinzip ermöglicht größere Bestellmengen zu günstigeren Preisen, sodass Käufer und Verkäufer profitieren.\n" +
        "Treten Sie einem Fairbundle bei oder erstellen Sie ein neues Fairbundle, um\n" +
        "mit anderen Gemeinden zu bestellen."
}, {
    buzzword: "Für Kommunen",
    explanation: "Der Prozess der kommunalen Beschaffung ist kompliziert und häufig umständlich - das\n" +
        "wissen wir. Fairbundled bietet endlich die Möglichkeit\n" +
        "alles über einen zentralen Marktplatz einzukaufen, so schnell und einfach wie nie zuvor."
}, {
    buzzword: "Nachhaltig",
    explanation: "Wir arbeiten mit\n" +
        "zertifizierten Unternehmen, die hohe Nachhaltigkeits Standards erfüllen. Filtern Sie einfach bei der Suche nach\n" +
        "den Nachhaltigkeits-Zertifikaten, die Ihre Richtlinien zur nachhaltigen Beschaffung vorgeben."
}
];


export default class FairbundlePrinciple extends React.Component {

    constructor(props) {
        super(props);
    }

    getText(p) {
        return (
            <Col
                span={8}
                align="middle">
                <Row justify="center" className="padding--sm">
                    <SmileTwoTone
                        twoToneColor="#78A262"
                        style={{fontSize: '32px'}}
                    />
                </Row>
                <Row justify="center">
                    <h4>{p.buzzword}</h4>
                </Row>
                <Row justify="center" className="fairbundle-principle__explanation-text">
                    {p.explanation}
                </Row>
            </Col>
        )
    }


    render() {

        return (
            <Row gutter={16} className="padding-top--md">
                {principles.map((p) => this.getText(p))}
                <Row justify="center" className="padding-top--xl fairbundle-principle__image-div">
                    <img src={Principle} width={1000} alt="Prinzip"/>
                </Row>
            </Row>
        )
    }
}
