import CategoryService from "./category.service";
import CertificateService from "./certificate.service";
import ProductService from "./product.service";
import UserService from "./user.service";
import FairbundleService from "./fairbundle.service";

class BootstrapService {

    static async loadInitialData() {
        // 1. create categories
        await CategoryService.createInitialCategories();

        // 2. create certificates
        await CertificateService.createInitialCertificates();

        // 3. create initial users, municipalities, and suppliers
        await UserService.createInitialUsers();

        // 4. create products
        await ProductService.createInitialProducts();

        // 5. create fairbundle
        // await FairbundleService.createInitialFairbundles();
    }

}

export default BootstrapService;
