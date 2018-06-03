import * as mongoose from 'mongoose'

export interface User extends mongoose.Document {
    name: string,
    lastname: string,
    email: string,
    password: string,
    registration: Date,
    lastupdate: Date,      
    level: number,
    status: boolean
} 

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registration: Date,
    lastupdate: Date,      
    level: {
        type: Number,
        required: true,
        enum: [1, 2, 3]
    },
    status: { 
        type: Boolean, 
        default: true 
    }
})

const saveMiddleware = function (next){
    const user: User = this
    user.registration = new Date()
    next()
}

const updateMiddleware = function (next){
    const user: User = this
    if(user.isModified()){
        next()
    } else {
        user.lastupdate = new Date()
    }
}

UserSchema.pre('save', saveMiddleware)
UserSchema.pre('findOneAndUpdate', updateMiddleware)

export default mongoose.model<User>('users', UserSchema)
