const mongoose = require('mongoose');

const Rule = mongoose.model('Rule', {
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    }
});

module.exports = {Rule};
