import mongoose from 'mongoose'

module.exports = app => {

    const UserSchema = mongoose.Schema({
        name: String,
        lastname: String,
        email: String,
        password: String,
        registration: Date,
        lastupdate: Date,      
        level: Number,
        status: { type: Boolean, default: true }
    });

    return mongoose.model('users', UserSchema)

}