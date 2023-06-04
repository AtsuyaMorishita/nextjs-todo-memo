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
 * 完了タスクを全て削除する
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUserId: any = req.query.currentUserId;
  const usersCollectionRef = collection(db, "user", currentUserId, "todo");
  try {
    const deleteTasks = async () => {
      await getDocs(
        query(usersCollectionRef, where("isComplete", "==", true))
      ).then((snapshot) => {
        snapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      });
    };
    deleteTasks();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({});
}
