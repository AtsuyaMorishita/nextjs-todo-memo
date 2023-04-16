// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUserId = req.body.currentUserId;

  const usersCollectionRef = collection(db, "user", currentUserId, "todo");

  let allTodos: any = [];

  const todoSetShow = async () => {
    try {
      /**
       * 全てのTodoを取得する
       */
      await getDocs(usersCollectionRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          allTodos.push({ id: doc.id, ...doc.data() });
        });
      });
    } catch (error) {
      console.log(error);
    }

    res.status(200).json(allTodos);
  };
  todoSetShow();
}
