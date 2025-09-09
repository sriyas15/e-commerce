import { useSelector, useDispatch } from "react-redux";
import { updateQty,removeCart } from "../slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Cart = () => {
  const { cartItems, itemPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQtyChange = (id, newQty) => {
    dispatch(updateQty({ id, qty: Number(newQty) }));
  };

  const removeCartItemHandler = (id)=>{
    
    dispatch(removeCart(id))
  } 
  

  return (
    <main className="p-5">
      {cartItems && cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          {/* LEFT SIDE - Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.map((products) => (
              <div key={products._id} className="hero bg-base-200 my-5">
                <div className="hero-content flex-col lg:flex-row ">
                  <img src={products.image} className="w-40 rounded-lg shadow-2xl" />
                  <div className="ml-5 relative">
                    <h1 className="text-2xl font-bold">{products.name}</h1>
                    <img
                      src={`/ratings/rating-${products.rating}.png`}
                      className="w-25 my-5 inline-block"
                      alt=""
                    />
                    <span className="ml-3">{products.numReviews} Reviews</span>
                    <p>{products.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
                    <p className="my-4 font-bold text-md">₹{products.price}</p>
                    {products.countInStock > 0 && (
                      <div>
                        <label htmlFor="quantity">Quantity</label>
                        <select
                          name="quantity"
                          value={products.qty}
                          className="select select-primary w-20 ml-2"
                          onChange={(e) => handleQtyChange(products._id, e.target.value)}
                        >
                          {[...Array(products.countInStock).keys()].map((count) => (
                            <option key={count + 1} value={count + 1}>
                              {count + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <button onClick={()=>removeCartItemHandler(products._id)}
                     className="cursor-pointer absolute right-0 bottom-2">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - Checkout Details */}
          <div className="bg-base-200 p-5 rounded-lg shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
            <p className="flex justify-between my-2">
              <span>Items Price:</span> <span>₹{itemPrice.toFixed(0) || 0}</span>
            </p>
            <p className="flex justify-between my-2">
              <span>Shipping:</span> <span>₹{shippingPrice || 0}</span>
            </p>
            <p className="flex justify-between my-2">
              <span>GST (18%):</span> <span>₹{taxPrice.toFixed(0) || 0}</span>
            </p>
            <hr className="my-3" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span> <span>₹{totalPrice || 0}</span>
            </p>
            <Link to='/checkout'><button className="btn btn-primary w-full mt-5">Proceed to Checkout</button></Link>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </main>
  );
};

export default Cart;
