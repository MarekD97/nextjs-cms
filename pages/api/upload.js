import formidable from 'formidable';
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
  });

export const config = {
    api: {
        bodyParser: false,
    }
}
export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(files.file.path);
        cloudinary.uploader.upload(files.file.path, function(error, result) {
            if (error) {
                res.status(400).json({error: 'Błąd podczas przesyłania pliku'});
            } else {
                res.status(200).json({url: result.url});
            }
        });
        
    })
};