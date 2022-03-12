import useLinkExtractor from "@/hooks/UseLinkExtractor";
import { useEffect } from "react";

interface IWhyILikeProject {
  whyIlikeProject: string;
}

export default function WhyILikeThisProject({ whyIlikeProject }: IWhyILikeProject) {
  const { setText, LinkItems } = useLinkExtractor();

  useEffect(() => {
    setText(whyIlikeProject ?? '');
  }, [whyIlikeProject]);
  return (
    <div>
      <div className="mt-10 text-2xl font-bold">Why I Like This Project</div>
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-200">
        {whyIlikeProject ?? "---"}
      </div>
      <LinkItems/>
    </div>
  );
}
