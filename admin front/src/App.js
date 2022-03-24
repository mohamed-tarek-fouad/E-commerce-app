
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import UserList from "./pages/userList/UserList.jsx";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.user.currentUser.isAdmin);
  return (
    
    
    <Router>
      < Routes>
        <Route path="/login" element={<Login/>}/>
    
        
        {admin && (
          <>
           
              <Route exact path="/" element={<Home/>}/>
                
              
              <Route path="/users" element={<UserList/>}/>
                
              <Route path="/user/:userId" element={<User/>}/>
                
              <Route path="/products" element={<ProductList/>}/>
                
              <Route path="/product/:productId"element={<Product/>}/>
              
              <Route path="/newproduct"element={<NewProduct/>}/>
                
            
          </>
      
       )}
      </ Routes>
    </Router>
    
 );
  
}

export default App;