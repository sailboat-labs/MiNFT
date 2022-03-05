/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";
import { v4 } from "uuid";

import { firebaseApp } from "@/lib/firebase";

import { Comment, UpVote } from "@/types";
interface ICommentsProps {
  collectionId: string;
}

const firestore = getFirestore(firebaseApp);
export default function Comments({ collectionId }: ICommentsProps) {
  const { account } = useMoralis();

  // Get comments from firestore
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment>();

  const _query = query(
    collection(firestore, `collections/${collectionId}/comments`),
    orderBy("lastUpdated", "desc"),
    limit(100)
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: Comment[], curr: DocumentData) => {
      acc.push(curr as Comment);
      return acc;
    }, []);

    setComments(data);
  }, [loading, snapshots]);

  // Create and edit comments

  const [comment, setComment] = useState<string>();
  const handleCreateComment = async () => {
    try {
      const timestamp = new Date().toISOString();
      const _comment: Comment = {
        id: v4(),
        comment: comment!,
        owner: account!,
        upVotes: [],
        dateCreated: timestamp,
        lastUpdated: timestamp,
      };

      const { data } = await axios.post("/api/comments", {
        comment: _comment,
        collectionId,
      });

      if (data.success) {
        toast.success("Comment Added");
        setComment("");
      } else {
        toast.error("Unable to add comment");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleVote = async (id: string, upVotes: UpVote[]) => {
    try {
      let voted = false;
      const votes = upVotes.filter((upVote) => upVote.id == account!);
      if (votes.length > 1) {
        voted = votes[0].value;
        const index = upVotes.indexOf(votes[0]);
        upVotes.splice(index, 1);
      }
      const _comment: Comment = {
        id: id,
        upVotes: [...upVotes, ...[{ id: account!, value: !voted }]],
      };

      const { data } = await axios.put("/api/comments", {
        comment: _comment,
        collectionId,
      });

      if (data.success) {
        toast.success("Comment UpVoted");
        setComment("");
      } else {
        toast.error("Unable to upVote comment");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className="contained mt-10 rounded  py-5">
      <div className="mt-0 text-2xl font-bold">Comments</div>

      <div className="w-full flex flex-col items-center justify-center py-5 text-center">
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

      <div className="mt-10 flex flex-col gap-3">
        {comments.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 rounded-lg bg-gray-50 px-5 py-3"
          >
            <div className="h-10 w-10 rounded-[50%] border-2 border-red-200 bg-red-100"></div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-5">
                <span>{formatEthAddress(item.owner!)}</span>
                {/* <span>Rating here</span> */}
              </div>
              <p className="max-w-3xl text-sm text-gray-500">{item.comment}</p>
              <span
                className={`${
                  item.upVotes!.filter((upVote) => upVote.value).length! < 1
                    ? "hidden"
                    : "block"
                } text-xs text-red-500`}
              >
                {item.upVotes!.filter((upVote) => upVote.value).length} found
                this helpful
              </span>
              {account && (
                <div className="mt-2 flex items-center gap-5">
                  <div className="gradient-button flex items-center gap-2">
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
                    <span
                      onClick={async () =>
                        await handleVote(item.id, item.upVotes!)
                      }
                      className="text-xs"
                    >
                      Helpful
                    </span>
                  </div>
                  <span className="text-sm">Report</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {account && (
        <div className="mt-10">
          <span className="mx-10 font-semibold">Add New Comment</span>
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
                <div className="gradient-button flex items-center gap-2">
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
                  <span onClick={handleCreateComment} className="text-xs">
                    Post
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!account && <div>Connect your wallet to add a comment</div>}
    </div>
  );
}
