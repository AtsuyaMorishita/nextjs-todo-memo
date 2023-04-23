// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteDoc, doc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase";

/**
 * 特定のメモを削除する
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUserId: any = req.query.currentUserId;
  const currentMemoId: any = req.query.deleteElemId;
  const currentMemoRef = doc(db, "user", currentUserId, "memo", currentMemoId);

  deleteDoc(currentMemoRef);

  res.status(200).json({});
}
