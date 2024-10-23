import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    startAfter,
    orderBy,
    query,
    updateDoc,
    where, startAt,
} from "firebase/firestore";


import { fireDB } from "../firabaseConfig";
export const getDataAjax = async (table,field,filter) => {
    try {
        const items = [];
        const qry = query(
            collection(fireDB, table),
            where(field, "==", filter)
        );
        const querySnapshot = await getDocs(qry);
        // console.log('querySnapshot',querySnapshot)
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });

        return {
            success: true,
            data: items,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};


///////////////////////////////////////
// Загрузка первой страницы с возможностью сортировки и поиска
export const fetchPage = async (fireDB,table,sortField,pagesLimit,searchQuery=null,vPage=null,page='first',level='A0') => {

    const collectionRef = collection(fireDB, table);
    let q, startFunc, direction = "asc";

    if (page === 'first') {
        startFunc = startAfter(0);
    } else if (page === 'next') {
        startFunc = startAfter(vPage);
    } else if (page === 'prev') {
        startFunc = startAt(vPage);
    } else if (page === 'last') {
        startFunc = startAfter(0)
        direction = "desc";
    };
    // Если есть поисковый запрос, добавляем фильтр where
    if (searchQuery) {
        q = query(
            collectionRef,
            where(sortField, ">=", searchQuery),
            where(sortField, "<=", searchQuery + "\uf8ff"),
            where('level', '==', level),
            orderBy(sortField,direction),
            startFunc,
            limit(pagesLimit)
        );
    } else {
        if (page === 'last')
            q = query(
                collectionRef,
                where('level', "==", level),
                orderBy(sortField,direction),
                limit(pagesLimit));
        else {
            q = query(
                collectionRef,
                where('level', "==", level),
                orderBy(sortField,direction),
                startFunc,
                limit(pagesLimit));
        }
        // Добавляем сортировку и лимит
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot;

    // const data = querySnapshot.docs.map(doc => ({id: doc.id,...doc.data()}));
    // setData(data);
    // setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    // setFirstVisible(querySnapshot.docs[0]); // Сохраняем первый документ
    // setVisibleDocs([querySnapshot.docs[0]]); // Сохраняем первый видимый документ первой страницы
    // setCurrentPage(0);
    // setIsNextDisabled(querySnapshot.docs.length < pagesLimit);
    // setIsPrevDisabled(true); // Отключаем кнопку "Previous" для первой страницы
    // setIsFirstDisabled(true); // Отключаем кнопку "First"
    // setIsLastDisabled(false); // Включаем кнопку "Last"
};

/*
//query,query,where,getDocs
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../firabaseConfig";

// Инициализация Firestore
//const db = getFirestore();

// Функция для получения данных с использованием query и where
export function getUsersData() {
    // Создаем запрос для получения пользователей, например, старше 25 лет
    const qry = query(
        collection(fireDB, "users"),
        where("name", "==", "user1")
    );
    getDocs(qry).then(snapshot => {
        let users = [];
        snapshot.forEach(doc => {
            users.push(doc.data());
        });
        console.log('users',users); // Данные пользователей, которые подходят под условия

        // Передаем данные в функцию отображения
        return users;
    }).catch(error => {
        console.error('Error fetching data:', error);
    });

    // const querySnapshot =  getDocs(qry);
    //     querySnapshot.forEach((doc) => {
    //         items.push({ id: doc.id, ...doc.data() });
    //     });
    // return items(items);
}
*/
// getUsersData()
//     .then(snapshot => {
//         let users = [];
//         snapshot.forEach(doc => {
//             users.push(doc.data());
//         });
//         console.log(users); // Данные пользователей, которые подходят под условия
//
//         // Передаем данные в функцию отображения
//         return users;
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
/////
// const getPromise = (table,field,filter) => {
//     try {
//         const items = [];
//         const qry = query(
//             collection(fireDB, table),
//             where(field, "==", filter)
//         );
//         const querySnapshot = getDocs(qry);
//         querySnapshot.forEach((doc) => {
//             items.push({ id: doc.id, ...doc.data() });
//         });
//         return items
//     } catch (error) {
//         return null
//     }
// };
// const db = firebase.firestore();
// // Получение данных из коллекции "users"
// function getUsersData() {
//     return db.collection('users').get();
// }
//
// export const getDataAjax()
//     .then(snapshot => {
//         let users = [];
//         snapshot.forEach(doc => {
//             users.push(doc.data());
//         });
//         console.log(users); // Данные пользователей
//
//         // Обработка данных или передача дальше
//         //displayData(users); // Например, функция для отображения данных на странице
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
