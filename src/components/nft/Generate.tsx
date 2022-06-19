import GenerateToken from "./GenerateToken";

export default function Generate() {
  return (
    <div>
      <div>
        <div className="border-y bg-gray-100 py-2 px-2">Generate</div>
        <div className="px-5">
          <GenerateToken />
        </div>
      </div>
    </div>
  );
}
