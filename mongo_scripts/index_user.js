const { initDatabase, treatCollection } = require("./index")

initDatabase("sbd_2").then(() => {
    treatCollection("user",  { projection: { _id: 0, friends: 0}})
});