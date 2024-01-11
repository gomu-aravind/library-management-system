import AboutUs from "../components/Home/AboutUs";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import Home from "../components/Home/Home";
import HowItWorks from "../components/Home/HowItWorks";
import Pricing from "../components/Home/Pricing";
import Testimonial from "../components/Home/Testimonials";

function HomePage(){
    return <>
    <Home/>
    <HowItWorks/>
    <AboutUs/>
    <Pricing/>
    <Testimonial/>
    <Footer/>
    </>
}


export default HomePage;