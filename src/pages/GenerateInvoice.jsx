import React, { useEffect, useState } from 'react';
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

  const initials = instructor.name.split(" ").map(w => w[0]).join("").toUpperCase();

  const woodlandWays = {
    name: 'Woodland Ways',
    address: '123 Forest Trail\nPeak District, UK'
  };

  const total = course?.duration === '2-day' ? instructor.ratePerDay * 2 : instructor.ratePerDay;

  const [invoiceId, setInvoiceId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if already submitted
    const archive = JSON.parse(localStorage.getItem('invoiceArchive') || '[]');
    const match = archive.find(entry => entry.courseTitle === course.title);
    if (match) {
      setInvoiceId(match.invoiceId);
      setIsSubmitted(true);
    } else {
      // Generate next invoice ID
      const instructorInvoices = archive.filter(entry => entry.instructorInitials === initials);
      const nextNumber = instructorInvoices.length + 1;
      setInvoiceId(`${initials}${nextNumber.toString().padStart(4, '0')}`);
    }
  }, [course.title, initials]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('INVOICE', 14, 20);

    doc.setFontSize(11);
    doc.text(`Invoice ID: ${invoiceId}`, 14, 28);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 14, 36);

    autoTable(doc, {
      startY: 45,
      head: [['Billed To', 'Invoice From']],
      body: [
        [ `${woodlandWays.name}\n${woodlandWays.address}`, `${instructor.name}\n${instructor.address}\n${instructor.email}` ]
      ]
    });

    autoTable(doc, {
      head: [['Description', 'Amount']],
      body: [
        ['Instructor Day Rate', `£${instructor.ratePerDay}`],
        ['Total Due', `£${total}`]
      ]
    });

    doc.save(`Invoice_${invoiceId}.pdf`);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    const archive = JSON.parse(localStorage.getItem('invoiceArchive') || '[]');
    const newEntry = {
      invoiceId,
      instructorInitials: initials,
      courseTitle: course.title,
      amount: total,
      submittedAt: new Date().toISOString()
    };

    const updatedArchive = [...archive, newEntry];
    localStorage.setItem('invoiceArchive', JSON.stringify(updatedArchive));
    alert('Invoice submitted successfully!');
    navigate('/my-courses');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Invoice Preview</h1>

      <div className="bg-white shadow p-4 border border-gray-300 rounded text-sm space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">Billed To:</p>
            <p>{woodlandWays.name}</p>
            <p>{woodlandWays.address.split('\n').map((line, i) => (
              <span key={i}>{line}<br/></span>
            ))}</p>
          </div>
          <div>
            <p className="font-bold">Invoice From:</p>
            <p>{instructor.name}</p>
            <p>{instructor.address}</p>
            <p>{instructor.email}</p>
          </div>
        </div>

        <div>
          <p><strong>Invoice ID:</strong> {invoiceId}</p>
          <p><strong>Course:</strong> {course.title}</p>
          <p><strong>Date:</strong> {course.date}</p>
          <p><strong>Location:</strong> {course.location}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
        </div>

        <table className="w-full mt-2 text-left text-sm border-t pt-2">
          <thead>
            <tr>
              <th>Description</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Instructor Day Rate</td>
              <td className="text-right">£{instructor.ratePerDay}</td>
            </tr>
            <tr className="font-semibold border-t">
              <td>Total Due</td>
              <td className="text-right">£{total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 bg-orange-500 text-white w-full py-2 rounded font-semibold"
      >
        Download as PDF
      </button>

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          className="mt-3 bg-green-600 text-white w-full py-2 rounded font-semibold"
        >
          Submit Invoice
        </button>
      )}

      {isSubmitted && (
        <p className="text-center text-xs text-green-700 mt-2">Invoice already submitted.</p>
      )}
    </div>
  );
};

export default GenerateInvoice;
