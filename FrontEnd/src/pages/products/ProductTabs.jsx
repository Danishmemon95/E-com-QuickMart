import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../Redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
    loadingProductReview,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product,
}) => {
    const { data, isLoading } = useGetTopProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col">
            <section>
                <div className="mt-4">
                    <div
                        className={`flex-1 py-4 cursor-pointer text-xl font-bold`}
                    >
                        Write Your Review
                    </div>
                    {userInfo ? (
                        <form onSubmit={submitHandler} className="ml-[4rem]">
                            <div className="my-2">
                                <label htmlFor="rating" className="block text-xl mb-2">
                                    Rating
                                </label>

                                <select
                                    id="rating"
                                    required
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Inferior</option>
                                    <option value="2">Decent</option>
                                    <option value="3">Great</option>
                                    <option value="4">Excellent</option>
                                    <option value="5">Exceptional</option>
                                </select>
                            </div>

                            <div className="my-2">
                                <label htmlFor="comment" className="block text-xl mb-2">
                                    Comment
                                </label>

                                <textarea
                                    id="comment"
                                    rows="3"
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loadingProductReview}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <p>
                            Please <Link to="/login">sign in</Link> to write a review
                        </p>
                    )}
                </div>

            </section>

            <section className="mt-5">
                <div
                    className={`flex-1 py-4 cursor-pointer text-xl font-bold`}
                >
                    All Reviews
                </div>
                <>
                    <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

                    <div className="bg-gray-100 w-fit rounded-lg ml-[4rem]">
                        {product.reviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-5 rounded-lg sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                            >
                                <div className="flex justify-between">
                                    <strong className="text-xl">{review.name}</strong>
                                    <p className="">
                                        {review.createdAt.substring(0, 10)}
                                    </p>
                                </div>

                                <div className="border-b last:border-b-0 pb-5">
                                    <p className="my-4">{review.comment}</p>
                                    <Ratings value={review.rating} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            </section>

            <section className="mt-5">
                <div
                    className={`flex-1 py-4 cursor-pointer text-xl font-bold`}
                >
                    Related Products
                </div>
                <section className="ml-[4rem] flex flex-wrap">
                    {!data ? (
                        <Loader />
                    ) : (
                        data.map((product) => (
                            <div key={product._id}>
                                <SmallProduct product={product} />
                            </div>
                        ))
                    )}
                </section>

            </section>
        </div>
    );
};

export default ProductTabs;