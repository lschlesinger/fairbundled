import CategoryService from "./category.service";
import CertificateService from "./certificate.service";

class BootstrapService {

    static async loadInitialData() {
        // 1. create categories
        await CategoryService.createInitialCategories();

        // 2. create certificates
        await CertificateService.createInitialCertificates();
    }
}

export default BootstrapService;
