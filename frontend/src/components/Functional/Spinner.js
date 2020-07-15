import {LoadingOutlined} from "@ant-design/icons";
import {Row, Spin} from "antd";
import React from "react";

export class Spinner extends React.Component {
    render() {
        const antIcon = <LoadingOutlined style={{fontSize: 36}} spin/>;
        return (
            <Row
                justify="center"
                align="middle"
                className="app__spinner-container"
            >
                <Spin size="large" indicator={antIcon}/>
            </Row>
        );
    };
}
