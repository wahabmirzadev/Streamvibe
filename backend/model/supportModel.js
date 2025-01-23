const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    // supportType: { type: String, required: true, enum: ['Technical Issue', 'General Inquiry', 'Account Issue', 'Other'] },
    // priority: { type: String, required: true, enum: ['High', 'Medium', 'Low'] },
    // attachments: [{ type: String }],
    status: { type: String, default: 'pending', enum: ['pending', 'in progress', 'resolved'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Supports', supportSchema);