const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new mongoose.Schema(
    {
        firstName: { 
            type: String, 
            required: true 
        },
        lastName: { 
            type: String, 
            required: true 
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
        role: { 
            type: String, 
            enum: ["admin", "secondary_admin", "member"], 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
);
  
module.exports = mongoose.model("Admin", AdminSchema);