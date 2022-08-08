import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import Button from "@/components/buttons/Button";

import { IProject, IProjectLaunch } from "@/interfaces";

import saveLaunchPadDraft from "../launchpad-config.logic";

type props = {
  launchInformation?: IProjectLaunch;
};

export default function LaunchPadMoreConfigFAQ({ launchInformation }: props) {
  const [isShowingAddNewFAQ, setIsShowingAddNewFAQ] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState<string>();
  const [faqAnswer, setFaqAnswer] = useState<string>();
  const project = useSelector(getProjectState) as IProject;
  const [faqs, setFaqs] = useState(launchInformation?.faq ?? []);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);

  async function handleSaveLaunchPadDraft(
    field: string,
    value: string | boolean | any[]
  ) {
    setIsAddingFAQ(true);
    toast.loading("");
    const saveDraft = await saveLaunchPadDraft(project, field, value);

    if (!saveDraft)
      toast.error(
        "Error Ocurred while saving draft. Changes will not be saved"
      );

    setTimeout(() => {
      toast.dismiss();
      setIsAddingFAQ(true);
    }, 500);
  }

  useEffect(() => {
    if (launchInformation?.faq) setFaqs(launchInformation?.faq);
  }, [launchInformation]);

  return (
    <div>
      <div className="mt-10 mb-5 flex items-center gap-5">
        <div className="text-xl text-indigo-500">FAQ</div>
        <div className=" flex-1 rounded-lg border "></div>
      </div>
      {isShowingAddNewFAQ ? (
        <div className="flex flex-col rounded-lg bg-gray-200 p-5">
          <div>Add new FAQ</div>
          <input
            value={faqQuestion}
            onChange={(e) => {
              setFaqQuestion(e.target.value);
            }}
            className="mt-3 rounded bg-gray-100 px-3"
            placeholder="Question"
          />
          <textarea
            value={faqAnswer}
            onChange={(e) => {
              setFaqAnswer(e.target.value);
            }}
            className=" mt-4 rounded-lg border-none bg-gray-100 text-gray-600"
            placeholder="Answer"
          ></textarea>

          <div className="mt-5 flex w-full justify-end gap-3">
            <Button
              onClick={() => {
                setIsShowingAddNewFAQ(false);
              }}
              className="cursor-pointer rounded-lg bg-white px-5 py-2 text-indigo-600"
            >
              Close
            </Button>
            <Button
              isLoading={isAddingFAQ}
              disabled={
                !faqQuestion ||
                !faqAnswer ||
                faqQuestion.length < 1 ||
                faqAnswer.length < 1
              }
              onClick={() => {
                handleSaveLaunchPadDraft("faq", [
                  ...faqs,
                  { question: faqQuestion, answer: faqAnswer },
                ]);
              }}
              className="cursor-pointer rounded-lg bg-indigo-500 px-5 py-2 text-white"
            >
              Add
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            setIsShowingAddNewFAQ(true);
          }}
          className="cursor-pointer rounded-lg bg-indigo-500 px-5 py-2 text-white"
        >
          Add new FAQ
        </Button>
      )}

      {faqs.length < 1 && <div className="mt-5">No FAQs added</div>}

      <div className="mt-5 flex flex-col gap-5">
        {faqs.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              selectedItem == index
                ? setSelectedItem(-1)
                : setSelectedItem(index);
            }}
          >
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className={`${
                  selectedItem == index ? "rounded-t-xl" : "rounded-xl"
                } flex w-full items-center justify-between border border-b-0 border-gray-200 bg-gray-100 bg-opacity-80 p-5 text-left font-medium text-gray-900 hover:bg-gray-100 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-80 dark:text-white dark:text-gray-200 dark:hover:bg-gray-800`}
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
              >
                <span className="text-sm">{item.question}</span>
                <svg
                  data-accordion-icon=""
                  className={`h-6 w-6 shrink-0 transition-all  ${
                    selectedItem == index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div
              className={`rounded-b-xl ${
                selectedItem == index
                  ? "h-auto opacity-100 "
                  : "pointer-events-none h-0 opacity-0"
              }`}
            >
              <div className="rounded-b-xl border border-gray-200 p-5  dark:border-gray-700 dark:bg-gray-900">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
