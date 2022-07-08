import ButtonLink from "@/components/links/ButtonLink";

export default function Join_Community() {
  return (
    <div className="m-auto mb-16 mt-5 flex w-4/5 flex-col justify-between font-montserrat lg:w-3/4  lg:flex-row lg:items-center">
      <div className="">
        <div className="text-2xl font-bold text-white">
          From generation to mint
        </div>
        <div className="mt-3 mb-5 text-xl font-medium text-white">
          Let us guide you
        </div>
      </div>
      <div className="flex flex-row xl:justify-between">
        <ButtonLink
          href="/dashboard"
          className="mr-10 flex h-14 w-56 items-center justify-center rounded-xl border-0 bg-indigo-500 text-base font-bold text-white hover:bg-indigo-700"
        >
          Join Telegram
        </ButtonLink>
        <ButtonLink
          href="https://r3c9oapreew.typeform.com/to/RDOUdJXk"
          target='_blank'
          className="flex h-14 w-56 items-center justify-center rounded-xl border-0 bg-white text-base font-bold text-indigo-800 hover:bg-indigo-300 hover:text-indigo-800"
        >
          Join Waitlist
        </ButtonLink>
      </div>
    </div>
  );
}
