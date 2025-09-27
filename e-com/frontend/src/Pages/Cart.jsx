import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeCart } from "../slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingPrice, taxPrice, totalPrice } = useSelector(
    (state) => state.cart
  );

  const itemPrice = cartItems?.reduce((acc, item) => acc + item.price * item.qty, 0) || 0;


  const { userInfo } = useSelector((state) => state.auth);

  const handleQtyChange = (id, newQty) => {
    dispatch(updateQty({ id, qty: Number(newQty) }));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCart(id));
  };

  // useEffect(() => {
  //   if (userInfo && userInfo.cart) {
  //     dispatch(setCartFromServer(userInfo.cart));
  //   }
  // }, [userInfo, dispatch]);

  const checkoutHandler = () => {
    navigate(userInfo ? "/shipping" : "/login?redirect=/shipping");
  };

  return (
    <main className="p-5 bg-gray-900 text-gray-100 min-h-screen">
      {cartItems && cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <div className="lg:col-span-2">
            {cartItems.map((product) => (
              <div key={product._id} className="hero bg-gray-800 my-5 rounded-lg shadow-lg">
                <div className="hero-content flex-col lg:flex-row">
                  <img src={product.image} className="w-40 rounded-lg shadow-2xl" alt={product.name} />
                  <div className="ml-5 relative">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <img
                      src={`/ratings/rating-${product.rating}.png`}
                      className="w-25 my-5 inline-block"
                      alt=""
                    />
                    <span className="ml-3">{product.numReviews} Reviews</span>
                    <p>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
                    <p className="my-4 font-bold text-md">₹{product.price}</p>

                    {product.countInStock > 0 && (
                      <div>
                        <label htmlFor="quantity">Quantity</label>
                        <select
                          name="quantity"
                          value={product.qty}
                          className="select select-primary w-20 ml-2 bg-gray-700 text-white border-gray-600"
                          onChange={(e) => handleQtyChange(product._id, e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((count) => (
                            <option key={count + 1} value={count + 1}>
                              {count + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <button
                      onClick={() => removeCartItemHandler(product._id)}
                      className="cursor-pointer absolute right-0 bottom-2 text-red-500 hover:text-red-600"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-5 rounded-lg shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
            <p className="flex justify-between my-2">
              <span>Items Price:</span> <span>₹{itemPrice?.toFixed(0) || 0}</span>
            </p>
            <p className="flex justify-between my-2">
              <span>Shipping:</span> <span>₹{shippingPrice || 0}</span>
            </p>
            <p className="flex justify-between my-2">
              <span>GST (18%):</span> <span>₹{taxPrice?.toFixed(0) || 0}</span>
            </p>
            <hr className="my-3 border-gray-600" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span> <span>₹{totalPrice || 0}</span>
            </p>
            <button onClick={checkoutHandler} className="btn btn-primary w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-100 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-30 text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h12.1a1 1 0 00.9-1.5L17 13M7 13V6h10v7M9 21a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          
          <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>

          <p className="text-gray-400 mb-6 text-center max-w-sm">
            Looks like you haven't added any items to your cart yet. Start shopping to find your favorites!
          </p>
        
          <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition">
            Shop Now
          </a>
        </div>
      )}
    </main>

  );
};

export default Cart;
