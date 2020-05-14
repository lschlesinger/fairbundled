import Item from "../models/item.model";

class ItemController {
    static getItems(req, res) {
        Item.find({})
            .then((items) => {
                res.status(200).json(items);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }

    static createItem(req, res) {
        Item.create(req.body)
            .then((item) => {
                res.status(201).json(item);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default ItemController;
