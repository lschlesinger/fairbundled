import Municipality from "../models/municipality.model";

class MunicipalityController {

    static getMunicipalities(req, res) {
        Municipality.find({})
            .then((municipalities) => {
                res.status(200).json(municipalities);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default MunicipalityController;
