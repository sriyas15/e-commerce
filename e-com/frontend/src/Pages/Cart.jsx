import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,updateQty } from "../slices/cartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  
  const dispatch = useDispatch();

  const handleQtyChange = (id,newQty)=>{
    dispatch(updateQty({ id, qty: Number(newQty) }))
  }

  return( 
    <main>


      {cartItems && cartItems.length > 0 ? (
        cartItems.map((products) => (
          
            <div className="hero bg-base-200 my-5">
              <div className="hero-content flex-col lg:flex-row ">
                  <img
                  src={products.image}
                  className="w-50 rounded-lg shadow-2xl"
                  />
                  <div>
                  <h1 className="text-2xl font-bold">{products.name}</h1>
                  <img src={`/ratings/rating-${products.rating}.png`} className='w-25 my-5 inline-block' alt="" /> 
                  <span className='ml-3'>{products.numReviews} Reviews</span>
                  {/* <p className="py-6">
                      {product.description}
                  </p> */}
                  <p>
                    {
                      products.countInStock > 0 ? "In Stock" : "Out of Stock"
                    }
                  </p>
                  <p className='my-4 font-bold text-md'>{products.price}</p>
                    {
                      products.countInStock > 0 && (
                        <div>
                          <label htmlFor="quantity">Quantity</label>

                          <form onChange = {(e)=>handleQtyChange(products._id,e.target.value)} >

                            <select name="quantity" id="" value={products.qty} className="select select-primary w-20 ml-2">
                              {[...Array(products.countInStock).keys()].map((count)=>(
                                <option key={count + 1} value={count+1}>{count+1}</option>
                              ))}
                          </select>

                          </form>
                        </div>
                          
                      )
                    }
                  {/* <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="btn btn-primary my-3 block">Buy Now</button> */}
                  </div>
              </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}

    </main>
  )
};

export default Cart;
