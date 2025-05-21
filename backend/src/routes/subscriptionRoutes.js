const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { sendEmail } = require('../utils/email');

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Subscribe to newsletter
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const { data, error } = await supabase.from('subscribers').insert([{ email }]).select();
        if (error) throw new Error(error.message);

        // Send confirmation email
        await sendEmail(email, 'Newsletter Subscription - Learnhealth', 'Thank you for subscribing to our newsletter!');

        // Send notification email to admin
        const adminEmail = 'amasimarvellous@gmail.com';
        await sendEmail(adminEmail, 'Learnhealth - Newsletter', `A new newsletter subsciption has been made:\nEmail: ${email}`);

        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all subscribers (for admin dashboard)
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('subscribers').select('*');
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;