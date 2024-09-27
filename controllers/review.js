const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
  
    await newReview.save(); 
    await listing.save();
    req.flash("success", "New Review Added Successfully!");  
    res.redirect(`/listings/${listing._id}`);
  }

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
  
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("error", "Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);
}