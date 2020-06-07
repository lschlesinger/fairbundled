import React from 'react';
import {Form, TreeSelect} from 'antd';


const {TreeNode} = TreeSelect;

export default class ProductCategorySelection extends React.Component {

    constructor(props, context) {
        super(props, context);
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

    render() {
        return (
            <div>
                <h3 className="margin-vertical--md">Wählen Sie die zutreffenden Kategorien</h3>
                <Form.Item name="categories">
                    <TreeSelect
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        placeholder="Wählen Sie eine oder mehrere Kategorien"
                        multiple
                    >
                        {this.props.categories.map((c) => this.getTreeNodes(c))}
                    </TreeSelect>
                </Form.Item>
            </div>
        );
    }
}
