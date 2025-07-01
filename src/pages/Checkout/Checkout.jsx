import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../redux/slices/cartSlice";
import { API_BASE_URL } from "../../lib/configuration";
import { placeOrder } from "../../api/orderApi";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.cart);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setSubmitLoading(true);
    const data = {
      shop_id: localStorage.getItem("shop_id"),
      payment_method: "cod", // explicitly set COD
    };

    try {
      const result = await placeOrder(data);
      console.log(result);
      dispatch(fetchCart());
      navigate("/orders");
      setSubmitLoading(true);
    } catch (err) {
      console.error(err);
      setSubmitLoading(true);
    }
  };

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
    <div className="max-w-5xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-[#7a1c35]">Checkout</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Cart Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={`${API_BASE_URL}${item.image}`}
                    alt={item.product_name}
                    className="w-14 h-14 rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment Mode Selection */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#7a1c35]">
            Payment Method
          </h3>
          {["card", "upi", "cod"].map((method) => (
            <label
              key={method}
              className={`flex items-center mb-2 gap-3 cursor-pointer ${
                paymentMethod === method
                  ? "text-[#7a1c35] font-semibold"
                  : "text-gray-700"
              }`}
            >
              <div className="relative w-5 h-5">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={method !== "cod"}
                  className="peer appearance-none w-full h-full border-2 border-[#7a1c35] rounded-full checked:border-[#7a1c35] transition-all duration-200"
                />
                {/* Center circle dot */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 w-2 h-2 bg-[#7a1c35] rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-0 peer-checked:scale-100 transition-transform duration-200" />
              </div>
              <span className={method !== "cod" ? "opacity-50" : ""}>
                {method === "card" && "Credit/Debit Card"}
                {method === "upi" && "UPI"}
                {method === "cod" && "Cash on Delivery"}
              </span>
            </label>
          ))}

          <button
            className="flex items-center justify-center gap-2 mt-6 w-full bg-[#7a1c35] text-white py-2 rounded-xl text-lg cursor-pointer"
            onClick={handlePlaceOrder}
            disabled={submitLoading}
          >
            {submitLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Place Order</span>
              </>
            ) : (
              "Place Order"
            )}
          </button>
          <button
            className="mt-6 w-full text-black border border-[hsl(0,0%,89.8%)] py-2 rounded-xl text-lg cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
