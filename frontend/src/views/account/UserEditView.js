import React from 'react';
import {withRouter} from "react-router-dom";
import {Row} from "antd";

class UserEditView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <Row justify="center">
                <h3>Not in scope ;)</h3>
            </Row>
        );
    }
}

export default withRouter(UserEditView);
