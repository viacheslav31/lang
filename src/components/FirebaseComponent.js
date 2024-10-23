// import React from "react";
// import {
//     addDoc,
//     collection,
//     deleteDoc,
//     doc,
//     getDoc,
//     getDocs,
//     orderBy,
//     query,
//     updateDoc,
//     where,
// } from "firebase/firestore";
//
//
// import { fireDB } from "../firabaseConfig";
//
// const getDataAjax = async (table,field,filter) => {
//     try {
//         const items = [];
//         const qry = query(
//             collection(fireDB, table),
//             where(field, "==", filter)
//         );
//         const querySnapshot = await getDocs(qry);
//         querySnapshot.forEach((doc) => {
//             items.push({ id: doc.id, ...doc.data() });
//         });
//
//         return {
//             success: true,
//             data: items,
//         };
//     } catch (error) {
//         return {
//             success: false,
//             message: "Something went wrong",
//         };
//     }
// };
//
//
//
//
// export function FirebaseComponent() {
//     return (
//         <>
//             {getDataAjax("users","name","user1")}
//         </>
//     );
// }
//
//
