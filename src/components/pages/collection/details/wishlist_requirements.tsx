interface IWishlistRequirements {
  requirements: string;
}

export default function WishlistRequirements({
  requirements,
}: IWishlistRequirements) {
  return (
    <div>
      <div className="mt-10 text-2xl font-bold">Wishlist Requirements</div>
      <div className="mt-3 text-sm text-gray-500">{requirements}</div>
    </div>
  );
}
