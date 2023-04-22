// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, updateDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase";

/**
 * コンテンツを編集してDBを更新する
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUserId: any = req.body.currentUserId;
  const memoId: any = req.body.memoId;
  const text: any = req.body.text;
  const currentMemoRef = doc(db, "user", currentUserId, "memo", memoId);

  const editMemo = () => {
    try {
      updateDoc(currentMemoRef, {
        memoContent: text,
      });
    } catch (error) {
      console.log(error);
    }
  };
  editMemo();

  res.status(200).json({});
}
