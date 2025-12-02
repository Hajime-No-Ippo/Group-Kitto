import useAuthUser from "../component/useAuthUser";
import useLikedItems from "../component/useLikedItems";
import LikedItemsList from "../component/LikedItemsList";

export default function LikedItemsPage() {
  const { user, loading } = useAuthUser();
  const likedItems = useLikedItems(user?.uid || null);

  console.log("AUTH USER:", user);
  console.log("USER ID:", user?.uid);
  console.log("LIKED ITEMS:", likedItems);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login to see your liked items.</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-[var(--primary)] tracking-wide mb-10">
        My Favorite
      </h1>

      <div>
        <LikedItemsList items={likedItems} />
      </div>
    </div>
  );
}
