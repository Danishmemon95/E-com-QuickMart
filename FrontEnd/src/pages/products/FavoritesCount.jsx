import { useSelector } from "react-redux";

const FavoritesCount = () => {
    const favorites = useSelector((state) => state.favorites);
    const favoriteCount = favorites.length;

    return (
        <div className="absolute left-4 top-[-10px]">
            {favoriteCount > 0 && (
                <span className="px-1.5  py-0  text-sm text-white bg-blue-500 rounded-full">
                    {favoriteCount}
                </span>
            )}
        </div>
    );
};

export default FavoritesCount;