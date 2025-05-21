const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { sendEmail } = require('../utils/email');

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Create a booking
router.post('/', async (req, res) => {
    try {
        const { name, email, service, message } = req.body;
        if (!name || !email || !service) return res.status(400).json({ error: 'Name, email, and service are required' });

        const { data, error } = await supabase.from('bookings').insert([{ name, email, service }]).select();
        if (error) throw new Error(error.message);

        // Send confirmation email
        await sendEmail(email, 'Booking Confirmation - Learnhealth', `Hello ${name}, your booking for ${service} has been confirmed!`);
       
        // Send notification email to admin
        const adminEmail = 'amasimarvellous@gmail.com';
        await sendEmail(adminEmail, 'Learnhealth - New Booking Received', `A new booking has been made:\n\nName: ${name}\nEmail: ${email}\nService: ${service}${message ? `\nMessage: ${message}` : ''}`);

        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all bookings (for admin dashboard)
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('bookings').select('*');
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;