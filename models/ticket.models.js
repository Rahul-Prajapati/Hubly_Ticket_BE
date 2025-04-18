const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new mongoose.Schema(
    {
        ticketId: { 
            type: String, 
            required: true, 
            unique: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        phone: { 
            type: String, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        assignedTo: { 
            type: Schema.Types.ObjectId, 
            ref: "Admin" 
        },
        status: { 
            type: String, 
            enum: ["resolved", "unresolved","pending"], 
            default: "pending" 
        },
        firstResponseTime: { 
            type: Number // in seconds 
        },
        missedChat: { 
            type: Boolean, 
            default: false 
        },
        messages: [
            {
                sender: { 
                    type: String, 
                    enum: ["user", "admin", "member", "secondary_admin"] 
                },
                content: { 
                    type: String 
                },
                timestamp: { 
                    type: Date, 
                    default: Date.now 
                }
            }
        ]
    }
);

module.exports = mongoose.model("Ticket", TicketSchema);