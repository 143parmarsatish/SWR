import React from 'react'

const PositionCard = ({ title, buyPrice, sellPrice, lots, gain, showPosition }) => {
    return (
      showPosition ? (
        <div className="bg-gray-100 shadow-lg rounded-2xl p-4 mb-4 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm">Intraday</p>
          <div className="mt-2">
            <p className="text-gray-600">
              <span className="font-semibold">Avg buy price:</span> ₹{buyPrice}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Avg sell price:</span> ₹{sellPrice}
            </p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-gray-700 font-medium">
              Total lot: <span className="font-semibold">{lots}</span>
            </p>
            <p
          className={`font-semibold text-lg ${
            gain >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          ₹ {gain}
        </p>
          </div>
        </div>) : ( <p>No Position Available</p> )
      );
}

export default PositionCard