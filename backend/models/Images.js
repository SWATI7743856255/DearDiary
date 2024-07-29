var mongoose = require('mongoose');
var ImageSchema = new mongoose.Schema({
	user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      
    img:
	{
		data: Buffer,
		contentType: String
	},

    date: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Image', ImageSchema);
