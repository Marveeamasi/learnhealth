const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { uploadFile } = require('../utils/fileHandler');

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Create a blog
router.post('/', async (req, res) => {
  try {

    const {
      name,
      mediaType,
      desc,
      headings,
      keywords,
      sources,
      author,
      category,
      group,
      publishedOn
    } = req.body;

    // Validate required fields
    if (!name || !author || !publishedOn) {
      return res.status(400).json({ error: 'Missing required fields: name, author, publishedOn' });
    }

    // Handle file upload
    let mediaUrl = null;
    if (req.files && req.files.media) {
      // Log file details
      console.log('File details:', {
        name: req.files.media.name,
        mimetype: req.files.media.mimetype,
        size: req.files.media.size
      });

      // Generate unique file name
      const fileExt = req.files.media.name.split('.').pop().toLowerCase();
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const fileName = `${uniqueId}.${fileExt}`;
      console.log(`Generated file name: ${fileName}`);

      try {
        mediaUrl = await uploadFile(req.files.media, fileName, mediaType);
        console.log(`Media URL after upload: ${mediaUrl}`);
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        return res.status(400).json({ error: `File upload failed: ${uploadError.message}` });
      }
    }

    // Parse JSON strings
    let parsedHeadings, parsedKeywords, parsedSources;
    try {
      parsedHeadings = headings ? JSON.parse(headings) : [];
      parsedKeywords = keywords ? JSON.parse(keywords) : [];
      parsedSources = sources ? JSON.parse(sources) : [];
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return res.status(400).json({ error: 'Invalid JSON in headings, keywords, or sources' });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          name,
          media: mediaUrl,
          media_type: mediaType || 'image',
          description: desc || null,
          headings: parsedHeadings,
          keywords: parsedKeywords,
          sources: parsedSources,
          author,
          category: category || 'articles',
          group: group || 'public health',
          published_on: publishedOn,
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
    console.error('Error in POST /api/blogs:', error.message, error.stack);
    res.status(500).json({ error: error.message, details: error });
  }
});


// Get all blogs
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('blogs').select('*');
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single blog
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
        if (error) throw new Error(error.message);
        if (!data) return res.status(404).json({ error: 'Blog not found' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a blog
router.put('/:id', async (req, res) => {
  try {
    
    const { id } = req.params;
    const {
      name,
      mediaType,
      desc,
      headings,
      keywords,
      sources,
      author,
      category,
      group,
      publishedOn
    } = req.body;

    // Validate required fields
    if (!name || !author || !publishedOn) {
      return res.status(400).json({ error: 'Missing required fields: name, author, publishedOn' });
    }

    // Handle file upload
    let mediaUrl = null;
    if (req.files && req.files.media) {
      // Log file details
      console.log('File details:', {
        name: req.files.media.name,
        mimetype: req.files.media.mimetype,
        size: req.files.media.size
      });

      // Generate unique file name
      const fileExt = req.files.media.name.split('.').pop().toLowerCase();
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const fileName = `${uniqueId}.${fileExt}`;
      console.log(`Generated file name: ${fileName}`);

      try {
        mediaUrl = await uploadFile(req.files.media, fileName, mediaType);
        console.log(`Media URL after upload: ${mediaUrl}`);
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        return res.status(400).json({ error: `File upload failed: ${uploadError.message}` });
      }
    }

    // Parse JSON strings
    let parsedHeadings, parsedKeywords, parsedSources;
    try {
      parsedHeadings = headings ? JSON.parse(headings) : null;
      parsedKeywords = keywords ? JSON.parse(keywords) : null;
      parsedSources = sources ? JSON.parse(sources) : null;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return res.status(400).json({ error: 'Invalid JSON in headings, keywords, or sources' });
    }

    // Build updates object
    const updates = {
      name,
      media: mediaUrl || req.body.media || null,
      media_type: mediaType || 'image',
      description: desc || null,
      headings: parsedHeadings ?? undefined,
      keywords: parsedKeywords ?? undefined,
      sources: parsedSources ?? undefined,
      author,
      category: category || 'articles',
      group: group || 'public health',
      published_on: publishedOn,
    };

    // Remove undefined fields to avoid overwriting with null
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    // Update in Supabase
    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error in PUT /api/blogs/:id:', error.message, error.stack);
    res.status(500).json({ error: error.message, details: error });
  }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('blogs').delete().eq('id', id).select();
        if (error) throw new Error(error.message);
        if (!data.length) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete all blogs
router.delete('/', async (req, res) => {
    try {
        const { error } = await supabase.from('blogs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (error) throw new Error(error.message);
        res.json({ message: 'All blogs deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;