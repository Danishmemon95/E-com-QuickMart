import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/Cart/cartSlice";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        const newProduct = { ...product, qty };
        dispatch(addToCart(newProduct));
        toast.success("Item added successfully");
    };

    return (
        <div className="w-full max-w-sm relative rounded-lg shadow-lg bg-gray-800 hover:shadow-xl transition-shadow">
            <section className="relative">
                <Link to={/product/}>
                    <span className="absolute bottom-3 right-3 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {p?.brand}
                    </span>
                    <img
                        className="cursor-pointer w-full h-48 sm:h-56 object-cover rounded-t-lg"
                        src={p.image}
                        alt={p.name}
                    />
                </Link>
                <HeartIcon product={p} />
            </section>

            <div className="p-4 sm:p-5 min-h-[200px] flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
                    <h5 className="text-lg sm:text-xl text-white line-clamp-2">{p?.name}</h5>
                    <p className="text-white font-semibold text-lg whitespace-nowrap">
                        {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </p>
                </div>

                <p className="mb-4 font-normal text-[#CFCFCF] text-sm line-clamp-3">
                    {p?.description?.substring(0, 60)} ...
                </p>

                <section className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <Link
                        to={/product/}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors w-full sm:w-auto justify-center"
                    >
                        Read More
                        <FaArrowRightLong fontSize={"18px"} className="ml-2" />
                    </Link>

                    <button
                        className="p-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={() => addToCartHandler(p, 1)}
                    >
                        <AiOutlineShoppingCart size={25} className="text-white" />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default ProductCard;
