import React, { useState, useEffect } from "react";
import { stockData, indexData } from "../Data/Stock";
import BuySellComponent from "./BuySell";
import SearchBox from "./SearchBox";

const StockList = () => {
  const [stocks, setStocks] = useState(stockData); // Default view is stocks
  const [selectedStock, setSelectedStock] = useState(null);
  const [isViewingIndices, setIsViewingIndices] = useState(false); // Track if user is viewing indices

  useEffect(() => {
    // Function to check if market is open
    const isMarketOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const isWeekday = day >= 1 && day <= 5;
      const isTradingTime =
        (hours > 9 || (hours === 9 && minutes >= 15)) &&
        (hours < 15 || (hours === 15 && minutes <= 30));
      return isWeekday && isTradingTime;
    };

    // Function to update prices
    const updateStockPrices = (data) =>
      data.map((stock) => {
        const change = (Math.random() * 2 - 1) * (stock.price * 0.01); // ±1% change
        const newPrice = stock.price + change;
        const percentChange = ((change / stock.price) * 100).toFixed(2);
        return {
          ...stock,
          price: parseFloat(newPrice.toFixed(2)),
          change: change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
          percent_change: change >= 0 ? `+${percentChange}%` : `${percentChange}%`,
        };
      });

    let interval = null;
    if (isMarketOpen()) {
      interval = setInterval(() => {
        setStocks((prevStocks) => updateStockPrices(prevStocks));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 my-1 bg-white shadow-lg rounded-2xl">
      <SearchBox />

      {/* Tabs for Indices & Stocks */}
      <div className="flex gap-2 my-3">
        <button
          onClick={() => {
            setStocks(stockData); // Show stock data
            setIsViewingIndices(false);
          }}
          className={`text-xl font-semibold mb-4 py-1 px-2 rounded-xl w-fit ${
            !isViewingIndices ? "bg-blue-300" : "bg-gray-200"
          }`}
        >
          Stocks
        </button>
        <button
          onClick={() => {
            setStocks(indexData); // Show index data
            setIsViewingIndices(true);
          }}
          className={`text-xl font-semibold mb-4 py-1 px-2 rounded-xl w-fit ${
            isViewingIndices ? "bg-blue-300" : "bg-gray-200"
          }`}
        >
          Indices
        </button>
      </div>

      {/* List of Stocks or Indices */}
      <ul className="divide-y divide-gray-300">
        {stocks.map((stock, index) => (
          <li
            key={index}
            className="flex justify-between py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedStock(stock)}
          >
            <span className="font-medium">{stock.name}</span>
            <span className="flex flex-col items-end">
              <span className="font-semibold">₹{stock.price.toFixed(2)}</span>
              <span
                className={
                  stock.percent_change.startsWith("-") ? "text-red-500" : "text-green-500"
                }
              >
                {stock.percent_change}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Buy/Sell Component */}
      {selectedStock && <BuySellComponent stock={selectedStock} onClose={() => setSelectedStock(null)} />}
    </div>
  );
};

export default StockList;
