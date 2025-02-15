import React, { useState, useEffect } from "react";
import stockData from "../Data/Stock";
import BuySellComponent from "./BuySell";

const StockList = () => {
  const [stocks, setStocks] = useState(stockData);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    // Function to check if market is open
    const isMarketOpen = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Check if it's Monday to Friday
      const isWeekday = day >= 1 && day <= 5;

      // Check if it's between 9:15 AM and 3:30 PM
      const isTradingTime =
        (hours > 9 || (hours === 9 && minutes >= 15)) &&
        (hours < 15 || (hours === 15 && minutes <= 30));

      return isWeekday && isTradingTime;
    };

    // Function to update stock prices
    const updateStockPrices = () => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const change = (Math.random() * 2 - 1) * (stock.price * 0.01); // ±1% change
          const newPrice = stock.price + change;
          const percentChange = ((change / stock.price) * 100).toFixed(2);
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
            percent_change: change >= 0 ? `+${percentChange}%` : `${percentChange}%`,
          };
        })
      );
    };

    // Set interval only if market is open
    let interval = null;
    if (isMarketOpen()) {
      interval = setInterval(updateStockPrices, 1000);
    }

    // Cleanup on unmount or if market closes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 my-2 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4 bg-gray-200 p-2 rounded-xl w-fit">Stocks</h2>
      <ul className="divide-y divide-gray-300">
        {stocks.map((stock, index) => (
          <li
            key={index}
            className="flex justify-between py-2 cursor-pointer"
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
      {selectedStock && <BuySellComponent stock={selectedStock} onClose={() => setSelectedStock(null)} />}
    </div>
  );
};

export default StockList;
