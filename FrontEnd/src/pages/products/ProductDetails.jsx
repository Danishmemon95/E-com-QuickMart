import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from "../../Redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../Redux/features/Cart/cartSlice";

const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const { userInfo } = useSelector((state) => state.auth);

    const [createReview, { isLoading: loadingProductReview }] =
        useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Review created successfully");
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    return (
        <>
            <div className="mobile-header-spacing">
                <div className="container-responsive">
                    <div className="font-semibold text-xl sm:text-2xl flex items-center hover:underline mb-4">
                        <MdKeyboardBackspace className="mr-2 sm:mr-5" />
                        <Link to="/">Go Back</Link>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">
                            {error?.data?.message || error.message}
                        </Message>
                    ) : (
                        <>
                            <div className="flex flex-col lg:flex-row items-start lg:items-start gap-8">
                                <div className="w-full lg:w-1/2">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg"
                                    />
                                    <HeartIcon product={product} />
                                </div>

                                <div className="w-full lg:w-1/2 space-y-6">
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{product.name}</h2>
                                        <p className="text-[#B0B0B0] text-sm sm:text-base leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600">
                                        $ {product.price}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                                        <div className="flex items-center">
                                            <FaStore className="mr-2 text-gray-400" />
                                            <span className="font-medium">Brand:</span>
                                            <span className="ml-2">{product.brand}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <FaClock className="mr-2 text-gray-400" />
                                            <span className="font-medium">Added:</span>
                                            <span className="ml-2">{moment(product.createAt).fromNow()}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <FaStar className="mr-2 text-gray-400" />
                                            <span className="font-medium">Reviews:</span>
                                            <span className="ml-2">{product.numReviews}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <FaStar className="mr-2 text-gray-400" />
                                            <span className="font-medium">Rating:</span>
                                            <span className="ml-2">{product.rating}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <FaBox className="mr-2 text-gray-400" />
                                            <span className="font-medium">In Stock:</span>
                                            <span className="ml-2">{product.countInStock}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
                                        <Ratings
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                        />

                                        {product.countInStock > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-lg">Quantity:</span>
                                                <input
                                                    type="number"
                                                    value={qty}
                                                    onChange={(e) => {
                                                        const value = Number(e.target.value);
                                                        if (value > 0 && value <= product.countInStock) {
                                                            setQty(value);
                                                        }
                                                    }}
                                                    min="1"
                                                    max={product.countInStock}
                                                    className="p-2 w-20 rounded-lg text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={addToCartHandler}
                                            disabled={product.countInStock === 0}
                                            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <ProductTabs
                                    loadingProductReview={loadingProductReview}
                                    userInfo={userInfo}
                                    submitHandler={submitHandler}
                                    rating={rating}
                                    setRating={setRating}
                                    comment={comment}
                                    setComment={setComment}
                                    product={product}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
