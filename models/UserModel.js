import mongoose from 'mongoose'

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

export default mongoose.model('users', UserSchema)
