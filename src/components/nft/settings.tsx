import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getShowSettings } from "redux/reducers/selectors/settings";
import { setShowSettings } from "redux/reducers/slices/settings";

import OutputSettingsPage from "@/pages/settings/output";

import BasicSettings from "../pages/settings/BasicSettings";
import CollectionSettings from "../pages/settings/Collection";

export default function NFTSettings() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const isShowSettings = useSelector(getShowSettings);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div
      className={`absolute right-0 z-[10000] h-screen w-[length:calc(100vw-0rem)] overflow-x-hidden transition-all duration-300  ${
        isShowSettings ? "pointer-events-auto " : "pointer-events-none"
      }`}
    >
      <div
        onClick={() => {
          dispatch(setShowSettings(false));
        }}
        className={`absolute right-0 h-screen w-[length:calc(100vw-0rem)] overflow-x-hidden transition-all duration-300  ${
          isShowSettings
            ? "pointer-events-auto bg-black bg-opacity-50"
            : "pointer-events-none bg-transparent bg-opacity-0"
        }`}
      ></div>
      <div
        className={`container absolute z-[10001] mx-auto h-screen max-w-2xl divide-gray-200 overflow-auto bg-white py-10 px-10 transition-all duration-300 ${
          isShowSettings ? "right-0" : "-right-full"
        }`}
      >
        <BasicSettings />
        <CollectionSettings />
        <OutputSettingsPage />
      </div>
    </div>
  );
}
