import React from "react";

const BuySellComponent = ({ stock, onClose }) => {
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-800 opacity-95 z-50 p-4 flex justify-center items-center">
            <div className="p-4 bg-white shadow-lg rounded-lg w-80 border">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">{stock.name}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
                </div>
                <p className="mb-2">Price: ₹{stock.price.toFixed(2)}</p>
                <div className="flex justify-between">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Buy</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Sell</button>
                </div>
            </div>
        </div>
    );
};

export default BuySellComponent;
