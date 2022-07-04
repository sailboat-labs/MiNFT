import ButtonLink from "@/components/links/ButtonLink";

export default function Join_Community() {

  return (
    <div className="m-auto flex w-3/5 flex-row font-montserrat justify-between mb-16 mt-5 items-center">
      <div className="w-80">
        <div className="text-2xl font-bold text-white">
          From generation to mint
        </div>
        <div className="text-xl font-medium text-white mt-3">Let us guide you</div>
      </div>
      <div className="flex flex-row justify-between">
        <ButtonLink
          href="/dashboard"
          className="mr-10 flex h-14 w-56 items-center justify-center rounded-xl border-0 bg-indigo-500 text-base font-bold text-white hover:bg-indigo-700"
        >
          Join Discord
        </ButtonLink>
        <ButtonLink
          href="/dashboard"
          className="flex h-14 w-56 items-center justify-center rounded-xl border-0 bg-white text-base font-bold text-indigo-800 hover:bg-indigo-300 hover:text-indigo-800"
        >
          Join Waitlist
        </ButtonLink>
      </div>
    </div>
  );
}