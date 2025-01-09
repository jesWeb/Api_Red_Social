const { Schema, model } = require('mongoose');

//difibir esquema de usuario  en la base de datos 
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    apellidos: {

        type: String
    },

    nickname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        requird: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    bio:{
        type:String,

    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    image: {
        type: String,
        default: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    },

    created_at: {
        type: Date,
        default: Date.now
    }


});

//exportar el modelo

module.exports = model("User", userSchema, 'users')