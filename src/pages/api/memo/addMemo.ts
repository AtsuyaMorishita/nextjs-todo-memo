import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const memoData = req.body.memoData;
  const currentUserId = req.body.currentUserId;
  const usersCollectionRef = collection(db, "user", currentUserId, "memo");

  let allMemos: any = [];

  const memoSetShow = async () => {
    try {
      /**
       * DB(メモ)にデータを格納する
       */
      await setDoc(doc(usersCollectionRef), memoData);
    } catch (error) {
      console.log(error);
    }

    res.status(200).json(allMemos);
  };
  memoSetShow();
}
