import { useEffect, useState } from "react";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { API_BASE_URL } from "../../lib/configuration";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Layout/Footer";

export default function ProductDetails({}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState();
  const [product, setProduct] = useState([]);

  const thumbSettings = {
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    focusOnSelect: true,
  };
  useEffect(() => {
    // ;if (!id) return

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        const result = await res.json();
        if (result.success) {
          setProduct(result.data);
          setSelectedImage(`${API_BASE_URL}${result?.data?.images[0]}`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  console.log("product", product);
  return (
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 mt-4 p-4 px-6">
      <div className="flex gap-6 max-w-6xl mx-auto items-end justify-end overflow-visible">
        {/* Main Image Container with Fixed Height */}
        <div className="flex justify-center items-center border border-[hsl(0,0%,89.8%)] rounded w-full max-w-[400px] h-[500px] relative p-5">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Product Image",
                isFluidWidth: true,
                src: selectedImage,
              },
              largeImage: {
                src: selectedImage,
                width: 1200,
                height: 1800,
              },
              enlargedImagePosition: "beside",
            }}
          />
        </div>

        {/* Thumbnails */}

        <div className="w-[150px] max-h-[500px] p-4">
          <Slider {...thumbSettings}>
            {product?.images?.map((img, idx) => (
              <div key={idx} className="p-1">
                <div
                  onClick={() => setSelectedImage(`${API_BASE_URL}${img}`)}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={`${API_BASE_URL}${img}`}
                    alt={`Thumbnail ${idx}`}
                    width={120}
                    height={80}
                    className="object-contain w-full h-20"
                  />
                </div>
              </div>
            ))}
          </Slider>
          {/* </div> */}
        </div>
      </div>
      <div className="lg:w-[80%] md:w-[100%] p-3">
        <h1 className="lg:text-2xl md:text-xl text-bold">
          OnePlus 13s | Snapdragon® 8 Elite | Best Battery Life Ever on a
          Compact Phone | Lifetime Display Warranty | 12GB+256GB | Green Silk
        </h1>
        <div className="price mt-6">
          <p className="priceRed"> -80%</p>
          <p className="priceBlack"> {product?.price}</p>
        </div>
        <div className="variants mt-6">
          <div className="variant">
            <div className="variantHeading">Pepper</div>
          </div>
          <div className="variant mx-2">
            <div className="variantHeading">Salted</div>
          </div>
        </div>
        <div className="quantitys mb-6">
          <div className="quantity">
            <p>23g( pack of 1)</p>
          </div>
          <div className="quantity mx-2">
            <p>25g( pack of 1)</p>
          </div>
        </div>
        <div className="button">
          <button 
          className="cursor-pointer bg-[#6e2539] text-white hover:bg-[#7a1c35] hover:text-white px-4 py-2 rounded"
            onClick={()=> navigate("/cart")}
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
