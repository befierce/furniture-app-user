import "./App.css";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { UseDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogin } from "./store/authSlice";
function App() {
  const dispatch = useDispatch()
  const uid = localStorage.getItem("uid") || "";
  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email");
  if(uid && email){
    dispatch(setLogin({uid, name,email}))
  }
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;