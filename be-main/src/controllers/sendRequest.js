const express = require('express');
const router = express.Router();
const { User } = require("../db/model");



const sendRequest = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        // Find sender and receiver in the database
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ error: 'Sender or receiver not found' });
        }

        // Check if the sender has already sent a request to the receiver
        if (sender.requests.includes(receiverId)) {
            return res.status(400).json({ error: 'Request already sent' });
        }

        // Add receiverId to sender's requests array to mark the request as sent
        sender.requests.push(receiverId);
        await sender.save();

        res.json({ message: 'Request sent successfully' });
    } catch (error) {
        console.error('Error sending request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    sendRequest
};