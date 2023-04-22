// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const memoData = req.body.memoData;
  const currentUserId = req.body.currentUserId;

  const usersCollectionRef = collection(db, "user", currentUserId, "memo");

  console.log(memoData);

  let allMemos: any = [];

  const memoSetShow = async () => {
    try {
      /**
       * DB(メモ)にデータを格納する
       */
      await setDoc(doc(usersCollectionRef), memoData);

      /**
       * 全てのメモを取得する
       */
      await getDocs(usersCollectionRef).then((snapshot) => {
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
