import Home from './pages/Home';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Success from './pages/Success';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
  
} from "react-router-dom";
import { useSelector } from 'react-redux';
const App=()=>{

  
  const user=useSelector((state)=>state.user.currentUser)
  
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products/:cat" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={ user==null ? <Login/> : <Home/>}  />
        <Route path="/register" element={ user==null ? <Register/> : <Home/>}  />
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </Router>
  );
  }
export default App;
