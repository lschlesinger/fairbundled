import React from 'react';
import {Card, Col, Row, Tabs, Typography} from "antd";

const {Text, Title} = Typography;
const {TabPane} = Tabs;

export default class ActivityOverview extends React.Component {

    constructor(props) {
        super(props);
    }

    renderCustomizedOverview(key) {
        return (
            <Row className="margin--sm order-overview__kpis" gutter={8}>
                <Col span={7}>
                    <Row className="padding-top--sm" justify="center">
                        <Text className="order-overview__number" strong>
                            {/*{this.props.municipality.orderedProducts}*/}
                            1
                        </Text>
                    </Row>
                    <Row
                        justify="center"
                        className="padding-top--xs padding-bottom--sm"
                    >
                        <Text strong>Produkte</Text>
                    </Row>
                </Col>
                <Col span={7}>
                    <Row className="padding-top--sm" justify="center">
                        <Text className="order-overview__number" strong>
                            4
                            {/*{this.props.municipality.submittedOrders}*/}
                        </Text>
                    </Row>
                    <Row
                        justify="center"
                        className="padding-top--xs padding-bottom--sm"
                    >
                        <Text strong>Bestellungen</Text>
                    </Row>
                </Col>
                <Col span={10}>
                    <Row className="padding-top--sm" justify="center">
                        <Text className="order-overview__number" strong>
                            {/*{new Intl.NumberFormat("de-DE", {*/}
                            {/*    style: "currency",*/}
                            {/*    currency: "EUR",*/}
                            {/*}).format(this.props.municipality.spendings)}*/}
                            5
                        </Text>
                    </Row>
                    <Row
                        justify="center"
                        className="padding-top--xs padding-bottom--sm"
                    >
                        <Text strong>Gesamtausgaben</Text>
                    </Row>
                </Col>
            </Row>);
    }

    render() {
        return (
            <Card title="Meine Aktivitäten">
                {/* Bestellungen (normale und Fairbundle) der letzten 30 oder 60 Tage */}
                <Row className="margin-bottom--sm">
                    <Title className="padding-right--sm" level={4}>
                        Übersicht
                    </Title>
                </Row>
                <Tabs defaultActiveKey="1" onChange={this.renderCustomizedOverview}>
                    <TabPane tab="Gesamt" key="all">
                        {this.renderCustomizedOverview()}
                    </TabPane>
                    <TabPane tab="Fairbundle" key="fairbundle">
                        {this.renderCustomizedOverview()}
                    </TabPane>
                    <TabPane tab="Direktbestellung" key="single">
                        {this.renderCustomizedOverview()}
                    </TabPane>
                </Tabs>
                <Row className="margin-bottom--sm">
                    <Title className="padding-right--sm" level={4}>
                        Laufende Fairbundle Bestellungen
                    </Title>
                </Row>
                <Row>
                    Hier Tabelle
                </Row>
                <Row className="margin-bottom--sm">
                    <Title className="padding-right--sm" level={4}>
                        Abgeschlossene Bestellungen
                    </Title>
                </Row>
                <Row>
                    Hier Tabelle
                </Row>
            </Card>
        );
    }
}
