const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/firebaseAdmin');
const bcrypt = require('bcrypt');

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}

passport.use(new LocalStrategy(customFields, authorize));

async function authorize(req, email, password, done) {
    var query
    if (req.body.role == 1) {
        query = db.collection('Users');
    }
    if (req.body.role == 2) {
        query = db.collection('Admin');
    }

    const docs = (await query.get()).docs;

    const user = docs.find(doc => {
        return doc.data().email === email;
    });
    console.log(user);

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        const users = db.collection('Users').get().docs;

        const user_ = users.find(doc => {
            return doc.id === id;
        })

        return done(null, user_);
    });

    //req.flash('id', user.id);

    if (!user) {
        return done(null, false, {message: 'Tài khoản không tồn tại!'});
    }

    if (!(await bcrypt.compare(password, user.data().password))) {
        return done(null, false, {message: 'Mật khẩu không chính xác!'});
    } else {
        return done(null, user);
    }
}
