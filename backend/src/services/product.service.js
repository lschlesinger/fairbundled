import Category from "../models/category.model";
import Certificate from "../models/certificate.model";
import Product from "../models/product.model";
import Supplier from "../models/supplier.model";
import PRODUCTS from "./product.data";


class ProductService {

    static async createInitialProducts() {
        // get copy of all categories
        const products = [...PRODUCTS];

        // iterate over categories and certificates
        for (const i in products) {
            const product = products[i];
            const categories = [];
            for (const j in product.categories) {
                const categoryName = product.categories[j];
                const category = await Category.findOne({name: categoryName});
                categories.push(category._id);
            }

            const certificates = [];
            for (const j in product.certificates) {
                const certificateName = product.certificates[j];
                const certificate = await Certificate.findOne({name: certificateName});
                certificates.push(certificate._id);
            }

            if (product.supplier){
                product.supplier = await Supplier.findOne({name: product.supplier});
            }

            product.categories = categories;
            product.certificates = certificates;
            let p = await Product.findOneAndUpdate({ean: product.ean}, product, {upsert: true});
        }
        console.log("Initial Products created.");
    }

}

export default ProductService;
