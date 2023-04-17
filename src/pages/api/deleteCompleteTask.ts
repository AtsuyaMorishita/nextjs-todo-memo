// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUserId: any = req.query.currentUserId;
  const usersCollectionRef: any = collection(db, "user", currentUserId, "todo");

  // TODO: TodoコレクションでisCompleteフィールドがtrueのドキュメントを取得して、全て削除する処理を行う。

  const result: any = query(
    usersCollectionRef,
    where("isComplete", "==", true)
  );

  // result
  //   .get()
  //   .then(() => {
  //     deleteDoc(doc(db, result));
  //   })
  //   .catch((error: any) => {
  //     console.log(error);
  //   });

  const todoSetShow = async () => {
    try {
      /**
       * 完了タスクを全て削除する
       */
      // await deleteDoc(result);
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({});
  };
  todoSetShow();
}
