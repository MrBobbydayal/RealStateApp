import { useEffect, useState } from 'react';


export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/property/myBookings', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data.bookings);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load bookings', err);
        setLoading(false);
      });
  }, []);

  console.log("my bookings",bookings)

  if (loading) return <div className="p-6">Loading your bookings...</div>;

  return (
    <>
    <div className="max-w-5xl mx-auto p-6">
  <h2 className="text-2xl font-bold mb-4">📦 My Bookings</h2>

  {bookings.length === 0 ? (
    <p className="text-gray-600 h-72">No bookings found.</p>
  ) : (
    <div className="overflow-y-auto max-h-[75vh] pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <img
              src={b.propertyId._id.images}
              alt="property"
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{b.propertyId.title}</h3>
            <p className="text-sm text-gray-600">📍 {b.propertyId.location}</p>
            <p className="text-sm">🗓️ {b.startDate.slice(0, 10)} → {b.endDate.slice(0, 10)}</p>
            <p className="text-sm">💰 ${b.propertyId.price}</p>
            <p className="text-sm mt-2">
              Seller: {b.sellerId._id.fullname} | 📞 {b.sellerId._id.mobile}
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

    </>
  );
}