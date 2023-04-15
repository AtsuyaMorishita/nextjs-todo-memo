// import { useRouter } from "next/router";

// export default function Logout() {
//   const router = useRouter();

//   const Logout = async (e: any) => {
//     e.preventDefault();
//     try {
//       const { error: logoutError } = await supabase.auth.signOut();
//       if (logoutError) {
//         throw logoutError;
//       }
//       await router.push("/");
//     } catch {
//       alert("エラーが発生しました");
//     }
//   };
//   return (
//     <>
//       <div>
//         <form onSubmit={Logout}>
//           <button type="submit">ログアウトする</button>
//         </form>
//       </div>
//     </>
//   );
// }
