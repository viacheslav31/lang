import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";

import { fireDB } from "../firabaseConfig";
import {app_url} from "../config/app";

// addRecord, editRecord, getRecordById

export const addRecord = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    if (payload.eng === undefined) payload.eng = '<>';
    if (payload.ukr === undefined) payload.ukr = '<>';
    if (payload.transcript === undefined) payload.transcript = '<>';//'['+payload.eng+']';
    //else payload.transcript = '['+payload.transcript+']';
    if (payload.level === undefined) payload.level = 'A0';
    if (payload.status === undefined) payload.status = 'new';


    const id = await addDoc(collection(fireDB, "lang"), {
      ...payload,
      postedByUserId: user.id,
      postedByUserName: user.name,
      postedOn: moment().format("DD-MM-YYYY HH:mm A"),
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    //console.log('id',id.key)

    return {
      success: true,
      message: "Record posted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const editRecord = async (payload) => {

  const user = JSON.parse(localStorage.getItem("user"));
  try {
    //await updateDoc(doc(fireDB, "users", payload.id), payload);
    await updateDoc(doc(fireDB, "lang", payload.id), {
      ...payload,
      postedByUserId: user.id,
      postedByUserName: user.name,
      postedOn: moment().format("DD-MM-YYYY HH:mm A"),
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Record updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getRecordById = async (id) => {
  try {
    const docRef = doc(fireDB, "lang", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No such record!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getRecordByIndex = async (index,level) => {
  try {
//FIREBASE

      let record = null;
      const qry = query(
          collection(fireDB, "lang"),
          where("index", "==", index),
          where("level", "==", level),
      );
      const querySnapshot = await getDocs(qry);
      querySnapshot.forEach((doc) => {
        record = { id: doc.id, ...doc.data() }
      });

      return {
        success: true,
        data: record,
      };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
  const columns = '';
  // PHP
  // try {
  //   const response = await fetch(`${app_url}/get.php`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       columns: columns,
  //       table: 'lang',
  //       id: id,
  //     })
  //   });
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // } catch (error) {
  //   return {
  //     success: false,
  //     message: "Something went wrong",
  //   };
  // }

};

export const getAllRecords = async () => {
  try {
    const records = [];
    const querySnapshot = await getDocs(collection(fireDB, "lang"));
    querySnapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: records,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getAllRecordsByLevel = async (level) => {
  try {
    const records = [];
    const qry = query(
        collection(fireDB, "lang"),
        where("level", "==", level)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });
    //console.log('records',records)
    return {
      success: true,
      data: records,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const deleteRecordById = async (id) => {
  try {
    await deleteDoc(doc(fireDB, "lang", id));
    return {
      success: true,
      message: "Record deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};


export const clearCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(fireDB, collectionName));

  querySnapshot.forEach(async (document) => {
    await deleteDoc(doc(fireDB, collectionName, document.id));
  });
}

export const getDocumentCount = async (collectionName) => {
  const querySnapshot = await getDocs(collection(fireDB, collectionName));
  const count = querySnapshot.size; // Количество документов
  //console.log(`Count rec in ${collectionName}: ${count}`);
  return count;
}
//getDocumentCount('users');
