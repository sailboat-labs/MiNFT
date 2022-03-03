type props = {
  className?: string;
};

export default function CollectionStats({ className }: props) {
  return (
    <>
      <div className={`flex gap-10 rounded-lg border-2 px-5 py-3 ${className}`}>
        <div className="flex flex-col items-center text-center">
          <span>Total Assets</span>
          <span className="text-lg font-bold">10K</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Owners</span>
          <span className="text-lg font-bold">3.5K</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Floor Price</span>
          <span className="text-lg font-bold">4.35</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span>Total Volume</span>
          <span className="text-lg font-bold">30.4K</span>
        </div>
      </div>
    </>
  );
}
