import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../Redux/api/orderApiSlice";
import { clearCartItems } from "../../Redux/features/Cart/cartSlice";

const PlaceOrder = () => {
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate("/shipping");
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <>
            <ProgressSteps step1 step2 step3 />

            <div className="container mx-auto mt-8">
                {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <td className="px-1 py-2 text-left font-bold  align-top">Image</td>
                                    <td className="px-1 py-2 text-left font-bold ">Product</td>
                                    <td className="px-1 py-2 text-left font-bold ">Quantity</td>
                                    <td className="px-1 py-2 text-left font-bold ">Price</td>
                                    <td className="px-1 py-2 text-left font-bold ">Total</td>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>

                                        <td className="p-2">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </td>
                                        <td className="p-2">{item.qty}</td>
                                        <td className="p-2">{item.price.toFixed(2)}</td>
                                        <td className="p-2">
                                            $ {(item.qty * item.price).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-[3rem]">
                    <h2 className="text-2xl font-bold ">Order Summary</h2>
                    <div className="flex justify-between flex-wrap p-8">
                        <ul className="text-lg">
                            <li>
                                <span className="font-bold mb-4">Items:</span> $
                                {cart.itemsPrice}
                            </li>
                            <li>
                                <span className="font-bold mb-4">Shipping:</span> $
                                {cart.shippingPrice}
                            </li>
                            <li>
                                <span className="font-bold mb-4">Tax:</span> $
                                {cart.taxPrice}
                            </li>
                            <li>
                                <span className="font-bold mb-4">Total:</span> $
                                {cart.totalPrice}
                            </li>
                        </ul>

                        {error && <Message variant="danger">{error.data.message}</Message>}

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                            <p>
                                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                            <strong>Method:</strong> {cart.paymentMethod}
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                        className="flex justify-center gap-2 items-center mx-auto shadow-xl text-2xl bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group hover:bg-emerald-500"
                    >
                        Place Order
                        <svg
                            className="w-8 h-8 justify-end bg-emerald-400 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                            viewBox="0 0 16 19"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                className="fill-gray-800 group-hover:fill-gray-800"
                            ></path>
                        </svg>
                    </button>


                    {isLoading && <Loader />}
                </div>
            </div>
        </>
    );
};

export default PlaceOrder;