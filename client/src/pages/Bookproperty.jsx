import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import Loader from '../components/Loader.jsx';

function PropertyBooking() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Properly extract property from either state or localStorage
  let property = null;

  try {
    const stored = JSON.parse(localStorage.getItem('bookingInfo'));

    if (state?.seller && state?.title) {
      property = state;
    } else if (stored?.seller && stored?.title) {
      property = stored;
    } else if (stored?.property?.seller && stored?.property?.title) {
      property = stored.property; // legacy fallback
    }
  } catch (e) {
    console.warn("Failed to parse booking info from localStorage:", e);
  }

  // Save booking info to localStorage for refresh persistence
  useEffect(() => {
    if (state) {
      localStorage.setItem('bookingInfo', JSON.stringify(state));
    }
  }, [state]);

  console.log("property:", property);
  console.log("property.seller:", property?.seller);
  console.log("properties (raw):", localStorage.getItem('bookingInfo'));
  console.log("user:", localStorage.getItem('user'));

  if (!property || !user) {
    return (
      <div className="p-6 text-red-500 text-center text-xl">
        Invalid booking session...<br />Please go back and try again.
      </div>
    );
  }

  if (!property?.seller) {
    return (
      <div className="p-6 text-red-500 text-center">
        Seller data is missing. Please try again later.
      </div>
    );
  }

  // pdf generator
 const generateReceipt = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text("🧾 StayFinder Booking Receipt", 20, 25);

  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.line(20, 30, 190, 30); // horizontal separator

  // Buyer Info
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text("👤 Buyer Details", 20, 40);
  doc.setFontSize(11);
  doc.text(`Name: ${user.fullname}`, 25, 48);
  doc.text(`Mobile: ${user.mobile}`, 25, 56);

  // Property Info
  doc.setFontSize(12);
  doc.text("🏠 Property Details", 20, 70);
  doc.setFontSize(11);
  doc.text(`Title: ${property.title}`, 25, 78);
  doc.text(`Location: ${property.location}`, 25, 86);
  doc.text(`Price: ₹${property.price}`, 25, 94);

  // Booking Dates
  doc.setFontSize(12);
  doc.text("📅 Booking Duration", 20, 108);
  doc.setFontSize(11);
  doc.text(`From: ${startDate}`, 25, 116);
  doc.text(`To: ${endDate}`, 25, 124);

  // Seller Info
  doc.setFontSize(12);
  doc.text("🧑‍💼 Seller Details", 20, 138);
  doc.setFontSize(11);
  doc.text(`Name: ${property.seller.name}`, 25, 146);
  doc.text(`Contact: ${property.seller.phone}`, 25, 154);

  // Footer note
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(10);
  doc.text("Thank you for booking with StayFinder!", 20, 180);

  
  doc.save("booking_receipt.pdf");
};



  const handleBooking = async () => {
  if (!startDate || !endDate) {
    alert("Please select both start and end dates.");
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    alert("End date must be after start date.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/property/Booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", 
      body: JSON.stringify({
        propertyId: property._id,
        startDate,
        endDate
      })
    });


    const data = await response.json();

    if (response?.status==201) {
        console.log("response at booking:-",response);
        generateReceipt();
        localStorage.removeItem("bookingInfo");
        alert("Booking successful!");
        navigate("/user/Dashboard");
    }else if(response?.status == 400){
        alert("Property is already booked for the selected dates")
    }else if(response?.status == 401){
        alert("All Fields are required..")
    }
    

  } catch (err) {
    console.error("Booking failed:", err);
    alert(err.message || "Booking failed");
  } finally {
    setLoading(false);
  }
};



  const today = new Date().toISOString().split('T')[0];

  if(loading) return <div className="justify-center items-center text-center"><Loader/><p className="text-green-600">Booking is on Process....</p></div>
  return (
    <>
    <Header/>
   <div className="max-w-xl mx-auto mt-10 p-6 bg-slate-400 shadow-lg rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">📅 Book Your Stay</h2>

     <div className="space-y-4">
        <div>
        <label className="block font-medium mb-1">Seller Name</label>
        <input
           className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          value={property.seller.name}
          readOnly
        />
        </div>
        <div>
        <label className="block font-medium mb-1">Property</label>
        <input
           className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          value={property.title}
          readOnly
        />
        </div>
        <div>
        <label className="block font-medium mb-1">Location</label>
        <input
           className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          value={property.location}
          readOnly
        />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Start Date</label>
               <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        <button
          onClick={handleBooking}
          disabled={loading || !startDate || !endDate}
          className={`w-full py-2 text-white font-semibold rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default PropertyBooking;






//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-100">
//       <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">📅 Book Your Stay</h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Seller Name</label>
//           <input
//             value={property.seller.fullname}
//             readOnly
//             className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Property</label>
//           <input
//             value={property.title}
//             readOnly
//             className="w-full border px-3 py-2 rounded bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Location</label>
//           <input
//             value={property.location}
//             readOnly
//             className="w-full border px-3 py-2 rounded bg-gray-100"
//           />
//         </div>

//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block font-medium mb-1">Start Date</label>
//             <input
//               type="date"
//               value={startDate}
//               min={today}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div className="flex-1">
//             <label className="block font-medium mb-1">End Date</label>
//             <input
//               type="date"
//               value={endDate}
//               min={startDate || today}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleBooking}
//           disabled={loading || !startDate || !endDate}
//           className={`w-full py-2 text-white font-semibold rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//         >
//           {loading ? "Booking..." : "Confirm Booking"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PropertyBooking;

