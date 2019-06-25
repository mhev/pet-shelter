const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pet name cannot be blank"],
        unique: [true, "Pet name is already taken"],
        minlength: [3, "Pet name must be at least 3 charcters long"]
    },
    petType: {
        type: String,
        required: [true, "Type of pet cannot be blank"],
        minlength: [3, "Pet type must be at least 3 characters long"]
    },
    description: {
        type: String,
        required: [true, "Description cannot be blank"],
        minlength: [3, "Description must be at least 3 characters long"]
    },
    skill1: {
        type: String
    },
    skill2: {
        type: String
    },
    skill3: {
        type: String
    },
}, {timestamps: true});
    PetSchema.plugin(uniqueValidator);

mongoose.model("Pet", PetSchema);