import { useLocation, useParams } from 'react-router-dom'

const ProductDetails = () => {

  const {id} = useParams();
  const location = useLocation()
  const product = location.state?.product;

  console.log(product);

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
                    <select name="quantity" id="" className="select select-primary w-20 ml-2">
                    {[...Array(product.countInStock).keys()].map((count)=>(
                      <option key={count + 1} value={count+1}>{count+1}</option>
                    ))}
                     </select>
                  </div>
                    
                )
              }
            <button disabled={product.countInStock === 0} className="btn btn-primary my-3 block">Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails