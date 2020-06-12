import React from 'react';
import {Input, Row, Select} from 'antd';
import {withRouter} from "react-router-dom";
import "./SearchBar.less";

const {Option} = Select;

const {Search} = Input;


class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: this.props.currentRootCategory,
            searchString: this.props.currentSearchString,
        };
        this.searchRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentRootCategory !== prevProps.currentRootCategory ||
            this.props.currentSubCategory !== prevProps.currentSubCategory
        ) {
            // reset search input when category changed via CategoryHeaderMenu (crazy...)
            if (this.props.currentRootCategory !== this.state.selectedCategory ||
                this.props.currentSubCategory !== prevProps.currentSubCategory
            ) {
                if (this.searchRef?.current?.input?.handleReset) {
                    this.searchRef.current.input.setValue(''); // hacky...
                }
            }
            this.setState({
                selectedCategory: this.props.currentRootCategory,
                searchString: this.props.currentSearchString
            });
        }
    }

    routeToPath() {
        // navigate to route with query params obtained from state
        this.props.history.push(`/product?searchString=${this.state.searchString}&category=${this.state.selectedCategory}`);
    }

    getRootCategories(categories) {
        return (
            <Select className="search-bar__select"
                    labelInValue
                    value={{key: this.state.selectedCategory}}
                    onSelect={(category) => {
                        // update state asynchronously with selection
                        this.setState({selectedCategory: category.key});
                    }}>
                <Option key='' value=''> Alle Kategorien </Option>
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
                    ref={this.searchRef}
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
