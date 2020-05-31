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

}

export default UserService;
