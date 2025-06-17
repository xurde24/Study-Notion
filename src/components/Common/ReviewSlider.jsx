
/*.................................................................*/


import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

import "swiper/css";
import "swiper/css/free-mode";
import "../../App.css";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const truncateWords = 15;
  const maxReviews = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) {
          const limitedReviews = data.data.slice(0, maxReviews);
          setReviews(limitedReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 p-4 animate-pulse overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="h-48 w-full min-w-[280px] max-w-[320px] bg-richblack-800 rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="text-center py-10 text-richblack-200">
        No reviews available yet.
      </div>
    );
  }

  return (
    <div className="text-white my-12 w-full overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
              spaceBetween: 16
            },
            480: {
              slidesPerView: 1.3,
              spaceBetween: 18
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 22
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24
            }
          }}
          className="!overflow-visible"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i} className="!h-auto !w-auto">
              <div className="flex flex-col gap-4 bg-richblack-800 p-6 rounded-xl h-full min-h-[280px] max-w-[320px] mx-auto transition-all duration-300 hover:shadow-lg hover:shadow-richblack-700/30 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-richblack-600">
                      <img
                        src={
                          review?.user?.image ||
                          `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                        }
                        alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`;
                          e.target.className = "h-full w-full object-contain p-1 bg-richblack-700";
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-richblack-700 rounded-full p-1">
                      <div className="h-4 w-4 bg-yellow-100 rounded-full flex items-center justify-center">
                        <FaStar className="text-yellow-500 text-[8px]" />
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-richblack-5 text-lg truncate">
                      {`${review?.user?.firstName} ${review?.user?.lastName}`}
                    </h3>
                    <p className="text-xs text-richblack-300 font-medium truncate">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-richblack-50 flex-grow leading-relaxed line-clamp-5 pt-3.5">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")}...`
                    : review?.review}
                </p>

                <div className="flex items-center gap-2 mt-auto flex-wrap">
                  <span className="font-bold text-yellow-100 text-lg">
                    {review.rating.toFixed(1)}
                  </span>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    color="#3f3f46"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                    className="flex-shrink-0"
                  />
                  <span className="text-xs text-richblack-400 ml-auto">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;