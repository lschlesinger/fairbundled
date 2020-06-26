import User from "../models/user.model";
import Municipality from "../models/municipality.model";
import Supplier from "../models/supplier.model";
import USERS from "./user.data";
import bcrypt from "bcrypt";


class UserService {

    static async createInitialUsers() {
        const users = [...USERS];

        for (const i in users) {
            const user = users[i];
            if (user.municipality) {
                user.municipality = (await Municipality.findOneAndUpdate(user.municipality, user.municipality, {
                    upsert: true,
                    new: true
                }))._id;
            }
            if (user.supplier) {
                user.supplier = (await Supplier.findOneAndUpdate(user.supplier, user.supplier, {
                    upsert: true,
                    new: true
                }))._id;
            }

            user.password = bcrypt.hashSync(user.password, 8);

            let u = await User.findOneAndUpdate({email: user.email}, user, {upsert: true});
        }

        console.log("Initial Users created.")
    }

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

        console.log(user.municipality);

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
