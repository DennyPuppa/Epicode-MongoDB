const authorsSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    lastName: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    date: {
        type: 'string',
        required: true
    },
    avatar: {
        type: 'string',
        required: true
    }
})