'use client';

import AddCartBtn from "./cart/addCartBtn";

export default function BoxBuilder() {
    return (
        <div className="relative bg-brand flex items-center justify-between px-4 sm:px-6">
            <div className="flex gap-3">
                {[1, 2, 3, 4].map((slot) => (
                    <div
                        key={slot}
                        className="w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center"
                    >
                        <span>+</span>
                    </div>
                ))}
            </div>
            <button>Add to Cart</button>
        </div>
    )
}