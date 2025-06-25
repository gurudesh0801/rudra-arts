const express = require("express")
const router = express.Router()
const {getGallery, addGalleryItem} = require('../controllers/galleryController')

router.get('/',getGallery)

router.post('/',addGalleryItem)

module.exports = router