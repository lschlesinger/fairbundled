import React from 'react';
import {Input, Row, Select} from 'antd';
import {withRouter} from "react-router-dom";

const {Option} = Select;

const {Search} = Input;


class SearchBar extends React.Component {

    constructor(props, context) {
        super(props, context);
        const category = this.props.location.search.includes('category') ? this.props.location.search.split('category=')[1].split("&")[0] : "";
        const searchString = this.props.location.search.includes('searchString') ? this.props.location.search.split('searchString=')[1].split("&")[0] : "";
        this.state = {
            category: category,
            searchString: searchString
        }
    }

    getRootCategories(categories) {
        return (
            <Select
                labelInValue
                defaultValue={{key: this.state.category}}
                style={{width: 160}}
                onSelect={(category) => {
                    this.setState({category: category.key}, () => {
                        this.routeToPath();
                    });
                }}>
                <Option value=''> Alle Kategorien </Option>
                {
                    categories.map((c) => <Option value={c.name}> {c.name} </Option>)
                }
            </Select>
        );
    }

    routeToPath() {
        this.props.history.push(`/product?searchString=${this.state.searchString}&category=${this.state.category}`);
    }

    render() {
        return (
            <Row justify="space-around" align="middle">
                <Search
                    placeholder="Wonach suchen Sie?"
                    onSearch={(searchString) => {
                        this.setState({searchString: searchString}, () => {
                            this.routeToPath();
                        });
                    }}
                    defaultValue={this.state.searchString}
                    allowClear={true}
                    addonAfter={this.getRootCategories(this.props.categories)}>
                </Search>
            </Row>
        );
    }
}

export default withRouter(SearchBar);
