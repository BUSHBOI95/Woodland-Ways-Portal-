import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const GenerateInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const instructor = {
    name: 'Joe Philbin',
    email: 'joe@woodlandways.co.uk',
    address: 'The Cottage, Peak District, UK',
    ratePerDay: 150
  };

  const total =
    course?.duration === '2-day' ? instructor.ratePerDay * 2 : instructor.ratePerDay;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('INVOICE', 14, 20);

    doc.setFontSize(11);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [['Billed To', 'Course Info']],
      body: [
        [
          `${instructor.name}
${instructor.address}
${instructor.email}`,
          `${course.title}
${course.location}
${course.date}
${course.duration}`
        ]
      ]
    });

    autoTable(doc, {
      head: [['Description', 'Amount']],
      body: [
        ['Instructor Day Rate', `£${instructor.ratePerDay}`],
        ['Total Due', `£${total}`]
      ]
    });

    doc.save(`Invoice_${course.title.replace(/\s+/g, '_')}.pdf`);
  };

  const handleSubmitInvoice = () => {
    // Future: Send to admin + archive
    alert('Invoice submitted successfully!');
    navigate('/my-courses');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Invoice</h1>

      <div className="bg-gray-100 p-4 rounded shadow-sm text-sm space-y-2">
        <p><strong>Instructor:</strong> {instructor.name}</p>
        <p><strong>Email:</strong> {instructor.email}</p>
        <p><strong>Address:</strong> {instructor.address}</p>
        <p><strong>Course:</strong> {course?.title}</p>
        <p><strong>Date:</strong> {course?.date}</p>
        <p><strong>Rate:</strong> £{instructor.ratePerDay}/day</p>
        <p><strong>Total Due:</strong> £{total}</p>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-orange-500 text-white w-full py-2 rounded font-semibold"
      >
        Download Invoice (PDF)
      </button>

      <button
        onClick={handleSubmitInvoice}
        className="mt-3 bg-green-600 text-white w-full py-2 rounded font-semibold"
      >
        Submit Invoice
      </button>
    </div>
  );
};

export default GenerateInvoice;
