const mongoose = require("mongoose");

function getDefaultDate() {
  const now = new Date();
  const cutoffDate = new Date('2025-06-18');
  
  if (now > cutoffDate) {
    return now;
  }
  
  // Generate random date between 2025-01-01 and 2025-06-16
  const start = new Date('2025-01-01').getTime();
  const end = new Date('2025-06-16').getTime();
  const randomTime = start + Math.random() * (end - start);
  
  return new Date(randomTime);
}

// Define the RatingAndReview schema
const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
	createdAt: {
    type: Date,
    default: getDefaultDate
  }
});

// Export the RatingAndReview model
module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
