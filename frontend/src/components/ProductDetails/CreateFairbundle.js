import React from "react";
import moment from "moment";
import {Button, Card, Col, DatePicker, Radio, Row, Typography} from "antd";
import locale from "antd/es/date-picker/locale/de_DE";
import "./CreateFairbundle.less";

const {Text} = Typography;

// start week mondays
moment.locale('de', {
    week: {
        dow: 1,
    },
});
// show German weekdays and months
moment.updateLocale('de', {
    weekdaysMin : ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    monthsShort: ["Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"]
});


export default class CreateFairbundle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedOption: 0,
            selectedPriceLevel: 0,
            expirationDate: null,
            canNotSubmit: true,
        };
    }

    onCreate = () => {
        this.createDOM.blur();

        let expirationAction =
            this.state.checkedOption === 0 ? "force" : "cancel";

        this.props.createFairbundle(
            this.state.expirationDate,
            expirationAction,
            this.props.product.priceLevel[this.state.selectedPriceLevel]
                .unitPrice
        );
    };

    onDateChange = (date, dateString) => {
        this.setState({
            expirationDate: date,
            canNotSubmit: date === null,
        });
    };

    onPriceLevelChange = (e) => {
        this.setState({selectedPriceLevel: e.target.value});
    };

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf("day");
    };

    getPriceLevelCard(priceLevel, index) {
        return (
            <Col span={8} key={index}>
                <Card
                    className={`create-fairbundle__card${
                        index % 2 ? "-odd" : ""
                    } padding--sm`}
                >
                    <Row justify="center">
                        <h3>Zielpreis</h3>
                    </Row>
                    <Row justify="center">
                        <h3>
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(priceLevel.unitPrice)}{" "}
                            / {priceLevel.unit}
                        </h3>
                    </Row>
                    <Row justify="center" className="margin-vertical--md">
                        <Row justify="center">bei einer Gesamtmenge von</Row>
                        <Row justify="center">
                            <b>
                                {priceLevel.minQty} {priceLevel.unit}
                            </b>
                        </Row>
                    </Row>
                    <Row justify="center" className="margin-vertical--md">
                        <Radio value={index}/>
                    </Row>
                </Card>
            </Col>
        );
    }

    render() {
        let product = this.props.product;

        return (
            <div>
                <Row>
                    <Radio.Group
                        className="margin-vertical--md create-fairbundle__cards-group"
                        size="large"
                        onChange={this.onPriceLevelChange}
                        value={this.state.selectedPriceLevel}
                    >
                        <Row gutter={[16, 16]}>
                            {product.priceLevel.map((p, i) =>
                                this.getPriceLevelCard(p, i)
                            )}
                        </Row>
                    </Radio.Group>
                </Row>
                <Row align="middle" className="margin-vertical--md">
                    <Col className="padding-right--sm">
                        <Text>Ihre Bestellmenge:</Text>
                    </Col>
                    <Col>
                        <b> {this.props.quantity + ' ' + product.priceLevel[0].unit} </b>
                    </Col>
                </Row>
                <Row align="middle">
                    <Col className="padding-right--sm">
                        <Text>Laufzeit bis:</Text>
                    </Col>
                    <Col>
                        <DatePicker
                            locale={locale}
                            onChange={this.onDateChange}
                            showToday={false}
                            showTime={true}
                            showNow={false}
                            placeholder="Zeitpunkt wählen"
                            format={"DD.MM.YYYY HH:mm"}
                            disabledDate={this.disabledDate}
                        />
                    </Col>
                </Row>
                <Row className="margin-bottom--md">
                    <Row className="margin-vertical--md">
                        {`Wenn die vom Verkäufer festgelegte Mindestmenge von ${product.priceLevel.reduce((a, b) => Math.min(a, b.minQty), Number.MAX_SAFE_INTEGER)}
                         ${product.priceLevel[0].unit} erreicht wird, nicht jedoch die entsprechende Menge zur Erreichung des Zielpreises soll:`}
                    </Row>
                    <Row>
                        <Radio.Group
                            onChange={(e) => {
                                this.setState({
                                    checkedOption: e.target.value,
                                });
                            }}
                            value={this.state.checkedOption}
                        >
                            <Radio value={0}>
                                <Text className="create-fairbundle__expiration-option-text">
                                    das Fairbundle trotzdem zum nächsthöheren
                                    Preis bestellt werden.
                                </Text>
                            </Radio>
                            <Radio value={1}>
                                <Text className="create-fairbundle__expiration-option-text">
                                    die zum Fairbundle gehörenden Bestellungen
                                    nicht durchgeführt werden.
                                </Text>
                            </Radio>
                        </Radio.Group>
                    </Row>
                </Row>
                <Row justify="end">
                    <Button
                        type="primary"
                        disabled={this.state.canNotSubmit}
                        ref={(buttonDOM) => {
                            this.createDOM = buttonDOM;
                        }}
                        onClick={this.onCreate}
                    >
                        Veröffentlichen
                    </Button>
                </Row>
            </div>
        );
    }
}
