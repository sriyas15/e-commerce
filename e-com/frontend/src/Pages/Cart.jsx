import cartItems from "../slices/cartItemsSlice";
import { useSelector,useDispatch } from "react-redux";
import { addToCart } from "../slices/cartItemsSlice";

const Cart = () => {

  const {cartItem} = useSelector((state)=>state.cart);
  console.log(cartItem);

  const dispatch = useDispatch();

  dispatch(addToCart(5))

  return (
    <div>

    </div>
  )
}

export default Cart