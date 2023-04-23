// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase";

/**
 * タイトルを編集してDBを更新する
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUserId: any = req.body.currentUserId;
  const memoId: any = req.body.memoId;
  const text: any = req.body.text;
  const currentMemoRef = collection(db, "user", currentUserId, "memo");

  const editMemo = () => {
    try {
      getDocs(query(currentMemoRef, where("id", "==", memoId))).then(
        (snapshot) => {
          snapshot.forEach((doc) => {
            updateDoc(doc.ref, {
              memoTitle: text,
            });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  editMemo();

  res.status(200).json({});
}
