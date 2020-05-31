import Category from "../models/category.model";

class CategoryController {
    static getCategories(req, res) {
        Category.find({root: true})
            .populate('subcategories')
            .then((categories) => {
                res.status(200).json(categories);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default CategoryController;
