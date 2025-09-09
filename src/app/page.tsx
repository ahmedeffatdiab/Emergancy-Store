import MainSlider from "../app/components/Hero/MainSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCategory from "./components/Category/SliderCategory";
import { categoryData } from "../../utility/CategoryData";
import NewProducts from "./components/NewProducts/NewProducts";
import PopularProducts2 from "./components/PopularProduct/PopularProduct";
import Services from "./components/Services/Services";
import Brand from "./components/Brand/Brand";
export default function Home() {
  return (
    <main>
      <div className="container w-full mx-auto">
        <MainSlider/>
        <SliderCategory categoryData={categoryData}/>
        <PopularProducts2/>
        <NewProducts/>
        <Brand showPageHeading={true}/>
        <Services/>
      </div>
    </main>
  );
}

