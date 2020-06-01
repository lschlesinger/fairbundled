import React from 'react';
import {Input, Row, Select} from 'antd';
import {withRouter} from "react-router-dom";
import "./SearchBar.less";

const {Option} = Select;

const {Search} = Input;


class SearchBar extends React.Component {

    constructor(props, context) {
        super(props, context);
        // get query params from route (req. export withRouter)
        const category = this.props.location.search.includes('category') ? this.props.location.search.split('category=')[1].split("&")[0] : "";
        const searchString = this.props.location.search.includes('searchString') ? this.props.location.search.split('searchString=')[1].split("&")[0] : "";
        this.state = {
            category: category,
            searchString: searchString
        }
    }


    routeToPath() {
        // navigate to route with query params obtained from state
        this.props.history.push(`/product?searchString=${this.state.searchString}&category=${this.state.category}`);
    }


    getRootCategories(categories) {
        return (
            <Select className="search-bar__select"
                labelInValue
                defaultValue={{key: this.state.category}}
                onSelect={(category) => {
                    // update state asynchronously with selection
                    this.setState({category: category.key}, () => {
                        // navigate to new route on state update completed
                        this.routeToPath();
                    });
                }}>
                <Option value=''> Alle Kategorien </Option>
                {
                    categories.map((c) => <Option key={c._id} value={c._id}> {c.name} </Option>)
                }
            </Select>
        );
    }

    render() {
        return (
            <Row justify="space-around" align="middle">
                <Search
                    placeholder="Wonach suchen Sie?"
                    onSearch={(searchString) => {
                        // update state asynchronously on clicking/initializing search
                        this.setState({searchString: searchString}, () => {
                            // navigate to new route on state update completed
                            this.routeToPath();
                        });
                    }}
                    defaultValue={this.state.searchString}
                    allowClear={true}
                    // call helper function to add root categories after search bar to search only within one category
                    addonAfter={this.getRootCategories(this.props.categories)}>
                </Search>
            </Row>
        );
    }
}

export default withRouter(SearchBar);
