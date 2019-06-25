const Pets = require('../controllers/pets');

module.exports = (app) => {
    app.get("/api/pets", Pets.getAll);
    app.get("/api/pets/:_id", Pets.getOne);
    app.post("/api/pets", Pets.create);
    app.delete("/api/pets/:_id", Pets.delete);
    app.put("/api/pets/:_id", Pets.update);
}