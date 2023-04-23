// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase";

/**
 * 特定のメモを削除する
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUserId: any = req.query.currentUserId;
  const currentMemoId: any = req.query.deleteElemId;
  const currentMemoRef = collection(db, "user", currentUserId, "memo");

  getDocs(query(currentMemoRef, where("id", "==", currentMemoId))).then(
    (snapshot) => {
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
  );

  res.status(200).json({});
}
