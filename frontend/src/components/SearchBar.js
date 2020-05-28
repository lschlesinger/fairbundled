import React from 'react';
import {Input, Row, Select} from 'antd';

const {Option} = Select;

const {Search} = Input;


export default class SearchBar extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    getRootCategories(categories) {
        return (
            <Select defaultValue="Alle Kategorien">
                {
                    categories.map((c) => <Option value={c.name}> {c.name} </Option>)
                }
            </Select>
        );
    }

    render() {
        return (
            <Row justify="space-around" align="middle">
                <Search
                    placeholder="Wonach suchen Sie?"
                    onSearch={value => console.log(value)}
                    addonAfter={this.getRootCategories(this.props.categories)}>
                </Search>
            </Row>
        );
    }
}
