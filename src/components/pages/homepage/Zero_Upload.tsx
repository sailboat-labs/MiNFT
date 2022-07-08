import FolderStructure from "./FolderStructure";

import CheckmarkSVG from "~/svg/homepage/checkmark.svg";

export default function Zero_Upload() {
  return (
    <div className="mx-auto my-20 w-4/5 font-montserrat text-white lg:mt-40 lg:w-3/4">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="w-full lg:w-auto">
          <h1 className="text-5xl font-medium lg:text-6xl ">Zero Upload.</h1>
          <h1 className="text-5xl font-medium lg:text-6xl ">Zero setup.</h1>

          <p className="w-96 py-10 text-xl text-indigo-100">
            MiNFT automatically generates layers and human-readable names from
            your files, with no upload needed.
          </p>
          <div className="lg:w-2/3">
            <ul className="">
              <li className="pb-5">
                <CheckmarkSVG className="mr-1 -mt-1 inline h-6 w-6" />
                <strong>No upload or zip</strong>
                <span className="text-indigo-100">
                  . All processing is done in your browser without uploading,
                  and you don&apos;t need to zip your folder.
                </span>
              </li>
              <li className="pb-5">
                <CheckmarkSVG className="mr-1 -mt-1 inline h-6 w-6" />
                <strong>Human names</strong>
                <span className="text-indigo-100">
                  {" "}
                  are generated from file names (e.g{" "}
                  <code className="bg-">magic-staff.png </code> becomes{" "}
                  <code>Magic Staff</code>), and can be easily customized.
                </span>
              </li>
              <li className="pb-5">
                <CheckmarkSVG className="mr-1 -mt-1 inline h-6 w-6" />
                <strong>Simple folder structure</strong>
                <span className="text-indigo-100">
                  . Each trait should be a folder, containing individual images
                  for each trait option (&apos;variation&apos;)
                </span>
              </li>
            </ul>
            <button className="mb-10 rounded-md bg-slate-600 py-3 px-5 text-sm font-semibold lg:mb-0">
              Download demo folder
            </button>
          </div>
        </div>
        <div className="sm:w-full lg:w-auto">
          <FolderStructure />
        </div>
      </div>
    </div>
  );
}
