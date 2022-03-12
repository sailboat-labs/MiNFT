import useLinkExtractor from "@/hooks/UseLinkExtractor";
import { useEffect } from "react";

interface IRoadmap {
  roadmap: string;
}

export default function Roadmap({ roadmap }: IRoadmap) {
  const { setText, LinkItems } = useLinkExtractor();

  useEffect(() => {
    setText(roadmap ?? "");
  }, [roadmap]);
  return (
    <div>
      <div className="mt-10 text-2xl font-bold">Roadmap</div>
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-200">
        {roadmap ?? "---"}
      </div>
      <LinkItems/>
    </div>
  );
}
