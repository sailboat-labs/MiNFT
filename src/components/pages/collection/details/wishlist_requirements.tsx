import useLinkExtractor from "@/hooks/UseLinkExtractor";
import { useEffect } from "react";

interface IWishlistRequirements {
  requirements: string;
}

export default function WishlistRequirements({
  requirements,
}: IWishlistRequirements) {

  const { setText, LinkItems } = useLinkExtractor();

  useEffect(() => {
    setText(requirements ?? "");
  }, [requirements]);

  
  return (
    <div>
      <div className="mt-10 text-2xl font-bold">Whitelist Requirements</div>
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-200">
        {requirements ?? "---"}
      </div>
      <LinkItems/>
    </div>
  );
}
