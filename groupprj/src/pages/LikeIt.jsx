import useAuthUser from "../component/useAuthUser";
import useLikedItems from "../component/useLikedItems";
import LikedItemsList from "../component/LikedItemsList";
import { useNavigate } from "react-router-dom";

export default function LikedItemsPage() {
  const { user, loading } = useAuthUser();
  const likedItems = useLikedItems(user?.uid || null);
  const navigate = useNavigate();

  console.log("AUTH USER:", user);
  console.log("USER ID:", user?.uid);
  console.log("LIKED ITEMS:", likedItems);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login to see your liked items.</div>;

  return (
  <>
    <div className="flex align-right gap-6 m-6">
      <button
        className="btn btn-outline-secondary mt-2 mb-4"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </button>
    </div>

    <div>
      <LikedItemsList items={likedItems} />
    </div>
  </>
);

}
