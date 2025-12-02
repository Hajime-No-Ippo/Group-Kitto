import { useNavigate } from "react-router-dom";

export default function LikedItemsList({ items }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {items.length === 0 ? (
        <p className="text-gray-500 text-lg">
          You haven’t liked any items yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />

              <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
              <p className="text-xl font-bold">€{item.price}</p>

              <p className="text-sm text-gray-400">
                Liked on {item.likedAt.toDate().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
