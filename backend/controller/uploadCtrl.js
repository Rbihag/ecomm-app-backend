const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
    cloudinaryUploadImg,
    cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
    try {
        const uploader = async (path) => {
            return await cloudinaryUploadImg(path);
        };

        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
            fs.unlinkSync(path);
        }

        res.write(JSON.stringify(urls));
        res.end();
    } catch (error) {
        throw new Error(error);
    }
});


const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await cloudinaryDeleteImg(id);
        res.json({ message: "Deleted" });
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
    uploadImages,
    deleteImages,
};