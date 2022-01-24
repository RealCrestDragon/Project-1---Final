const admin = require('firebase-admin');
const serviceAccount = require('./project-1-68168-firebase-adminsdk-g02cj-b25ba8ba8e.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
