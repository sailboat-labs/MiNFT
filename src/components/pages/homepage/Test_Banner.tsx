import ButtonLink from "@/components/links/ButtonLink";

export default function Test_Banner() {
  return (
    <>
      <div className="flex h-[60vh] flex-col font-dmsans  text-white">
        <div className="flex items-center justify-end  gap-5 p-5">
          <ButtonLink href="">Contact Us</ButtonLink>
        </div>
      </div>
    </>
  );
}
