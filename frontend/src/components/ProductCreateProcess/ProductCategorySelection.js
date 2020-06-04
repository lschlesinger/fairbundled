import React from 'react';
import "./ProductCategorySelection.less"
import {TreeSelect} from 'antd';


const {TreeNode} = TreeSelect;


export default class ProductCategorySelection extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: undefined,
        }
    }


    getSubTreeNodeItem(category) {
        // sub menu item != root level categories
        return (
            this.getSubTreeNodes(category)
        )
    }

    getSubTreeNodes(category) {
        return (
            // root level categories
            <TreeNode
                title={category.name}
                value={category._id}
            >
                {category.subcategories.map((subcat) => this.getSubTreeNodeItem(subcat))}
            </TreeNode>
        )
    }

    getTreeNodes(category) {
        if (category.subcategories && category.subcategories.length > 0) {
            return this.getSubTreeNodes(category);
        }
        return (
            // navigate to route with category query param (if sub-category is selected)
            <TreeNode value={category._id} title={category.name}/>
        );
    }

    onChange = value => {
        this.setState({value});
    };

    render() {
        return (
            <TreeSelect
                className="product-create-process__category-multiple-select padding--md"
                value={this.state.value}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                placeholder="Wählen Sie eine oder mehrere Kategorien"
                multiple
                onChange={this.onChange}
            >
                {this.props.categories.map((c) => this.getTreeNodes(c))}
            </TreeSelect>
        );
    }
}
