const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Create a youtube_videos
router.post('/', async (req, res) => {
  try {

    const {
      url,
      description,
      title,
    } = req.body;

    // Validate required fields
    if (!url || !title || !description) {
      return res.status(400).json({ error: 'Missing required fields: url, title, description' });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('youtube_videos')
      .insert([
        {
          url,
          description,
          title,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error in POST /api/youtube_videos:', error.message, error.stack);
    res.status(500).json({ error: error.message, details: error });
  }
});


// Get all youtube_videos
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('youtube_videos').select('*');
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single youtube_videos
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('youtube_videos').select('*').eq('id', id).single();
        if (error) throw new Error(error.message);
        if (!data) return res.status(404).json({ error: 'youtube_videos not found' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a youtube_videos
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('youtube_videos').delete().eq('id', id).select();
        if (error) throw new Error(error.message);
        if (!data.length) return res.status(404).json({ error: 'youtube_videos not found' });
        res.json({ message: 'youtube_videos deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete all youtube_videos
router.delete('/', async (req, res) => {
    try {
        const { error } = await supabase.from('youtube_videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (error) throw new Error(error.message);
        res.json({ message: 'All youtube_videos deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;