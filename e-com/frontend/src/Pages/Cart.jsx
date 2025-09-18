import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeCart,setCartFromServer } from "../slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems: reduxCartItems, itemPrice, shippingPrice, taxPrice, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { userInfo } = useSelector((state) => state.auth);

  // If user is logged in, prefer DB cart (from userInfo)
  const cartItems = userInfo?.cart ?? reduxCartItems;

  const handleQtyChange = (id, newQty) => {
    dispatch(updateQty({ id, qty: Number(newQty) }));

    // await updateUserCart({ id, qty: Number(newQty) })
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCart(id));

    // await removeFromUserCart(id)
  };

  useEffect(() => {
    if (userInfo && userInfo.cart) {
      dispatch(setCartFromServer(userInfo.cart));
    }
  }, [userInfo, dispatch]);

  const checkoutHandler = () => {
    if (cartItems.length === 0) return;
    navigate(userInfo ? "/shipping" : "/login?redirect=/shipping");
  };

  return (
    <main className="p-5">
      {cartItems && cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      
          <div className="lg:col-span-2">
            {cartItems.map((product) => (
              <div key={product._id} className="hero bg-base-200 my-5">
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
                          className="select select-primary w-20 ml-2"
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
                      className="cursor-pointer absolute right-0 bottom-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-base-200 p-5 rounded-lg shadow-lg h-fit">
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
            <hr className="my-3" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span> <span>₹{totalPrice || 0}</span>
            </p>
            <button onClick={checkoutHandler} className="btn btn-primary w-full mt-5">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </main>
  );
};

export default Cart;
