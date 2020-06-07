export default class SmallestPriceService {
    static getSmallestPrice(products) {
        const smallestPriceProducts = [];
        for (const p in products) {
            const product = products[p];
            product.smallestPrice = Number.MAX_VALUE;
            for (let i = 0; i < product.priceLevel.length; i++) {
                product.smallestPrice = Math.min(
                    product.smallestPrice,
                    product.priceLevel[i].unitPrice
                );
            }
            smallestPriceProducts.push(product);
        }
        return smallestPriceProducts;
    }
}
