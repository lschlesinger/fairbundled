# Data Model

## UML Class Diagram



![UML](../docs/Fairbundled_UML.pdf)



### Explanation:

The UML Class Diagram displays a data model implemented with a NoSQL MongoDB.

The field `id` is automatically created (as `_id` field), when respective entity is modeled as database collection. This is the case for all entities except for `PriceLevel`  (defined inline in `Product` model's field).

The grayish displayed id-fields represent a foreign key, i.e. a reference to a certain entity.



## Entities (by logical units)

### User / Supplier / Municipality

A `User` is either registered as member of a `Municipality` and therefore has a `municipalityId` or as member of a `Supplier` with a `supplierId` respectively. 

 `email` and `password` (used for login) are the only obligatory `User` information.

Further information (such as `billingAddress` or `responsible`) are associated to user's municipality or supplier.

Further information such as addresses, e.g. `billingAddress`, `shippingAddress`, `deliveryAddress`are collected where necessary. In any case, since a registered `User` acts only as representative, a (legal) `responsible` for the associated entity is required.



### Product / PriceLevel / Certificate / Category

A `User` who is associated with a supplier (having `supplierId`) can create a `Product`, thus expanding the product range on the platform. The attributes name, `description`, number of `deliveryDays`, `ean` code to match the product with a common standard identifier, uploaded `image`(s) characterize the offered product. Images are for simplicity stored in a base64-encoded string. Furthermore, arbitrary `PriceLevel`, consisting of a `unitPrice` and `minQuantity` fixed in pairs need to be specified during the process of product creation. These in turn serve as possible bundling options. Additionally, a product holds diverse `Certificates`, which are represented by `name`, a brand `logo`, a `description` and a `sector`. The `sector` will be mapped to a `Category`. Categories can be nested and thus follow a composite pattern.



### Order / BundleOrder / OrderPosition

A `User` who is associated with a municipality having (`municipalityId`) can add single `OrderPositions` of a certain `Product` of arbitrary quantity (`qty`). One or multiple of these positions compose an `Order`, whose `submission`date is recorded.

As the main feature of the online platform for sustainable procurement, municipalities are enabled to bundle the demand for **one** `Product`. This behaviour is mapped by the entity `Fairbundle`. It extends a regular `Order` and allows other municipalities to join the bundled order until a certain `expirationDate` and under the predefined conditions. These are set by the `Municipality` creating the `Fairbundle` and include a `targetPrice`, which can be chosen of all `PriceLevels` exhibited by the respective `Product`, and an `expirationAction`. More precisely, the creator of a bundle decides in advance what action should be taken as soon as the `expirationDate` is reached and the `targetPrice` is not, i.e., due to missing volume to actually match the `minQuantity` associated to the targeted `unitPrice`. The invariant of a Fairbundle is that every associated `OrderPosition` refers to one and the same `Product` which is identified by its `productId`.

Since a `User` that adds a `OrderPosition` to an existing  `Fairbundle` is associated with a `municipalityId`, the  `BundleOrder` records all involved `Municipality` as `bundlers` in a dedicated field. 