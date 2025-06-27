const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function uploadFile(file, fileName, mediaType) {
  try {
    console.log(`Uploading to bucket: blog-media, fileName: public/${fileName}`);

    // Validate file
    if (!file.data || !Buffer.isBuffer(file.data)) {
      throw new Error('Invalid file: No valid buffer provided');
    }

    // Validate mimetype for images
    const validImageTypes = ['image/jpeg', 'image/webp','image/jpg', 'image/png', 'image/gif'];
    if (mediaType === 'image' && !validImageTypes.includes(file.mimetype)) {
      throw new Error(`Invalid image type: ${file.mimetype}. Expected: ${validImageTypes.join(', ')}`);
    }

    let buffer = file.data; // Use file.data for express-fileupload

    // Compress image if it's an image
    if (mediaType === 'image') {
      try {
        buffer = await sharp(file.data)
          .resize({
               width: 1500,    
              withoutEnlargement: true, 
             fit: 'inside'   
            })
          .webp({
              quality: 80,           
              smartSubsample: true,  
              effort: 4,            
              lossless: false     
             }).toBuffer();
      } catch (sharpError) {
        console.error('Sharp processing error:', sharpError);
        throw new Error(`Image processing failed: ${sharpError.message}`);
      }
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-media')
      .upload(`public/${fileName}`, buffer, {
        contentType: file.mimetype,
        upsert: false, // Prevent overwriting
      });

    if (uploadError) {
      console.error(`File upload failed: ${uploadError.message}`, uploadError);
      throw new Error(`File upload failed: ${uploadError.message}`);
    }

    console.log(`File uploaded:`, uploadData);

    // Get public URL (Supabase v2.x)
    const { data: urlData, error: urlError } = supabase.storage
      .from('blog-media')
      .getPublicUrl(`public/${fileName}`);

    if (urlError || !urlData?.publicUrl) {
      console.error(`Failed to get public URL:`, urlError || 'No publicUrl in response');
      throw new Error('Failed to retrieve public URL');
    }

    console.log(`Public URL: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error.message, error.stack);
    throw new Error(`File upload failed: ${error.message}`);
  }
}

module.exports = { uploadFile };
