/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { formatInTimeZone } from "date-fns-tz";
import { getFirestore } from "firebase/firestore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Web3 from "web3";

import { firebaseApp } from "@/lib/firebase";
import useAuthenticationDialog from "@/hooks/UseAuthDialog";
import useModal from "@/hooks/useModal";
import useUserData from "@/hooks/useUserData";

import Layout from "@/components/layout/Layout";
import Avatar from "@/components/shared/Avatar";
import EthAddress from "@/components/shared/EthAddress";
import PageLoader from "@/components/shared/PageLoader";

import { groupBy } from "@/utils/GroupBy";

import { Collection, Comment } from "@/types";

import DotsVertical from "~/svg/dots-vertical.svg";
import { getRandomAvatar } from "@/utils/GetRandomAvatar";

const firestore = getFirestore(firebaseApp);
export default function AllComments() {
  const web3 = new Web3(Web3.givenProvider);

  const [collectionComments, setCollectionComments] = useState<
    { comment: Comment; collection: Collection }[]
  >([]);
  const [groupedCollectionComments, setGroupedCollectionComments] = useState<
    { 0: string; 1: { comment: Comment; collection: Collection }[] }[]
  >([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const [selectedComment, setSelectedComment] = useState<Comment>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const { user, setWalletId } = useUserData();

  const { AuthDialog, setShowAuthDialog, account, isAuthenticated } =
    useAuthenticationDialog();

  //Set Wallet Id to get user data
  useEffect(() => {
    if (!account || !isAuthenticated) return;
    setWalletId(account);
  }, [account, isAuthenticated]);

  const {
    Modal,
    setTitle,
    setDescription,
    setIsOpen,
    isOpen,
    setCancel,
    setConfirm,
  } = useModal();

  const router = useRouter();

  const [sort, setSort] = useState<{ sortBy: string; isAsc: boolean }>({
    sortBy: "presaleMintDate",
    isAsc: true,
  });

  async function getCollectionComments() {
    const { data } = await axios.get(
      `https://us-central1-minft-production.cloudfunctions.net/comments?walletId=${account
        ?.toString()
        .toLowerCase()}`
    );

    // const { data } = await axios.get(
    //   `${
    //     process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_ENDPOINT
    //   }/comments?walletId=${account?.toString().toLowerCase()}`
    // );

    setCollectionComments(data);

    const grouped = groupBy(
      data,
      (item: { comment: Comment; collection: Collection }) =>
        item.collection.name ?? "none"
    );

    setGroupedCollectionComments(Array.from(grouped));

    setTimeout(() => {
      setAnimateIntoView(true);
    }, 1000);
  }

  useEffect(() => {
    getCollectionComments();
  }, [account, isAuthenticated]);

  async function verifyCommentAuthenticity(
    comment: string,
    signature: string,
    address: string
  ) {
    if (!comment || !signature)
      return toast.error("Comment verification unsuccessful");
    //verify authenticity
    const _address = await web3.eth.personal.ecRecover(
      web3.utils.sha3(comment)!,
      signature
    );

    toast.dismiss();
    if (_address == address)
      return toast.success("Comment verification successful");
    return toast.error("Comment verification unsuccessful");
  }

  const handleDeleteComment = async (
    id: string,
    comment: string,
    signature: string,
    address: string,
    collectionId: string
  ) => {
    try {
      if (!comment || !signature)
        return toast.error("Comment verification unsuccessful");

      //verify authenticity
      const _address = await web3.eth.personal.ecRecover(
        web3.utils.sha3(comment)!,
        signature
      );

      toast.dismiss();

      if (_address == address) {
        toast("Deleting");
        const { data } = await axios.delete("/api/comments", {
          data: {
            id: id,
            collectionId,
          },
        });

        if (data.success) {
          return toast.success("Deleted");
        } else {
          return toast.error(`Unable to Delete comment`);
        }
      }
      return toast.error("Comment verification unsuccessful");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const soonWrapperElement = useRef<any>(null);
  const q = gsap.utils.selector(soonWrapperElement);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const scrollButtonAnim = gsap.from("#soon-text", {
      // rotate:-15,
      y: 800,
      // opacity: 0,

      scrollTrigger: {
        trigger: "#soon-text",
        start: "top 100%",
        end: "top start",
        toggleActions: "restart pause resume reverse",
        scrub: 0.8,
        // markers: true,
      },
    });

    return () => {
      scrollButtonAnim.kill();
    };
  }, []);

  if (!account || !isAuthenticated) {
    return (
      <Layout>
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center gap-5 px-10 text-center">
          <AuthDialog />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            Connect your wallet to view your comments
          </div>
          <div
            onClick={() => {
              setShowAuthDialog(true);
            }}
            className="gradient-button"
          >
            Connect your wallet
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div ref={soonWrapperElement} className="contained mt-10">
        {loadingCollection && <PageLoader />}
        {isOpen && <Modal />}

        <strong className="flex  flex-col gap-3 stroke-black text-2xl dark:stroke-white md:text-3xl">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span
              className={`transition-all ${
                animateIntoView
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
              }`}
            >
              {collectionComments.length}
            </span>
          </div>
          <span className="flex flex-row capitalize">My Comments</span>
        </strong>

        <div className={`mt-3 flex flex-col transition-all `}>
          {/* <ExploreCategories
            dismissible
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div
            id="soon-text"
            className="absolute -translate-x-[22rem] translate-y-[25rem] -rotate-90 text-8xl text-gray-200 dark:text-gray-700 lg:text-[6rem]"
          >
            All Collections
          </div> */}

          <div className="mt-5 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="mt-5 sm:rounded-lg">
                <table className="min-w-full ">
                  <tbody
                    className={`transition-all  ${
                      animateIntoView ? "hidden" : ""
                    }`}
                  >
                    {/* Shimmer effects for loading state */}
                    {[...Array(5)].map((item, index) => (
                      <tr
                        key={index}
                        className="animate-pulse cursor-pointer border-b "
                      >
                        <td className="flex items-center gap-5 whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900">
                          <div className="h-10 w-10 flex-shrink-0 rounded-[50%] bg-gray-200"></div>
                          <div>
                            <div className="w-48 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                            <div className="mt-2 w-48 whitespace-nowrap rounded-lg bg-gray-200 py-2 text-sm text-gray-500 dark:text-gray-200"></div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-200 ">
                          <div className="w-48 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-200 ">
                          <div className="w-48 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                          <div className="w-36 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                          <div className="w-36 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm capitalize text-gray-500 dark:text-gray-200 ">
                          <div className="w-36 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody
                    className={` flex flex-col gap-10 ${
                      !animateIntoView ? "hidden" : ""
                    }`}
                  >
                    {groupedCollectionComments &&
                      groupedCollectionComments.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-3">
                            <img
                              className="h-12 w-12 rounded-[50%] border object-cover"
                              src={
                                item[1][0].collection.image ??
                                getRandomAvatar(item[1][0].collection.owner)
                              }
                              alt=""
                            />
                            <div className="flex flex-col gap-1">
                              <span className="flex items-center gap-2 text-xl font-bold">
                                {item[0]}
                                <svg
                                  onClick={() => {
                                    router.push(
                                      `/collection/${item[1][0].collection
                                        .slug!}`
                                    );
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 cursor-pointer transition-all hover:scale-150"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                  />
                                </svg>
                              </span>
                              {item[1][0]?.collection?.supply && (
                                <span className="text-xs">
                                  {item[1][0].collection.supply} circulating
                                  supply
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="ml-14">
                            {item[1].map((comment, index) => (
                              <div
                                key={index}
                                className="mt-5 flex gap-5 rounded-lg bg-gray-50 px-5 py-3 dark:border-2 dark:border-gray-500 dark:bg-[#121212]"
                              >
                                <Avatar account={comment.comment.owner} />
                                <div className="flex w-full flex-col gap-2">
                                  <div className="flex w-full justify-between gap-5">
                                    <EthAddress
                                      account={comment.comment.owner}
                                    />
                                    <div className="w-fit text-right">
                                      <Menu
                                        as="div"
                                        className="relative inline-block text-left"
                                      >
                                        <div>
                                          <Menu.Button className="">
                                            <DotsVertical />
                                          </Menu.Button>
                                        </div>
                                        <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                        >
                                          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
                                            <div className="px-1 py-1 ">
                                              {/* {account &&
                                              comment.comment.owner ==
                                                account && (
                                                <Menu.Item>
                                                  {({ active }: any) => (
                                                    <button
                                                      onClick={() => {
                                                        setSelectedComment(
                                                          comment.comment
                                                        );
                                                        setEditMode(true);
                                                      }}
                                                      className={`${
                                                        active
                                                          ? "bg-primaryblue text-white"
                                                          : "text-gray-900 dark:text-white"
                                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                                                    >
                                                      Edit
                                                    </button>
                                                  )}
                                                </Menu.Item>
                                              )} */}
                                              <Menu.Item>
                                                {({ active }: any) => (
                                                  <button
                                                    onClick={() => {
                                                      verifyCommentAuthenticity(
                                                        comment.comment
                                                          .comment!,
                                                        comment.comment
                                                          .signature!,
                                                        comment.comment.owner!
                                                      );
                                                    }}
                                                    className={`${
                                                      active
                                                        ? "bg-primaryblue text-white"
                                                        : "text-gray-900 dark:text-white"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                                                  >
                                                    Verify authenticity
                                                  </button>
                                                )}
                                              </Menu.Item>
                                              {account &&
                                                comment.comment.owner ==
                                                  account && (
                                                  <Menu.Item>
                                                    {({ active }: any) => (
                                                      <button
                                                        onClick={() => {
                                                          setTitle(
                                                            "Delete Comment"
                                                          );
                                                          setDescription(
                                                            "Are you sure you want to delete this comment?"
                                                          );
                                                          setIsOpen(true);
                                                          setCancel(
                                                            <div
                                                              onClick={() => {
                                                                setIsOpen(
                                                                  false
                                                                );
                                                              }}
                                                              className="w-fit cursor-pointer rounded-md border-2  border-gray-500 bg-gray-300 px-8 py-2 text-black transition-all hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
                                                            >
                                                              No
                                                            </div>
                                                          );
                                                          setConfirm(
                                                            <div
                                                              onClick={async () => {
                                                                await handleDeleteComment(
                                                                  comment
                                                                    .comment.id,
                                                                  comment
                                                                    .comment
                                                                    .comment!,
                                                                  comment
                                                                    .comment
                                                                    .signature!,
                                                                  comment
                                                                    .comment
                                                                    .owner!,
                                                                  comment
                                                                    .collection
                                                                    .id
                                                                );
                                                                setIsOpen(
                                                                  false
                                                                );
                                                              }}
                                                              className="w-fit cursor-pointer rounded-md border-2  border-gray-500 bg-gray-300 px-8 py-2 text-black transition-all hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
                                                            >
                                                              Delete
                                                            </div>
                                                          );
                                                        }}
                                                        className={`${
                                                          active
                                                            ? "bg-primaryblue text-white"
                                                            : "text-gray-900 dark:text-white"
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                                                      >
                                                        Delete
                                                      </button>
                                                    )}
                                                  </Menu.Item>
                                                )}
                                            </div>
                                          </Menu.Items>
                                        </Transition>
                                      </Menu>
                                    </div>
                                    {/* <span>Rating here</span> */}
                                  </div>
                                  <p className="max-w-3xl text-sm text-gray-500 dark:text-white">
                                    {comment.comment.comment}
                                  </p>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {comment.comment.dateCreated &&
                                      formatInTimeZone(
                                        comment.comment.dateCreated,
                                        account && isAuthenticated
                                          ? user?.timeZone ?? "Etc/GMT"
                                          : "Etc/GMT",
                                        "yyyy-MM-dd HH:mm zzz"
                                      )}
                                  </span>
                                  <span
                                    className={`${
                                      Object.values(
                                        comment.comment.upVotes!
                                      ).filter((value) => value).length! < 1
                                        ? "hidden"
                                        : "block"
                                    } text-xs text-red-500`}
                                  >
                                    {
                                      Object.values(
                                        comment.comment.upVotes!
                                      ).filter((value) => value).length
                                    }{" "}
                                    degen
                                    {Object.values(
                                      comment.comment.upVotes!
                                    ).filter((value) => value).length == 1
                                      ? ""
                                      : "s"}
                                    &nbsp;found this helpful
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </tbody>
                </table>
                {/* <div className="flex items-center justify-center text-center">
                  {collections.filter((item) => {
                    if (selectedCategory == "all" || !selectedCategory)
                      return item.projectType;
                    else return item.projectType == selectedCategory;
                  }).length < 1 && (
                    <span className="py-10">
                      No Collection matches this filter
                    </span>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
