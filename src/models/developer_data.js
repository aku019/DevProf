const mongoose = require("mongoose");
const { Schema } = mongoose;

const devSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true


    },
    avatar_url: {
        type: String,
        
    },
    name: {
        type: String,
        
    },
    company: {
        type: String,
        
    },
    blog: {
        type: String,
        
    },
    location: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    bio: {
        type: String,
        
    },
    github_id: {
        type: String,
        
    },
    linkedin_id: {
        type: String,
        
    },
    codechef_id: {
        type: String,
        
    },
    twitter_id: {
        type: String,
        
    },
    medium_id: {
        type: String,
        
    },
    repos: [{
        name: {
            type: String,
            
        },
        html_url: {
            type: String,
            
        },
        description: {
            type: String,
            
        },
        updated_at: {
            type: String,
            
        }

        
    }]
});

module.exports = mongoose.model('DEV', devSchema);
