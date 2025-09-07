import { useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../slices/cartItemsSlice';

const ProductDetails = () => {

  const { id:productId } = useParams();
  
  const { data:product,error,isLoading } = useGetProductDetailsQuery(productId);

  const [qty,setQty] = useState(1);

  const dispatch = useDispatch();

  const addToCartHandler = ()=>{

      dispatch(addToCart({...product,qty}))

  }

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
   
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
            <img
            src={product.image}
            className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <img src={`/ratings/rating-${product.rating}.png`} className='w-25 my-5 inline-block' alt="" /> 
            <span className='ml-3'>{product.numReviews} Reviews</span>
            <p className="py-6">
                {product.description}
            </p>
            <p>
              {
                product.countInStock > 0 ? "In Stock" : "Out of Stock"
              }
            </p>
            
              {
                product.countInStock > 0 && (
                  <div>
                    <label htmlFor="quantity">Quantity</label>

                    <form onChange = {(e)=>setQty(Number(e.target.value))} >

                      <select name="quantity" id="" className="select select-primary w-20 ml-2">
                        {[...Array(product.countInStock).keys()].map((count)=>(
                          <option key={count + 1} value={count+1}>{count+1}</option>
                        ))}
                     </select>

                    </form>

                  </div>
                    
                )
              }
            <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="btn btn-primary my-3 block">Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails