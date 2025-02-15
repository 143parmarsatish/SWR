import React, { useEffect, useState } from 'react';
import PositionCard from '../Components/PositionCard';

const Position = () => {
  const [positions, setPositions] = useState([]); // Store API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  async function fetchPositionDetails() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/position/get-position`, {
        method: "GET",
        headers: {
          'authorization': localStorage.getItem('accessToken'),
        }
      });

      const result = await response.json();
      setPositions(result.data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    fetchPositionDetails();
  }, []);

  return (
    <div className='m-2 flex justify-center'>
      <div className='w-full max-w-4xl'>
        <div>
          <p className='font-bold text-xl text-center lg:text-left'>Position</p>
        </div>
        {/* Show loading state */}
        {loading && <p className='font-bold text-2xl text-center mt-5'>Loading positions...</p>}

        <div className='mt-2'>
          {positions.length > 0 ? (
            positions.map((position, index) => (
              <PositionCard
                key={index}
                title={position.Indices}
                buyPrice={position.buyPrice}
                sellPrice={position.sellPrice}
                lots={position.lot}
                gain={position.gain}
                showPosition={position.showPosition}
              />
            ))
          ) : (
            !loading && <p className='text-center'>No positions available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Position;
