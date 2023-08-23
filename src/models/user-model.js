const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim:true },
        lastName: { type: String, required: false, trim:true },
  // lastName: SVGStringList,  //it denotes required: false
        email: { type: String, required: true, trim:true },
        password: { type: String, required: true },
        gender:
        {
            type: String,
            required: false,
            enum: ["Male", "Female"], // for enum we only put "Male" or "Female" in gender
            default: "Male"
        },
        age: {type:Number, required: false},
        birthDate: {type: Date, required:false}, // new Date()
    },
    {
        versionKey: false,
        timestamps: true,
    },
);




userSchema.pre("save", function (next) {
    let user = this;
    user.firstName = user.firstName.replace(/ /g, "");
    next();
})  

userSchema.pre("save", function (next) {
    let user = this;
    user.lastName = user.lastName.replace(/ /g, "");
    next();
})

const User = mongoose.model("users", userSchema);
module.exports = User;