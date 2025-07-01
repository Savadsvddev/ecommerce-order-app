import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/homeApi";
import { API_BASE_URL } from "../../lib/configuration";

function CategoryList({ selectedCategory, setSelectedCategory }) {
  const staticData = [
    {
      created_at: "2025-05-16T09:40:54.000Z",
      id: "1",
      image:"/images/category/Samsung.webp",
      name:"Samsung"
    }, {
      created_at: "2025-05-16T09:40:54.000Z",
      id: "2",
      image:"/images/category/Apple.png",
      name:"Apple"
    }, {
      created_at: "2025-05-16T09:40:54.000Z",
      id: "3",
      image:"/images/category/vivo.png",
      name:"Vivo"
    }, {
      created_at: "2025-05-16T09:40:54.000Z",
      id: "4",
      image:"/images/category/oppo.png",
      name:"Oppo"
    }, {
      created_at: "2025-05-16T09:40:54.000Z",
      id: "5",
      image:"/images/category/realme.png",
      name:"Realme"
    },
  ];

  const [categories, setCategories] = useState(staticData);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await getCategories();
  //       console.log({ response });
  //       setCategories(response);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch orders:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  return (
    <div className="mt-5">
      <h2 className="text-[#7a1c35] font-bold text-2xl">
        Shopping by Category
      </h2>

      {loading ? (
        // <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-5 mt-2">
        //   {[...Array(5)].map((_, index) => (
        //     <div
        //       key={index}
        //       className="flex flex-col items-center bg-amber-100 gap-2 p-3 rounded-lg animate-pulse"
        //     >
        //       <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        //       <div className="w-16 h-4 bg-gray-300 rounded"></div>
        //     </div>
        //   ))}
        // </div>
        <div className="w-full w-100 flex items-center justify-center h-[200px]">
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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-5 mt-2">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory == category?.name ? "" : category?.name
                )
              }
              className={`flex flex-col max-w-50 items-center bg-amber-100 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-amber-600 ${
                category?.name == selectedCategory ? "bg-amber-600" : ""
              }`}
            >
              <img
                src={`${category.image}`}
                width={50}
                height={50}
                alt="icon"
                className="group-hover:scale-125 transition-all ease-in-out"
              />
              <h2 className="text-white-800">{category.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
