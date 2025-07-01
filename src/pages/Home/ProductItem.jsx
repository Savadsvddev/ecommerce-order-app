import React, { useState } from "react";
import { API_BASE_URL } from "../../lib/configuration";
import { useNavigate } from "react-router-dom";

function ProductItem({ product }) {

   const sampleData=[
    {

    }
   ]
  const navigate = useNavigate();

  return (
    <div
      className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border border-[hsl(0,0%,89.8%)] rounded-lg hover:scale-105 hover:shadow-md transition-all ease-in-out cursor-pointer"
      onClick={() => navigate(`/product/${product?.product_id}`)}
    >
      {/* <Image src={"https://res.cloudinary.com/dvytn4u6i/image/upload/v1710678502/carrot_png_7crm54jnhoaaa46f_24b758a1ec.png"} */}
      <img
        // src={product?.product_images?.length ?`${API_BASE_URL}${product?.product_images?.[0]}`: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"}
        src={
          product?.image
            ? `${product?.image}`
            : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"
        }
        width={500}
        onError={(e) => {
          e.target.onerror = null; // prevents infinite loop
          e.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";
        }}
        height={200}
        alt={product.name}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg">{product.product_name}</h2>
      <div className="flex gap-3 items-center">
        {
          <h2 className="font-bold text-lg">
            $
            {product?.hasVariants
              ? product?.variants[0]?.subVariants[0]?.price
              : product?.price}
          </h2>
        }
        {/* <h2
          className={`font-bold text-lg ${200 && "line-through text-gray-500"}`}
        >
          ${100}
        </h2> */}
      </div>
    </div>
  );
}

export default ProductItem;
