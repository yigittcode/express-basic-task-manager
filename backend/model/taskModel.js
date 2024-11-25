import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        minlength: 1, 
    },
    completed: {
        type: Boolean,
        default: false,
    },
    _id: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // This will add createdAt and updatedAt fields
});

// Default olarak export ediyoruz
export default mongoose.model('Tasks', taskSchema);
