const { Schema, model } = require('mongoose');

const UserSchema = Schema ({

    name: {
        type: String,
        requiered: true,
    },
    email: {
        type: String,
        requiered: true,
        unique: true
    },
    password: {
        type: String,
        requiered: true,
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        requiered: true,
        default: 'USER_ROL'
    },
    google: {
        type: Boolean,
        default: false
    },

});

UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( 'User', UserSchema );