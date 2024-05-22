const blogPostSchema = new mongoose.Schema({
    category: {
        type: 'string',
        required: true,
    },
    title: {
        type: 'string',
        required: true,
    },
    cover: {
        type: 'string',
        required: true,
        default: 'https://picsum.photos/200/300',
    },
    readTime: {
        value: {
            type: 'number',
            required: false
        },
        unit: {
            type: 'number',
            required: false
        }
    },
    author: {
        type: 'string',
        required: true,
        lowercase: true
    },
    content: {
        type: 'string',
        required: true
    }
})