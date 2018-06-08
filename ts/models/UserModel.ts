import * as mongoose from 'mongoose'

export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    profiles: string[],
    photo: Buffer,
    createAt: Date,
    updatedAt: Date,   
    status: boolean
} 

const UserSchema = new mongoose.Schema({
    name: {
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
        type: String
    },      
    profiles: [{
        type: String,
        required: true,
        enum: ['user']
    }],
    photo: {
        type: Buffer,
        data: Buffer,
        contentType: String
    },
    createAt: Date,
    updatedAt: Date,
    status: { 
        type: Boolean, 
        default: false 
    }
})

const saveMiddleware = function (next){
    const user: User = this
    user.createAt = new Date()
    user.updatedAt = new Date()
    next()
}

const updateMiddleware = function (next){
    const user: User = this
    user.updatedAt = new Date()
    next()
}


UserSchema.pre('save', saveMiddleware)
UserSchema.pre('findOneAndUpdate', updateMiddleware)

export default mongoose.model<User>('Users', UserSchema, 'users')
