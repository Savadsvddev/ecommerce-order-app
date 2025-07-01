import { useEffect, useState } from "react";
import Footer from "../../Layout/Footer";
import { deleteCart, getCartItems, updateCart } from "../../api/cartApi";
import { API_BASE_URL } from "../../lib/configuration";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";
import QuantitySelector from "../../components/QuantitySelector";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = async (id) => {
    const response = await deleteCart({ cart_id: id });
    console.log({ response });
    dispatch(fetchCart());
  };

  const handleUpdateQuantity = async (id, quantity) => {
    let data = {
      cart_id: id,
      quantity,
    };
    const response = await updateCart(data);
    console.log({ response });
    dispatch(fetchCart());
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6  text-[#7a1c35]">Your Cart</h2>

        {loading ? (
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
          <>
            {items.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border border-[hsl(0,0%,89.8%)] p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={`${API_BASE_URL}${item.image}`}
                          alt={item.product_name}
                          className="h-25 w-25 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{item.product_name}</h3>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                          <QuantitySelector
                            onDecrease={() =>
                              handleUpdateQuantity(
                                item.cart_id,
                                Number(item?.quantity) - 1
                              )
                            }
                            onIncrease={() =>
                              handleUpdateQuantity(
                                item.cart_id,
                                Number(item?.quantity) + 1
                              )
                            }
                            quantity={item?.quantity}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          ₹{item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => handleRemove(item.cart_id)}
                          className="text-sm text-red-500 hover:underline mt-1 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-right">
                  <p className="text-lg font-semibold">Total: ₹{total}</p>
                  <button
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
