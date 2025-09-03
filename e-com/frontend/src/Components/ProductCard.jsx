import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {

  return (
    <Link to={`/product/${product._id}`} state={{product}}>
    
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={product.image} 
            alt={product.name}
            className="rounded-xl h-90"
          />

        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <h3 className="text-lg">{product.price}</h3>
          <p className="my-3"><img src={`/ratings/rating-${product.rating}.png`} alt="" className="w-25"/></p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    
     </Link>
  )
}


export default ProductCard
