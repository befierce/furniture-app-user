import Header from "../components/Header";
import Slider from "../components/Slider";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";
const Home = ()=>{
    return <>
        <Header></Header>
        <Slider></Slider>
        <img src="/payment-banner.webp" style={{ width: "100%" }} />
        <ProductsSection/>
        <Footer></Footer>
    </> 
}



export default Home;