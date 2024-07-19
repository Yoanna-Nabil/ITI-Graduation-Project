const multer = require("multer");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catechAsync");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFillter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else cb(new AppError("not an Image", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFillter,
});
// multer form image upldaos middleware
const uploadProductPhotos = upload.fields([
  { name: "image", maxCount: 1 },

  { name: "images", maxCount: 4 },
]);

const resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files.images || !req.files.image) {
    return next();
  }
  //1)proccing one image
  const idmageFilename = `${req.id}--${Date.now()}main.jpeg`;
  await sharp(req.files.image[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${idmageFilename}`);
  req.body.image = idmageFilename;
  //2) the images array
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const fileName = `${req.id}--${Date.now() + i + 1}.jpeg`;
      await sharp(req.files.image[0].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/${fileName}`);
      req.body.images.push(fileName);
    })
  );
  next();
});
module.exports = { resizeProductImages, uploadProductPhotos };
