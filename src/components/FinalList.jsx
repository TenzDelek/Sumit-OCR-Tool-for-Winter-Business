import React from 'react';

const FinalList = ({ item }) => {
  return (
    <div className={`p-2 text-sm ${item === 0 ? 'bg-[#ff0505bb]' : 'bg-[#1F1F1F]'}  w-fit rounded-lg`}>
      {item === 0 ? "Zero Found" : `+${item} Rupee`}
    </div>
  );
}

export default FinalList;
