import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUserId = req.body.currentUserId;

  const usersCollectionRef = collection(db, "user", currentUserId, "memo");
  const q = query(usersCollectionRef, orderBy("timestamp", "desc"));

  let allMemos: any = [];

  const memoSetShow = async () => {
    try {
      /**
       * 全てのメモを取得する
       */
      await getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          allMemos.push({ id: doc.id, ...doc.data() });
        });
      });
    } catch (error) {
      console.log(error);
    }

    res.status(200).json(allMemos);
  };
  memoSetShow();
}
