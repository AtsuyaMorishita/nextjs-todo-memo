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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const checkTaskId = req.body.checkTaskId;
  const currentUserId = req.body.currentUserId;
  const usersCollectionRef = collection(db, "user", currentUserId, "todo");

  const todoSetShow = async () => {
    try {
      /**
       * isCompleteをfalseからtrueに変更する
       */
      await getDocs(
        query(usersCollectionRef, where("id", "==", checkTaskId))
      ).then((snapshot) => {
        snapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            isComplete: false,
            isChecked: false,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({});
  };
  todoSetShow();
}
