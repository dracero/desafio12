
var admin = require("firebase-admin");

var serviceAccount = require("../config/fireconf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://carrito-fafcc-default-rtdb.firebaseio.com"
});

console.log("firebase conectada")

module.exports = admin;