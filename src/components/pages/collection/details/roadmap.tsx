interface IRoadmap {
  roadmap: string;
}

export default function Roadmap({ roadmap }: IRoadmap) {
  return (
    <div>
      <div className="mt-10 text-2xl font-bold">Roadmap</div>
      <div className="mt-3 text-sm text-gray-500">{roadmap ?? "---"}</div>
    </div>
  );
}
