import Category from "../models/category.model";
import CATEGORIES from "./category.data";

class CategoryService {

    static async createInitialCategories() {
        // get copy of all categories
        const categories = [...CATEGORIES];

        // iterate over categories
        for (const i in categories) {
            const category = categories[i];
            const subs = [];
            if (category.subcategories) {
                for (const j in category.subcategories) {
                    const sub = category.subcategories[j];
                    const subc = await Category.findOneAndUpdate(sub, sub, {upsert: true, new: true});
                    subs.push(subc);
                }
            }
            category.subcategories = subs;
            let c = await Category.findOneAndUpdate(category, category, {upsert: true});
        }

        console.log("Initial Categories created.")
    }

}

export default CategoryService;
