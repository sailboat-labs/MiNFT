type props = {
  className?: string;
  collectionStats: any;
};

export default function CollectionStats({ className, collectionStats }: props) {
  return (
    <>
      <div className={`flex gap-10 rounded-lg border-2 px-5 py-3 ${className}`}>
        <div className="flex flex-col items-center text-center">
          <span>Total Assets</span>
          <span className="text-lg font-bold">{collectionStats.count}</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Owners</span>
          <span className="text-lg font-bold">
            {collectionStats.num_owners}
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Floor Price</span>
          <span className="text-lg font-bold">
            {collectionStats.floor_price}
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Total Volume</span>
          <span className="text-lg font-bold">
            {collectionStats.total_volume}
          </span>
        </div>
      </div>
    </>
  );
}
