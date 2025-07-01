import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/Carousel";

function Slider({}) {
  const banners = [ 
    "/images/banner/mobile-banner_10.avif",
    "/images/banner/mobile-banner_11.avif",
    "/images/banner/mobile-banner_2.webp",
    "/images/banner/mobile-banner_7.jpg",
     "/images/banner/mobile-banner_6.png",]
  

  return (
    <Carousel>
      <CarouselContent>
        {banners.map((slider, index) => (
          <CarouselItem key={index}>
            {/* <Image src={"https://res.cloudinary.com/dvytn4u6i/image/upload/v1710679727/vegetable_grocery_facebook_cover_design_template_354609_59_transformed_1_b981bd8a32.png"} */}
            <img
              src={slider}
              width={1000}
              height={400}
              alt="slider"
              className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;
