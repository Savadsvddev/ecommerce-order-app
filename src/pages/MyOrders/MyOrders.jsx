import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../api/orderApi";
import moment from "moment/moment";
import { API_BASE_URL } from "../../lib/configuration";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrders();
        console.log({ response });
        setOrders(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-[#7a1c35]">My Orders</h2>

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
          {orders.length === 0 ? (
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="border border-[hsl(0,0%,89.8%)] rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        Order ID: {order.order_id}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Date:{" "}
                        {moment(order.ordered_at)?.format(
                          "DD MMM YYYY hh:mm A"
                        )}
                      </p>

                      <div className="mt-4 space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <img
                              src={
                                item?.hasVariants
                                  ? `${API_BASE_URL}${item?.subvariant?.image}`
                                  : `${API_BASE_URL}${item?.product?.image}`
                              }
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded border border-[hsl(0,0%,89.8%)] p-1"
                            />
                            <div>
                              <p className="text-gray-800 font-medium">
                                {item.product?.name}
                              </p>
                              <p className="text-gray-500 text-sm">
                                Price: {item.price * item.quantity}
                              </p>
                              <p className="text-gray-500 text-sm">
                                Qty: {item.quantity} x {item?.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-right md:text-left md:w-40 flex flex-col justify-between">
                      <p className="font-bold text-lg text-gray-800">
                        ₹{order.total_amount}
                      </p>
                      <p
                        className={`mt-2 text-sm font-semibold ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : order.status === "Processing"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
