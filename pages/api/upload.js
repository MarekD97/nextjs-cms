import formidable from 'formidable'

export const config = {
    api: {
        bodyParser: false,
    }
}
export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/uploads';
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        res.status(200).json({...files.file, url: files.file.path.substring(6).replace(/\\/g, "/")});
    })
};