import ProductCard from "../Components/ProductCard"
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomePage = () => {

  const { data:products,error,isLoading } = useGetProductsQuery();

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <>
    <div className="container max-w-7xl my-0 mx-auto">
      <h1 className="text-2xl ml-15">All Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
    </div>
    </>
  )
}


export default HomePage
