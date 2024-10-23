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

export const addNewJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await addDoc(collection(fireDB, "jobs"), {
      ...payload,
      status: "pending",
      postedByUserId: user.id,
      postedByUserName: user.name,
      postedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });

    // send notification to admin
    await addDoc(collection(fireDB, "users", "admin", "notifications"), {
      title: `New Job Post Request from ${user.name}`,
      onClick: `/admin/jobs`,
      createdAt: moment().format("DD-MM-YYYY HH:mm A"),
      status: "unread",
    });
    return {
      success: true,
      message: "Job posted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getUser = async (userId) => {
  // ###
  if (userId === undefined) return undefined;
  const docUser = doc(fireDB, "users", userId);
  const docSnapUserName = await getDoc(docUser);
  if (docSnapUserName.exists()) {
    //console.log(docSnapUserName.data().name)

    return docSnapUserName.data().name;
  }
  return undefined;
  // ###
}

export const getPostedJobsByUserId = async (userId) => {
  try {
    // Получаем все документы из коллекции posts
    //const jobsRef = query(collection(fireDB, "jobs"), orderBy("postedOn", "desc"));
    const jobsRef = collection(fireDB, "jobs");
    const jobsSnap = await getDocs(jobsRef);
    const jobsData = [];

    //console.log('jobsSnap',jobsSnap.docs)
    // Для кожного job получаем відповідного користувача по userId
    //jobsSnap.forEach( (jobDoc) => {
    for (const jobDoc of jobsSnap.docs) {

      const job = jobDoc.data();
      const userId = job.userId;
      if(userId !== undefined) {
        const userRef = doc(fireDB, "users", job.userId);
        const userSnap = await getDoc(userRef);

        if (userSnap) {
          const user = userSnap.data();
          //jobsData.push({ ...job, id: job.id, userName: user.name });
          jobsData.push({...job, userId_name_: user.name});
        } else {
          //console.log('job', 'no')
          jobsData.push({...job, userId_name_: ""});
        }
      } else {
        jobsData.push({ ...job, userId_name_: "" });
      }

      //console.log('jobsData1', {...job, userName: "Unknown User"})

     // jobsData.push({ ...job, userName: "Unknown User" });
    }
     console.log('jobsData',jobsData)

    return {
      success: true,
      data: jobsData,
    };
    //setPosts(postsData);
  } catch (error) {
    //console.error("Помилка отримання даних:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export const getPostedJobsByUserId2 = async (userId) => {

  // const qry = query(
  //     collection(fireDB, "users"),
  //     where("email", "==", payload.email)
  // );

  try {
    const jobs = [];
    const qry = query(collection(fireDB, "jobs"), orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach( (doc) => {
      if (doc.data().postedByUserId === userId) {

          const data = doc.data();

          // ###
          const userId = data.userId
          let response = null;


          //const response = await getUser(userId);
          // if (userId !== undefined) {
          //   const docUser = doc(fireDB, "users", userId);
          //   const docSnapUserName =  getDoc(docUser);
          //   if (docSnapUserName.exists()) {
          //     response = docSnapUserName.data().name;
          //   }
          // }

          if (response) {
            //console.log('user2',response)
            data.userId_name = response;
          } else {
            data.userId_name = '';
          }

        //console.log('data',data)
          // // ###
          // const docUser = doc(fireDB, "users", 'Tdj3uszGaaqdw5XMRYn8');
          // const docSnapUserName = await getDoc(docUser);
          // let userName = null;
          // if (docSnapUserName.exists()) {
          //   userName = docSnapUserName.data().name;
          //   console.log('user',userName)
          // }
          // data.userId_name_ = userName;//data.user = {title:userName,id:data.userId};
          // // ###

        // jobs.push({ id: doc.id, ...doc.data() });
        jobs.push({ id: doc.id, ...data });

      }
    });
    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getJobById = async (id) => {
  try {
    const docRef = doc(fireDB, "jobs", id);

    // add username
    // const qry = query(
    //     collection(fireDB, "users"),
    //     where("email", "==", payload.email)
    // );

    //const id ='Tdj3uszGaaqdw5XMRYn8';
    const docUser = doc(fireDB, "users", 'Tdj3uszGaaqdw5XMRYn8');
    //console.log('id',id)

    // ###
    const docSnapUserName = await getDoc(docUser);
    let userName = null;
    if (docSnapUserName.exists()) {
      userName = docSnapUserName.data().name;
      //console.log('user',userName)
    }
    // add username
    const docSnap = await getDoc(docRef);
    let data = docSnap.data();//, {'user': userName}]);
    //data1 = [...data1];//, {'user': userName}]);
    data.userId_name_ = userName;//data.user = {title:userName,id:data.userId};
    //data.map((doc) => {});
    // data.forEach((doc) => {});
    // ###

    if (docSnap.exists()) {
      return {
        success: true,
        data: data, //docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No such job!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getAllJobs = async (filters) => {
  try {
    let whereConditions = [];
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          whereConditions.push(where(key, "==", filters[key]));
        }
      });
    }
    //console.log(filters);
    const jobs = [];
    const qry = query(collection(fireDB, "jobs"), ...whereConditions);
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    const sortedPosts = jobs.sort((a, b) => {
      return moment(b.postedOn, "DD-MM-YYYY HH:mm A").diff(
        moment(a.postedOn, "DD-MM-YYYY HH:mm A")
      );
    });
    return {
      success: true,
      data: sortedPosts,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const editJobDetails = async (payload) => {
  console.log(payload);
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const changeJobStatusFromAdmin = async (payload) => {
  try {
    console.log(payload);
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });

    // send notification to user
    await addDoc(
      collection(fireDB, "users", payload.postedByUserId, "notifications"),
      {
        title: `Your job post request for ${payload.title} has been ${payload.status}`,
        onClick: `/posted-jobs`,
        createdAt: moment().format("DD-MM-YYYY HH:mm A"),
        status: "unread",
      }
    );
    return {
      success: true,
      message: "Job updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const deleteJobById = async (id) => {
  try {
    await deleteDoc(doc(fireDB, "jobs", id));
    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const applyJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const job = payload;
  try {
    await addDoc(collection(fireDB, "applications"), {
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userId: user.id,
      userName: user.name,
      email: user.email,
      phoneNumber: user?.phoneNumber || "",
      appliedOn: moment().format("DD-MM-YYYY HH:mm A"),
      status: "pending",
    });

    // send notification to job poster
    await addDoc(
      collection(fireDB, "users", job.postedByUserId, "notifications"),
      {
        title: `${user.name} has applied for your job post ${job.title}`,
        onClick: `/posted-jobs`,
        createdAt: moment().format("DD-MM-YYYY HH:mm A"),
        status: "unread",
      }
    );
    return {
      success: true,
      message: "Job applied successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getApplicationsByUserId = async (userId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getApplicationsByJobId = async (jobId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("jobId", "==", jobId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getAllApplications = async () => {
  try {
    const applications = [];
    const qry = query(collection(fireDB, "applications"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const changeApplicationStatus = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "applications", payload.id), {
      status: payload.status,
    });

    // send notification to user
    await addDoc(collection(fireDB, `users/${payload.userId}/notifications`), {
      title: `Your application for ${payload.jobTitle} in ${payload.company} is ${payload.status}`,
      onClick: `/applied-jobs`,
      status: "unread",
      createdAt: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Application status updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
