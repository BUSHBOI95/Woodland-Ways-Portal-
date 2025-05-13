import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

const GenerateInvoice = () => {
  const location = useLocation();
  const course = location.state?.course;

  const instructor = {
    name: 'Joe Philbin',
    email: 'joe@woodlandways.co.uk',
    ratePerDay: 150,
    address: 'The Cottage, Peak District, UK'
  };

  const total = course?.duration === '2-day' ? instructor.ratePerDay * 2 : instructor.ratePerDay;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('INVOICE', 14, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

    doc.text(`Billed To:`, 14, 45);
    doc.text(instructor.name, 14, 52);
    doc.text(instructor.address, 14, 58);
    doc.text(instructor.email, 14, 64);

    doc.text(`Course: ${course.title}`, 14, 80);
    doc.text(`Location: ${course.location}`, 14, 86);
    doc.text(`Date: ${course.date}`, 14, 92);
    doc.text(`Duration: ${course.duration}`, 14, 98);

    doc.text(`Day Rate: £${instructor.ratePerDay}`, 14, 110);
    doc.text(`Total: £${total}`, 14, 118);

    doc.save(`Invoice_${course.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Invoice Summary</h1>

      <div className="bg-gray-100 p-4 rounded shadow-sm text-sm space-y-2">
        <p><strong>Instructor:</strong> {instructor.name}</p>
        <p><strong>Email:</strong> {instructor.email}</p>
        <p><strong>Course:</strong> {course?.title}</p>
        <p><strong>Date:</strong> {course?.date}</p>
        <p><strong>Location:</strong> {course?.location}</p>
        <p><strong>Rate:</strong> £{instructor.ratePerDay}/day</p>
        <p><strong>Total:</strong> £{total}</p>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-orange-500 text-white w-full py-2 rounded font-semibold"
      >
        Download Invoice (PDF)
      </button>
    </div>
  );
};

export default GenerateInvoice;
