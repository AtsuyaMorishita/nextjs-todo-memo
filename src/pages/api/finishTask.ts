// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  collection,
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
  const checkTaskId = req.body.checkTaskId;
  const currentUserId = req.body.currentUserId;

  // const todoDocRef = doc(db, "user", currentUserId, "todo", checkTaskId);
  const usersCollectionRef = collection(db, "user", currentUserId, "todo");

  const todoSetShow = async () => {
    try {
      /**
       * isCompleteをfalseからtrueに変更する
       */
      getDocs(query(usersCollectionRef, where("id", "==", checkTaskId))).then(
        (snapshot) => {
          snapshot.forEach((doc) => {
            updateDoc(doc.ref, {
              isComplete: true,
            });
          });
        }
      );

      // await updateDoc(todoDocRef, {
      //   isComplete: true,
      // });
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({});
  };
  todoSetShow();
}
