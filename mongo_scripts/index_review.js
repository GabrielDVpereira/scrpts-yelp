const { initDatabase, treatCollection } = require("./index");

initDatabase("sbd_2").then(() => {
  treatCollection("review",  { projection: { _id: 0 }}, 100000)
});