const db = require('../models/firebaseAdmin');
const users = db.collection('Users');
const hash = require('../config/hash');


class UserController {

    async createUser(req, res) {
        console.log('1');
        let email = req.body.email;
        let password = hash.hash(req.body.password);
        const docs = (await users.get()).docs;
        const cust = docs.find(doc => {
            return doc.data().email === email;
        })
        if (!cust) {
            users.add({
                password: password,
                email: req.body.email,
                name: req.body.name,
            });
            console.log('\n Thành công \n');
            res.status(200).send('Đăng ký thành công');
        } else res.status(409).send('Email đăng ký đã tồn tại');
    }
}

module.exports = new UserController;