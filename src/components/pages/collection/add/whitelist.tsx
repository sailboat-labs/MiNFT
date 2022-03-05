import Dropdown from "@/components/shared/dropdown";

export default function AddWhitelist() {
  return (
    <div>
      <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
        Whitelist Available
      </td>
      <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
        {/* <Dropdown
          initial={whitelistAvailable}
          onItemSelected={setWhitelistAvailable}
          options={["yes", "no"]}
          className="w-full "
        /> */}
      </td>
    </div>
  );
}
