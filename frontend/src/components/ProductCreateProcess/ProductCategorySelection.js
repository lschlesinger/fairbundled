import React from 'react';
import {Form, TreeSelect} from 'antd';


const {TreeNode} = TreeSelect;

export default class ProductCategorySelection extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            categories: props.categories || []
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

    onChange(categories) {
        // check if any of selected IDs is child ID and parent is not in state.categories
        const flatCategories = this.props.categories
            .flatMap((c) => [c, ...(c.subcategories.map((s) => {
                return {...s, parent: c._id}
            }))]);

        //
        for (const c in categories) {
            const categoryId = categories[c];
            // find category by id in categories
            const category = flatCategories
                .find((category) => category._id === categoryId);
            if (!category.root) {
                // if parentId not in selected categories, add it to list
                if (category && categories.indexOf(category.parent) === -1) {
                    categories.push(category.parent);
                }
            }
        }
        // setState accordingly
        this.setState({
            categories
        })
    }

    render() {
        return (
            <div>
                <h3 className="margin-vertical--md">Wählen Sie die zutreffenden Kategorien</h3>
                <Form.Item name="categories">
                    <TreeSelect
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        placeholder="Wählen Sie eine oder mehrere Kategorien"
                        value={this.state.categories}
                        onChange={this.onChange.bind(this)}
                        multiple
                    >
                        {this.props.categories.map((c) => this.getTreeNodes(c))}
                    </TreeSelect>
                </Form.Item>
            </div>
        );
    }
}
