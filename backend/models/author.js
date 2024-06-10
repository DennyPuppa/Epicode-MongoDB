const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://picsum.photos/100'
    }
}, {timestamps: true, strict: true})

authorsSchema.pre('save', async function(next){
    const password = this.password;
    if(password){
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        } catch (error) {
            next(error)
        }
    }
})

const authorsModel = mongoose.model('Authors', authorsSchema);
module.exports = authorsModel;