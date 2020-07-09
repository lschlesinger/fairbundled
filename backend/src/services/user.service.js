import User from "../models/user.model";
import Municipality from "../models/municipality.model";
import Supplier from "../models/supplier.model";
import bcrypt from "bcrypt";


class UserService {

    static async registerUser(user) {
        // get user data (password, email)
        const u = {
            email: user.email,
            password: bcrypt.hashSync(user.password, 8),
            municipality: null,
            supplier: null
        };

        if (!(user.municipality || user.supplier)) {
            throw new Error("Invalid user registration request. Missing entity.");
        }

        // get municipalityId or create new municipality
        if (user.municipality) {
            u.municipality = user.municipality._id ? user.municipality._id : (await Municipality.findOneAndUpdate({name: user.municipality.name}, user.municipality, {
                upsert: true,
                new: true
            }))._id;
        }

        // get supplierId or create new supplier
        if (user.supplier) {
            u.supplier = user.supplier._id ? user.supplier._id : (await Supplier.findOneAndUpdate({name: user.supplier.name}, user.supplier, {
                upsert: true,
                new: true
            }))._id;
        }

        // create user
        return User.create(u);
    }

}

export default UserService;
