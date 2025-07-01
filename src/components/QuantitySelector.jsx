import React from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-3 bg-gray-300 rounded px-2 py-2 shadow-sm w-fit mt-2">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-1.5 bg-white rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600 disabled:opacity-50 transition"
      >
        <Minus className="w-3 h-3" />
      </button>

      <span className="text-base font-medium text-white min-w-[20px] text-center">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="p-1.5 bg-white rounded-full text-gray-600 hover:bg-green-100 hover:text-green-600 transition"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}
