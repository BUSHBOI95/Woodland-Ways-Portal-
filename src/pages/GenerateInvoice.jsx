import React from 'react';
import { useLocation } from 'react-router-dom';

const GenerateInvoice = () => {
  const course = useLocation().state?.course;

  const rate = 150; // Example flat day rate
  const total = course?.duration === '2-day' ? rate * 2 : rate;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold mb-4">Invoice</h1>
      <p className="text-sm text-gray-600 mb-2">{course?.title}</p>
      <p className="text-sm mb-2">Instructor: You</p>
      <p className="text-sm mb-2">Rate: £{rate}/day</p>
      <p className="text-sm mb-4 font-semibold">Total: £{total}</p>

      <button className="bg-orange-500 text-white w-full py-2 rounded font-semibold">
        Download Invoice (PDF)
      </button>
    </div>
  );
};

export default GenerateInvoice;
