const express = require("express");
const router = express.Router(); //router object
const wrapAsync = require("../utils/wrapAsync.js"); 
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer  = require('multer'); //multer parse forms data
const {storage} = require ("../cloudConfig.js");
const upload = multer({ storage }) // multer will fetch the files forms and stores in storage



//router.route => compact the code if routes are same
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, 
     upload.single('listing[image]'),validateListing,
     wrapAsync(listingController.createListing));


// New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

 module.exports=router;