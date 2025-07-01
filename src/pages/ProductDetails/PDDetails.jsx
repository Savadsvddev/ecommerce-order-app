import { useEffect, useState } from "react";
import Slider from "react-slick";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../lib/configuration";
import { addToCart, getCartItems } from "../../api/cartApi";
import { fetchCart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);

  const sampleData = {
    category: "Samsung",
    hasVariants: true,
    created_at: "2025-06-19T08:09:30.000Z",
    // image: "/images/products/Samsung-S23-Ultra.webp",
    // price: "71000",
    // discription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    product_id: "1",
    name: "Samsung-S23-Ultra",
    variants: [
      {
        id: "1",
    // discription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        name: "128-GB",
        product_id: "1",
        subVariant: [
          {
            id: "1",
            price: "70000",
    discription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

            quantity: "Black",

            images: [
              "/images/products/Samsung-S23-Ultra.webp",
              "/images/products/Samsung-S23-Ultra3.avif",
            ],
          },
          {
            id: "2",
            price: "80000",
            quantity: "White",
    discription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",


            images: [
              "/images/products/Samsung-S23-Ultra2.jpg",
              "/images/products/samsung-s23-ultra4.webp",
            ],
          },
        ],
      },
      {
        id: "2",
        name: "256-GB",
        product_id: "1",
        subVariant: [
          {
            id: "1",
            price: "75000",
    discription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

            quantity: " Red",
            package_type: "CTR",
            images: ["/images/products/Samsung-S23-Ultra5.avif"],
          },
        ],
      },
    ],
  };
  const [selectedImage, setSelectedImage] = useState(
    sampleData?.variants[0]?.subVariant[0]?.images[0]
  );
  const [productData, setProductData] = useState(sampleData);
  const [selectedVariant, setSelectedVariant] = useState(
    sampleData?.variants[0]
  );
  const [selectedSubVariant, setSelectedSubVariant] = useState(
    sampleData?.variants[0]?.subVariant[0]
  );
  const [loading, setLoading] = useState("");
  const [addToCartLoading, setAddToCartLoading] = useState("");

  const thumbSettings = {
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    focusOnSelect: true,
    swipeToSlide: true,
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(`${API_BASE_URL}/products/${id}`);
  //       const result = await res.json();
  //       if (result.success) {
  //         let data = result?.data;
  //         setProductData(data);
  //         setSelectedImage(`${API_BASE_URL}${data?.images[0]}`);
  //         if (data && data?.hasVariants) {
  //           setSelectedVariant(data?.variants[0]);
  //           setSelectedSubVariant(data?.variants[0]?.subVariant[0]);
  //           setSelectedImage(
  //             `${API_BASE_URL}${data?.variants[0]?.subVariant[0]?.images[0]}`
  //           );
  //         }
  //       }
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(fetchCart());
  }, [dispatch, localStorage.getItem("token")]);

  const handleAddToCart = async () => {
    if (localStorage.getItem("token")) {
      setAddToCartLoading(true);
      if (productData?.hasVariants) {
        const cartData = {
          shop_id: localStorage.getItem("shop_id"),
          product_id: id,
          hasVariants: 1,
          variant_id: selectedVariant?.id,
          subvariant_id: selectedSubVariant?.id,
          quantity: 1,
          
        };

        try {
          const result = await addToCart(cartData);
          console.log(result);
          dispatch(fetchCart());
          setAddToCartLoading(false);
        } catch (err) {
          setAddToCartLoading(false);
          console.error(err);
        }
      } else {
        const cartData = {
          shop_id: localStorage.getItem("shop_id"),
          product_id: id,
          hasVariants: 0,
          quantity: 1,
        };

        try {
          const result = await addToCart(cartData);
          console.log(result);
          dispatch(fetchCart());
          setAddToCartLoading(false);
        } catch (err) {
          console.error(err);
          setAddToCartLoading(false);
        }
      }
    } else {
      localStorage.setItem("redirectTo", window.location.pathname);
      navigate("/login");
    }
  };

  const isItemInCart = () => {
    if (productData?.hasVariants) {
      return items?.some(
        (ele) =>
          ele?.product_id == id &&
          ele?.variant_id === selectedVariant?.id &&
          ele?.subvariant_id === selectedSubVariant?.id
      );
    } else {
      return items?.some((ele) => ele?.product_id == id);
    }
  };

  const handleVariantSelect = (obj) => {
    setSelectedVariant(obj);
    setSelectedSubVariant(obj?.subVariant[0]);
    setSelectedImage(`${obj?.subVariant[0]?.images[0]}`);
  };

  const handleSubVariantSelect = (obj) => {
    setSelectedSubVariant(obj);
    setSelectedImage(`${obj?.images[0]}`);
  };

  console.log("selectedSubVariant", selectedSubVariant);
  console.log("selectedVariant", selectedVariant);
  return loading ? (
    <div className="w-full w-100 flex items-center justify-center h-[400px]">
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-300 fill-[#7a1c35]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex gap-4">
        <div className="w-[80px] h-[500px]">
          <Slider {...thumbSettings}>
            {(productData?.hasVariants
              ? selectedSubVariant
              : productData
            )?.images?.map((img, idx) => (
              <div
                key={idx}
                className="p-1 border border-[hsl(0,0%,89.8%)] rounded-md"
              >
                <img
                  src={`${img}`}
                  alt={`thumb-${idx}`}
                  onClick={() => setSelectedImage(`${img}`)}
                  className={`cursor-pointer w-full h-20 object-cover ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex-1 h-[500px] flex items-center justify-center border border-gray-200 rounded p-4">
          <Zoom>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-[450px] object-contain rounded"
            />
          </Zoom>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 capitalize">
          {productData?.name}
        </h1>
        <p className="text-xl text-green-600 font-semibold">
          ₹
          {productData?.hasVariants
            ? selectedSubVariant?.price 
            : productData?.price}

        </p>
        <p className="text-sm text-black-600 ">
          
          {productData?.hasVariants
            ? selectedSubVariant?.discription 
            : productData?.discription}
            
        </p>

        {productData?.hasVariants ? (
          <>
            <div className="variants mt-6 ">
              {productData?.variants?.map((ele, i) => (
                <div
                  className={`variant ${
                    i > 0 ? "mx-2 " : ""
                  } border border-2 border-dashed ${
                    selectedVariant?.id === ele?.id
                      ? "border-[#EE8821] border-2 border-solid"
                      : ""
                  }`}
                  onClick={() => handleVariantSelect(ele)}
                >
                  <div className="variantHeading capitalize p-4">
                    {ele?.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="quantitys mb-6">
              {selectedVariant?.subVariant?.map((ele, i) => (
                <div
                  className={`quantity ${
                    i > 0 ? "mx-2" : ""
                  } border border-2 border-dashed ${
                    selectedSubVariant?.id === ele?.id
                      ? "border-[#EE8821] border-2 border-solid"
                      : ""
                  }`}
                  onClick={() => handleSubVariantSelect(ele)}
                >
                  <p>{`${ele?.quantity}`}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}

        <p className="text-gray-600 capitalize">
          {productData?.hasVariants
            ? selectedSubVariant?.description
            : productData?.description}
        </p>

        {/* <button
          className="bg-[#6e2539] cursor-pointer text-white px-6 py-2 rounded  font-semibold hover:bg-[#611428] transition-all"
          onClick={() =>
            isItemInCart() ? navigate("/cart") : handleAddToCart()
          }
        >
          {isItemInCart() ? "Go to Cart" : "Add to Cart"}
        </button> */}

        {isItemInCart() ? (
          <button
            onClick={() => navigate("/cart")}
            className="cursor-pointer text-white bg-[#F4C87F] px-4 py-2 rounded-lg font-semibold hover:bg-[#EE8821] transition-all"
          >
            Go to Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={addToCartLoading}
            className="cursor-pointer flex items-center justify-center gap-2 text-black bg-[#F4C87F] px-4 py-2 rounded-lg font-semibold hover:bg-[#EE8821] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {addToCartLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Add to Cart</span>
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
