import { createRoot } from 'react-dom/client';
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route, } from "react-router-dom";
import {Provider} from 'react-redux';
import './index.css';
import App from './App.jsx';
import HomePage from './Pages/HomePage.jsx';
import Cart from './Pages/Cart.jsx';
import ProductDetails from './Pages/ProductDetails.jsx';
import Checkout from './Pages/Checkout.jsx';
import store from './store.js';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>

            <Route index={true} path='/'  element={<HomePage/>}/>
            <Route path='/cart'  element={<Cart/>}/>
            <Route path='/product/:id'  element={<ProductDetails/>}/>
            <Route path='/checkout'  element={<Checkout/>}/>

        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>
);
