/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { formatEthAddress } from "eth-address";
import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";
import { v4 } from "uuid";

import { firebaseApp } from "@/lib/firebase";

import AuthenticationDialog from "@/components/shared/AuthenticationDialog";

import { Comment } from "@/types";

import DotsVertical from "~/svg/dots-vertical.svg";
interface ICommentsProps {
  collectionId: string;
}

const firestore = getFirestore(firebaseApp);
export default function Comments({ collectionId }: ICommentsProps) {
  const { account } = useMoralis();

  // Get comments from firestore
  const [comments, setComments] = useState<Comment[]>([]);

  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const [sortBy, setSortBy] = useState("date");
  const [sortAsc, setSortAsc] = useState(true);

  const _query = query(
    collection(firestore, `collections/${collectionId}/comments`),
    orderBy("lastUpdated", "desc"),
    limit(100)
  );
  const [snapshots, loading] = useCollectionData(_query);
  const [selectedComment, setSelectedComment] = useState<Comment>();
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: Comment[], curr: DocumentData) => {
      acc.push(curr as Comment);
      return acc;
    }, []);

    setComments(data);
  }, [loading, snapshots]);

  useEffect(() => {
    setComment(selectedComment?.comment);
  }, [selectedComment]);

  // Create and edit comments

  const [comment, setComment] = useState<string>();

  const handleCreateComment = async () => {
    try {
      const timestamp = new Date().toISOString();
      const upVotes: Map<string, boolean> = new Map();
      const _comment: Comment = {
        id: editMode ? selectedComment!.id : v4(),
        comment: comment!,
        owner: account!,
        upVotes: editMode ? selectedComment!.upVotes : upVotes,
        dateCreated: editMode ? selectedComment!.dateCreated : timestamp,
        lastUpdated: timestamp,
      };

      const { data } = editMode
        ? await axios.put("/api/comments", { comment: _comment, collectionId })
        : await axios.post("/api/comments", {
            comment: _comment,
            collectionId,
          });

      if (data.success) {
        toast.success(`Comment ${editMode ? "Updated" : "Added"}`);
        setComment("");
        if (editMode) setEditMode(false);
      } else {
        toast.error(`Unable to ${editMode ? "update" : "add"} comment`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleVote = async (id: string, upVotes: Map<string, boolean>) => {
    try {
      const votes: any = upVotes;
      const voted = votes[account!] ?? false;
      votes[account!] = !voted;
      const _comment: Comment = {
        id: id,
        upVotes: votes,
      };

      const { data } = await axios.put("/api/comments", {
        comment: _comment,
        collectionId,
      });

      if (data.success) {
        toast.success(voted ? "Comment DownVoted" : "Comment UpVoted");
        setComment("");
      } else {
        toast.error(`Unable to ${voted ? "DownVote" : "UpVote"} comment`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };



  return (
    <div className="contained mt-10 rounded  py-5">
      <div className="mt-0 flex flex-col gap-2 text-2xl font-bold">
        Comments{" "}
        <div className="">
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex items-center gap-3">
              <span className="text-sm font-normal">Sort by</span>
              <Menu.Button className="rounded bg-primaryblue px-2 text-sm text-white transition-all hover:scale-105 capitalize">
                {sortBy}
              </Menu.Button>
              <svg
                onClick={() => {
                  setSortAsc(!sortAsc);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 cursor-pointer transition-all hover:scale-105 ${
                  sortAsc ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
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
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setSortBy("date created");
                        }}
                        className={`${
                          active ? "bg-primaryblue text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Date created
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setSortBy("date updated");
                        }}
                        className={`${
                          active ? "bg-primaryblue text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Date updated
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setSortBy("upvotes");
                        }}
                        className={`${
                          active ? "bg-primaryblue text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Upvotes
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {comments.length < 1 && (
        <div className="flex w-full flex-col items-center justify-center py-5 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>{" "}
          No comment
        </div>
      )}

      <div className="mt-10 flex flex-col gap-3">
        {comments
          .sort((a: any, b: any) => {
            switch (sortBy) {
              case "date created":
                if (sortAsc) {
                  return a.dateCreated?.localeCompare(b.dateCreated);
                } else {
                  return b.dateCreated?.localeCompare(a.dateCreated);
                }

              case "date updated":
                if (sortAsc) {
                  return a.lastUpdated?.localeCompare(b.lastUpdated);
                } else {
                  return b.lastUpdated?.localeCompare(a.lastUpdated);
                }

              default:
                if (sortAsc) {
                  return (
                    Object.values(a.upVotes!).filter((value) => value).length -
                    Object.values(b.upVotes!).filter((value) => value).length
                  );
                } else {
                  return (
                    Object.values(b.upVotes!).filter((value) => value).length -
                    Object.values(a.upVotes!).filter((value) => value).length
                  );
                }
            }
          })
          .map((item, index) => (
            <div
              key={index}
              className="flex gap-5 rounded-lg bg-gray-50 px-5 py-3"
            >
              <div className="h-10 w-10 rounded-full border-2 border-red-200 bg-red-100"></div>
              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full justify-between gap-5">
                  <div>{formatEthAddress(item.owner!)}</div>
                  {account && item.owner == account && (
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
                          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                              <Menu.Item>
                                {({ active }: any) => (
                                  <button
                                    onClick={() => {
                                      setSelectedComment(item);
                                      setEditMode(true);
                                    }}
                                    className={`${
                                      active
                                        ? "bg-primaryblue text-white"
                                        : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                                  >
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  )}
                  {/* <span>Rating here</span> */}
                </div>
                <p className="max-w-3xl text-sm text-gray-500">
                  {item.comment}
                </p>
                <span
                  className={`${
                    Object.values(item.upVotes!).filter((value) => value)
                      .length! < 1
                      ? "hidden"
                      : "block"
                  } text-xs text-red-500`}
                >
                  {Object.values(item.upVotes!).filter((value) => value).length}{" "}
                  degen
                  {Object.values(item.upVotes!).filter((value) => value)
                    .length == 1
                    ? ""
                    : "s"}
                  &nbsp;found this helpful
                </span>
                {account && (
                  <div className="mt-2 flex items-center gap-5">
                    <div
                      onClick={async () =>
                        await handleVote(item.id, item.upVotes!)
                      }
                      className="gradient-button flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <span className="text-xs">Helpful</span>
                    </div>
                    {/* <span className="text-sm">Report</span> */}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {account && (
        <div className="mt-10">
          <span className="mx-10 font-semibold">
            {" "}
            {editMode ? "Update" : "Add new"} Comment
          </span>
          <div className="mt-2 flex gap-5 rounded-lg px-5 py-3">
            <div className="h-10 w-10 rounded-[50%] border-2 border-red-200 bg-red-100"></div>
            <div className="flex w-full flex-col gap-2">
              <div className="flex gap-5">
                <span className="mx-5">{formatEthAddress(account)}</span>
              </div>

              <textarea
                className="w-full rounded-lg bg-gray-50 px-8 py-3"
                placeholder="Enter comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end">
                <div
                  onClick={handleCreateComment}
                  className="gradient-button flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-xs">
                    {editMode ? "Update" : "Post"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!account && (
        <>
          <div className="mt-10">Connect your wallet to add a comment</div>
          <div
            onClick={() => {
              setShowAuthDialog(true);
            }}
            className="gradient-button mt-5"
          >
            Connect your wallet
          </div>
          <AuthenticationDialog
            showAuthDialog={showAuthDialog}
            setShowAuthDialog={setShowAuthDialog}
          />
        </>
      )}
    </div>
  );
}
