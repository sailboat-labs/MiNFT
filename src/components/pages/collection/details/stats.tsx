type props = {
  className?: string;
  collectionStats: any;
};

export default function CollectionStats({ className, collectionStats }: props) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  // example 1
  return (
    <>
      <div className={`flex gap-10 rounded-lg border-2 px-5 py-3 ${className}`}>
        <div className="flex flex-col items-center text-center">
          <span>Total Assets</span>
          <span className="text-lg font-bold">
            {formatter.format(collectionStats.count)}
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Owners</span>
          <span className="text-lg font-bold">
            {formatter.format(collectionStats.num_owners)}
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Floor Price</span>
          <span className="text-lg font-bold">
            {formatter.format(collectionStats.floor_price)}
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Total Volume</span>
          <span className="text-lg font-bold">
            {formatter.format(collectionStats.total_volume)}
          </span>
        </div>
      </div>
    </>
  );
}
