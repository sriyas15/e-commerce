import ProductCard from "../Components/ProductCard"
import { useEffect, useState } from "react";
import axios from 'axios';

const HomePage = () => {

  const [products,setProducts] = useState([]);

  useEffect(()=>{

    const fetchProducts = async()=>{

      const {data} = await axios.get('http://localhost:5000/api/products');
      
      setProducts(data);

      console.log(products);

    }

    fetchProducts();

  },[])

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
