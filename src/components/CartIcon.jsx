import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartIcon({ cartLength }) {

  const navigate = useNavigate()

  return (
    <div className="relative w-fit cursor-pointer" onClick={()=> navigate("/cart")}>
      <ShoppingBag className="w-7 h-7 text-gray-800" />
      {cartLength > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#7a1c35] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {cartLength}
        </span>
      )}
    </div>
  );
}

export default CartIcon;
