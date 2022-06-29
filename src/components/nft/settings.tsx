import { useState } from "react";
import { useDispatch } from "react-redux";

import BasicSettings from "../pages/settings/BasicSettings";
import CollectionSettings from "../pages/settings/Collection";
import CommissionSettings from "../pages/settings/Commission";

export default function NFTSettings() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="absolute right-0 z-[10000] h-screen w-[length:calc(100vw-0rem)] bg-black bg-opacity-50">
      <div className="container absolute right-0 mx-auto h-screen max-w-2xl divide-y divide-gray-200 overflow-auto bg-white py-10 px-10">
        <BasicSettings />
        <CollectionSettings />
        <CommissionSettings />
      </div>
    </div>
  );
}
