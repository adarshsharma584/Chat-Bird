import mongoose from "mongoose";

const aiMessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userMessage: {
        type: String,
        required: true,
    },
    aiResponse: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const AIMessage = mongoose.model('AIMessage', aiMessageSchema);
export default AIMessage;