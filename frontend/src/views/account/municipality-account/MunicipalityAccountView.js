import React from "react";
import {Col, message, Row} from "antd";
import UserService from "../../../services/UserService";
import MyEntityData from "../../../components/AccountComponent/MyEntityData";
import ActivityOverview from "../../../components/AccountComponent/MunicipalityAccountContent/ActivityOverview";
import FairbundledAdvantage from "../../../components/AccountComponent/MunicipalityAccountContent/FairbundledAdvantage";
import PositionService from "../../../services/PositionService";
import AccountService from "../../../services/AccountService";

export class MunicipalityAccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            municipality: null,
            user: this.props.user,
            orderTableColums: null,
            fairbundleTableColumns: null
        };
    }

    getTableColumns() {
        let orderTableColums = AccountService.getOrderTableColumns();
        let fairbundleTableColumns = AccountService.getFairbundleTableColumns();
        let positionSubTableColumns = AccountService.getPositionSubTableColumns();
        this.setState({
            orderTableColums: orderTableColums,
            fairbundleTableColumns: fairbundleTableColumns,
            positionSubTableColumns: positionSubTableColumns
        })
    }

    componentDidMount() {
        this.getMunicipalityInfo();
        this.getTableColumns();
    }

    async getMunicipalityInfo() {
        try {
            let municipalityInfo = this.props.municipality;
            municipalityInfo = await PositionService.getPositionsInfo(municipalityInfo);
            municipalityInfo.user = await UserService.getEntityUsers();
            this.setState({municipality: municipalityInfo});
        } catch (e) {
            message.error("Error fetching municipality Information.");
        }
    }

    render() {
        return (
            <Row
                gutter={[24, 24]}
                className="padding-horizontal--lg"
                justify="space-around"
            >
                <Col span={9}>
                    <Row
                        gutter={[24, 24]}
                        justify="space-around">
                        <Col span={24}>
                            {this.state.municipality ? (
                                <MyEntityData
                                    entity={this.state.municipality}
                                    user={this.state.user}
                                />
                            ) : ("")}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            {this.state.municipality ? (
                                <FairbundledAdvantage municipality={this.state.municipality}/>
                            ) : (
                                ""
                            )}
                        </Col>
                    </Row>

                </Col>
                <Col span={15}>
                    {this.state.municipality ? (
                        <ActivityOverview
                            orderTableColums={this.state.orderTableColums}
                            fairbundleTableColumns={this.state.fairbundleTableColumns}
                            positionSubTableColumns={this.state.positionSubTableColumns}
                            municipality={this.state.municipality}/>
                    ) : ("")}
                </Col>
            </Row>
        );
    }
}
