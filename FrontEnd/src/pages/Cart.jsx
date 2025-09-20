import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../Redux/features/Cart/cartSlice"

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="mobile-header-spacing">
        <div className="container-responsive">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <Link 
                to="/shop" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go To Shop
              </Link>
            </div>
          ) : (
            <>
              <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-full sm:w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link 
                          to={/product/} 
                          className="text-blue-500 text-lg font-bold hover:underline line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="text-gray-600 mt-1">{item.brand}</div>
                        <div className="text-xl font-bold text-green-600 mt-2">
                          $ {item.price}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <select
                          className="p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>

                        <button
                          className="text-red-500 hover:text-red-700 p-2"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                      <h2 className="text-xl sm:text-2xl font-semibold">
                        Total Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      </h2>
                      <div className="text-2xl sm:text-3xl font-bold text-green-600">
                        
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
