const express = require('express');
const fetchuser = require('../middleware/Fetchuser');
const Images = require('../models/Images');
const uploadImg = require('../middleware/imageHandler');
const fs = require('fs');

const router = express.Router();

// Route to upload images of the user using: POST '/api/images/uploadImages'. Requires authentication.
router.post('/uploadImages', fetchuser, uploadImg.single('img'), async (req, res) => {
  try {
    //const imgData = req.file.buffer || req.file.path;
    const imgData = fs.readFileSync(req.file.path);

    const img = new Images({
      user: req.user.id,
      img: {
        data: imgData,
        contentType: req.file.mimetype
      }
    });
    console.log(img);

    const savedImage = await img.save();
    res.json(savedImage);
  } catch (error) {
    console.error('Error uploading image:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to fetch all images of the user using: GET '/api/images/fetchallimages'. Requires authentication.
router.get('/fetchallimages', fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const userImages = await Images.find({ user: userID });
    
    if (!userImages) {
      return res.status(404).json({ error: 'No images found for this user' });
    }
    
    // Convert images to Base64 for sending
    const imagesToSend = userImages.map(image => ({
      _id: image._id,
      img: {
        data: image.img.data.toString('base64'), // Convert Buffer to Base64 string
        contentType: image.img.contentType
      }
    }));

    res.json(imagesToSend);

  



    

  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
