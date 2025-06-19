const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Routes
const blogRoutes = require('./routes/blogRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const youtube_videosRoutes = require('./routes/youtubeVideoRoutes');

app.use('/api/blogs', blogRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/youtube_videos', youtube_videosRoutes);

// Export for Vercel serverless
module.exports = app;
