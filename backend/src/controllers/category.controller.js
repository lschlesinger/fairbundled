import Category from "../models/category.model";
import CategoryService from "../services/category.service";

// do this once when this file is loaded
CategoryService.createCategories();

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
