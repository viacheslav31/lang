import React, { useState, useEffect } from "react";
import { collection, query, getDocs, limit, startAfter, startAt, orderBy, where } from "firebase/firestore";
//import { fireDB } from "./firebaseConfig"; // Заменяем db на fireDB
import { fireDB } from "../../firabaseConfig";
import {Card, Select} from "antd";
import PageTitle from "../../components/PageTitle";

const pagesLimit = 1; // Константа для ограничения количества документов на страницу
const fieldName = "eng"; // Поле по умолчанию для сортировки (заменяем "name" на fieldName)

const PaginatedList = () => {
    const [data, setData] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [firstVisible, setFirstVisible] = useState(null); // Для первой записи
    const [visibleDocs, setVisibleDocs] = useState([]); // Список первых видимых документов на страницах
    const [currentPage, setCurrentPage] = useState(0); // Текущая страница
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isFirstDisabled, setIsFirstDisabled] = useState(true);
    const [isLastDisabled, setIsLastDisabled] = useState(false);
    const [sortField, setSortField] = useState("eng"); // Поле для сортировки
    const [searchQuery, setSearchQuery] = useState(""); // Поисковый запрос

    const [currentLang, setCurrentLang] = useState('eng');
    //const [currentItem, setCurrentItem] = useState(1);
    const [level, setLevel] = useState('A0');
    //const [lang, setLang] = useState('ukr');


    // Загрузка первой страницы с возможностью сортировки и поиска
    const fetchFirstPage = async () => {
        const collectionRef = collection(fireDB, "lang");
        let q;

        // Если есть поисковый запрос, добавляем фильтр where
        if (searchQuery) {
            q = query(
                collectionRef,
                where(sortField, ">=", searchQuery),
                where(sortField, "<=", searchQuery + "\uf8ff"),
                orderBy(sortField),
                limit(pagesLimit)
            );
        } else {
            q = query(collectionRef, orderBy(sortField), limit(pagesLimit)); // Добавляем сортировку и лимит
        }

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setData(data);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setFirstVisible(querySnapshot.docs[0]); // Сохраняем первый документ
        setVisibleDocs([querySnapshot.docs[0]]); // Сохраняем первый видимый документ первой страницы
        setCurrentPage(0);
        setIsNextDisabled(querySnapshot.docs.length < pagesLimit);
        setIsPrevDisabled(true); // Отключаем кнопку "Previous" для первой страницы
        setIsFirstDisabled(true); // Отключаем кнопку "First"
        setIsLastDisabled(false); // Включаем кнопку "Last"
    };

    // Загрузка следующей страницы
    const fetchNextPage = async () => {
        const collectionRef = collection(fireDB, "lang");
        let q;

        // Если есть поисковый запрос, добавляем фильтр where
        if (searchQuery) {
            q = query(
                collectionRef,
                where(sortField, ">=", searchQuery),
                where(sortField, "<=", searchQuery + "\uf8ff"),
                orderBy(sortField),
                startAfter(lastVisible),
                limit(pagesLimit)
            );
        } else {
            q = query(collectionRef, orderBy(sortField), startAfter(lastVisible), limit(pagesLimit));
        }

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setData(data);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setVisibleDocs(prev => [...prev, querySnapshot.docs[0]]); // Добавляем новый видимый документ
        setCurrentPage(prev => prev + 1); // Увеличиваем номер страницы
        setIsNextDisabled(querySnapshot.docs.length < pagesLimit);
        setIsPrevDisabled(false); // Включаем кнопку "Previous"
        setIsFirstDisabled(false); // Включаем кнопку "First"
        setIsLastDisabled(querySnapshot.docs.length < pagesLimit); // Отключаем "Last" на последней странице
    };

    // Загрузка предыдущей страницы
    const fetchPrevPage = async () => {
        if (currentPage > 0) {
            const collectionRef = collection(fireDB, "lang");
            let q;

            // Если есть поисковый запрос, добавляем фильтр where
            if (searchQuery) {
                q = query(
                    collectionRef,
                    where(sortField, ">=", searchQuery),
                    where(sortField, "<=", searchQuery + "\uf8ff"),
                    orderBy(sortField),
                    startAt(visibleDocs[currentPage - 1]),
                    limit(pagesLimit)
                );
            } else {
                q = query(collectionRef, orderBy(sortField), startAt(visibleDocs[currentPage - 1]), limit(pagesLimit));
            }

            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setData(data);
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setCurrentPage(prev => prev - 1); // Переходим на предыдущую страницу
            setIsPrevDisabled(currentPage - 1 === 0); // Отключаем кнопку, если это первая страница
            setIsNextDisabled(false); // Включаем кнопку "Next"
            setIsFirstDisabled(currentPage - 1 === 0); // Отключаем "First" на первой странице
            setIsLastDisabled(false); // Включаем кнопку "Last"
        }
    };

    // Переход к первой странице
    const fetchFirstRecord = async () => {
        await fetchFirstPage(); // Повторяем запрос на первую страницу
    };

    // Переход к последней странице
    const fetchLastRecord = async () => {

        const collectionRef = collection(fireDB, "lang");
        let q;

        // Если есть поисковый запрос, добавляем фильтр where
        if (searchQuery) {
            q = query(
                collectionRef,
                where(sortField, ">=", searchQuery),
                where(sortField, "<=", searchQuery + "\uf8ff"),
                orderBy(sortField, "desc"),
                limit(pagesLimit)
            );
        } else {
            q = query(collectionRef, orderBy(sortField, "desc"), limit(pagesLimit)); // Сортировка в обратном порядке
        }

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setData(data.reverse()); // Разворачиваем данные обратно для правильного порядка
        setLastVisible(querySnapshot.docs[0]);
        setVisibleDocs([querySnapshot.docs[querySnapshot.docs.length - 1]]); // Сохраняем последний видимый документ
        setCurrentPage(0);//(Number.MAX_SAFE_INTEGER); // Условно указываем, что это последняя страница
        setIsNextDisabled(true); // Отключаем "Next"
        setIsPrevDisabled(false); // Включаем "Previous"
        setIsFirstDisabled(false); // Включаем кнопку "First"
        setIsLastDisabled(true); // Отключаем "Last"
    };

    useEffect(() => {
        fetchFirstPage();
    }, [setLevel,sortField, searchQuery]); // Обновляем список при изменении сортировки или поискового запроса


    ////////////////// Random
    const getRandomDocument = async () => {
       // ****
       //  const q = query(collection(fireDB, "lang"), where(level, "==", "A1"));
       //  const querySnapshot = await getDocs(q);
       //  const optionsData = [];
       //  querySnapshot.forEach((doc) => {
       //      const data = doc.data();
       //      field2 data[field1];
       //  });

    //****
        const collectionRef = collection(fireDB, "lang");

        // Получаем все документы для подсчета
        //###
        const randomAllDocs = query(collectionRef, where('level', "==", "A0"));
        const allDocs = await getDocs(randomAllDocs);

        //###
        //const allDocs = await getDocs(collectionRef);
        const totalDocs = allDocs.size; // Общее количество документов

        const randomIndex = Math.floor(Math.random() * totalDocs); // Случайный индекс

        // Запрашиваем документы и пропускаем до случайного индекса
        const randomQuery = query(collectionRef, limit(randomIndex + 1));
        const querySnapshot = await getDocs(randomQuery);

        const docs = querySnapshot.docs;
        const randomDoc = docs[randomIndex]; // Получаем случайный документ
//        console.log(randomDoc.id, randomDoc.data());

        // const data = querySnapshot.docs.map(doc => ({
        //     id: doc.id,
        //     ...doc.data()
        // }));
        const data = [{...randomDoc.data(),id:randomDoc.id}];
        console.log(data);

        setData(data);
    };

    const getRandomDocument2 = async () => {
        const collectionRef = collection(fireDB, "lang");

        const randomDocRef = await getDocs(query(collectionRef, limit(10))); // Получаем документ для курсора
        const randomDoc = randomDocRef.docs[1];

        const randomQuery = query(
            collectionRef,
            orderBy("__name__"), // Упорядочиваем по имени документа
            startAt(randomDoc), // Начинаем с случайного документа
            limit(1) // Ограничиваем результат одной записью
        );

        const querySnapshot = await getDocs(randomQuery);
        querySnapshot.forEach(doc => {
            console.log(doc.id, doc.data());
        });
    };

    const changeCart = async () => {
        if (currentLang === 'eng') {
            setCurrentLang('ukr')
        } else {
            setCurrentLang('eng')
        }
    }


    const handleChangeLevel = (value) => {
        setLevel(value);
        //setCurrentItem(1)
        //fetchFirstRecord();
    };

    return (
        <div>
            {/*<div className="d-flex justify-content-between">*/}
            <div className="d-flex justify-content-start gap-5">
                <PageTitle title="Carts" />
                <div className="d-flex justify-content-end gap-3">
                    <Select
                        defaultValue="A0"
                        style={{width:100,height:40}}
                        onChange={handleChangeLevel}
                        options={[
                            {value: 'A0', label: 'A0',},
                            {value: 'A1', label: 'A1',},
                            {value: 'A2', label: 'A2',},
                            {value: 'A3', label: 'A3',},
                            {value: 'B1',label: 'B1',},
                        ]}
                    >
                    </Select>
                    {/*<Select*/}
                    {/*    defaultValue="ukr"*/}
                    {/*    style={{width: 120,height:40}}*/}
                    {/*    onChange={handleChangeLang}*/}
                    {/*    options={[{value: 'eng', label: 'Eng',}, {value: 'ukr', label: 'Ukr',},]}*/}
                    {/*>*/}
                    {/*</Select>*/}
                    {/*<button className="primary-outlined-btn" onClick={() => navigate("/lang/new")}>Learned</button>*/}
                </div>
            </div>

            <div>
                <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
                    <option value="eng">Sort by English</option>
                    <option value="ukr">Sort by Ukrainian</option>
                </select>
                <input
                    type="text"
                    placeholder={`Search by ${sortField}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.id}: {item.eng} - {item.ukr}</li>
                ))}
            </ul>

            {data && (
                <Card
                    onClick={() => changeCart()}
                    hoverable
                    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    style={{ width: 350,height:200 }}
                >
                    <h5>{currentLang === 'eng' ? data[0]?.eng : data[0]?.ukr}</h5>
                    <hr/>
                    <h6>{currentLang === 'eng' ? data[0]?.transcript : ''}</h6>
                    <br/>
                    <small>Level: {data[0]?.level}</small><br/>
                    {/*<small>Lang: {lang}</small><br/>*/}
                    {/*<small>Current: {currentItem}</small>*/}
                </Card>
            )}
            <button onClick={getRandomDocument}>Random</button>
            <button onClick={fetchFirstRecord} disabled={isFirstDisabled}>Первая запись</button>
            <button onClick={fetchPrevPage} disabled={isPrevDisabled}>Previous</button>
            <button onClick={fetchNextPage} disabled={isNextDisabled}>Next</button>
            <button onClick={fetchLastRecord} disabled={isLastDisabled}>Последняя запись</button>
        </div>
    );
};

export default PaginatedList;


// import React, { useState, useEffect } from "react";
// import { collection, query, getDocs, limit, startAfter, startAt, orderBy } from "firebase/firestore";
// import { fireDB } from "../../firabaseConfig";
//
// const pagesLimit = 40; // Константа для ограничения количества документов на страницу
// const orderByField = 'eng'; // Константа для ограничения количества документов на страницу
//
// const PaginatedList = () => {
//     const [data, setData] = useState([]);
//     const [lastVisible, setLastVisible] = useState(null);
//     const [firstVisible, setFirstVisible] = useState(null); // Для первой записи
//     const [visibleDocs, setVisibleDocs] = useState([]); // Список первых видимых документов на страницах
//     const [currentPage, setCurrentPage] = useState(0); // Текущая страница
//     const [isNextDisabled, setIsNextDisabled] = useState(false);
//     const [isPrevDisabled, setIsPrevDisabled] = useState(true);
//     const [isFirstDisabled, setIsFirstDisabled] = useState(true);
//     const [isLastDisabled, setIsLastDisabled] = useState(false);
//
//     // Загрузка первой страницы
//     const fetchFirstPage = async () => {
//         const collectionRef = collection(fireDB, "lang");
//         const q = query(collectionRef, orderBy(orderByField), limit(pagesLimit)); // Добавляем сортировку и лимит
//         const querySnapshot = await getDocs(q);
//
//         const data = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));
//
//         setData(data);
//         setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
//         setFirstVisible(querySnapshot.docs[0]); // Сохраняем первый документ
//         setVisibleDocs([querySnapshot.docs[0]]); // Сохраняем первый видимый документ первой страницы
//         setCurrentPage(0);
//         setIsNextDisabled(querySnapshot.docs.length < pagesLimit);
//         setIsPrevDisabled(true); // Отключаем кнопку "Previous" для первой страницы
//         setIsFirstDisabled(true); // Отключаем кнопку "First"
//         setIsLastDisabled(false); // Включаем кнопку "Last"
//     };
//
//     // Загрузка следующей страницы
//     const fetchNextPage = async () => {
//         const collectionRef = collection(fireDB, "lang");
//         const q = query(collectionRef, orderBy(orderByField), startAfter(lastVisible), limit(pagesLimit));
//         const querySnapshot = await getDocs(q);
//
//         const data = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));
//
//         setData(data);
//         setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
//         setVisibleDocs(prev => [...prev, querySnapshot.docs[0]]); // Добавляем новый видимый документ
//         setCurrentPage(prev => prev + 1); // Увеличиваем номер страницы
//         setIsNextDisabled(querySnapshot.docs.length < pagesLimit);
//         setIsPrevDisabled(false); // Включаем кнопку "Previous"
//         setIsFirstDisabled(false); // Включаем кнопку "First"
//         setIsLastDisabled(querySnapshot.docs.length < pagesLimit); // Отключаем "Last" на последней странице
//     };
//
//     // Загрузка предыдущей страницы
//     const fetchPrevPage = async () => {
//         if (currentPage > 0) {
//             const collectionRef = collection(fireDB, "lang");
//             const q = query(collectionRef, orderBy(orderByField), startAt(visibleDocs[currentPage - 1]), limit(pagesLimit));
//             const querySnapshot = await getDocs(q);
//
//             const data = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//
//             setData(data);
//             setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
//             setCurrentPage(prev => prev - 1); // Переходим на предыдущую страницу
//             setIsPrevDisabled(currentPage - 1 === 0); // Отключаем кнопку, если это первая страница
//             setIsNextDisabled(false); // Включаем кнопку "Next"
//             setIsFirstDisabled(currentPage - 1 === 0); // Отключаем "First" на первой странице
//             setIsLastDisabled(false); // Включаем кнопку "Last"
//         }
//     };
//
//     // Переход к первой странице
//     const fetchFirstRecord = async () => {
//         await fetchFirstPage(); // Повторяем запрос на первую страницу
//     };
//
//     // Переход к последней странице
//     const fetchLastRecord = async () => {
//         const collectionRef = collection(fireDB, "lang");
//         const q = query(collectionRef, orderBy(orderByField, "desc"), limit(pagesLimit)); // Сортировка в обратном порядке
//         const querySnapshot = await getDocs(q);
//
//         const data = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));
//
//         setData(data.reverse()); // Разворачиваем данные обратно для правильного порядка
//         setLastVisible(querySnapshot.docs[0]);
//         setVisibleDocs([querySnapshot.docs[querySnapshot.docs.length - 1]]); // Сохраняем последний видимый документ
//         setCurrentPage(Number.MAX_SAFE_INTEGER); // Условно указываем, что это последняя страница
//         setIsNextDisabled(true); // Отключаем "Next"
//         setIsPrevDisabled(false); // Включаем "Previous"
//         setIsFirstDisabled(false); // Включаем кнопку "First"
//         setIsLastDisabled(true); // Отключаем "Last"
//     };
//
//     useEffect(() => {
//         fetchFirstPage();
//     }, []);
//
//     return (
//         <div>
//             <ul>
//                 {data.map(item => (
//                       <li key={item.id}>{item.id}: {item.eng} - {item.ukr}</li>
//
//                 ))}
//             </ul>
//             <button onClick={fetchFirstRecord} disabled={isFirstDisabled}>Первая запись</button>
//             <button onClick={fetchPrevPage} disabled={isPrevDisabled}>Previous</button>
//             <button onClick={fetchNextPage} disabled={isNextDisabled}>Next</button>
//             <button onClick={fetchLastRecord} disabled={isLastDisabled}>Последняя запись</button>
//         </div>
//     );
// };
//
// export default PaginatedList;
