// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const todoData = req.body.todoData;
  const currentUserId = req.body.currentUserId;

  const usersCollectionRef = collection(db, "user", currentUserId, "todo");

  let allTodos: any = [];

  const todoSetShow = async () => {
    try {
      /**
       * DB(todo)にデータを格納する
       */
      await setDoc(doc(usersCollectionRef), todoData);

      /**
       * 全てのTodoを取得する
       */
      await getDocs(usersCollectionRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          allTodos.push({ id: doc.id, ...doc.data() });
        });
      });

      //日付順に配列を並び替える
      allTodos.sort((a: any, b: any) => {
        const timestampA = new Date(a.timestamp).getTime();
        const timestampB = new Date(b.timestamp).getTime();
        return timestampB - timestampA;
      });
    } catch (error) {
      console.log(error);
    }

    res.status(200).json(allTodos);
  };
  todoSetShow();
}
