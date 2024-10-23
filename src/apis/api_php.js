import {app_url} from "../config/app";

//const databaseUrl = "http://backend:83";
// import {addDoc, collection, doc, getDoc} from "firebase/firestore";
// import {fireDB} from "../firabaseConfig";
// import moment from "moment";

export const getAllRecords = async (columns,tableParams,searchText,table) => {
    try {
        //${qs.stringify(getParams(tableParams))}&c=${JSON.stringify(fields[`${table}_columns`])}&s=${searchText}&table=${table}`
        // getAllRecords(columns,tableParams,searchText,table);

        //console.log('resp1',`${app_url}/index.php`)
        const response = await fetch(`${app_url}/index.php`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                //id: id,
                //tableParams: tableParams,
                columns: columns,
                page: tableParams.pagination.current,
                limit: tableParams.pagination.pageSize,
                sortOrder: tableParams.sortOrder,
                sortField: tableParams.sortField,
                searchText : searchText,
                table: table
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //console.log('resp',response.json())
        return response.json();

        // if(response.ok) {return await response.json();
        // } else {
        //     return {success: false, message: "Something went wrong",};
        // }
    } catch (error) {
        //console.error('Error:', error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }

    // return fetch(`${app_url}/index.php`)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         return {
    //             success: true,
    //             data: data,
    //         };
    //     })
    //     .catch(error => {
    //         console.log('Error fetching data:', error);
    //         return {
    //             success: false,
    //             message: "Something went wrong:",
    //         };
    //     });
};

// export const fetchItems = async () => {
//     try {
//         const response = await fetch(databaseUrl+'/get.php');
//         const data = await response.json();
//         setUsers(data);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//     }
// };

//getRefName(refTable,refName,refId);

export const getRecordById = async (columns,table,id) => {

    try {
        //const response = await fetch(`${app_url}/index.php`, {
        const response = await fetch(`${app_url}/get.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                columns: columns,
                table: table,
                id: id,
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        //console.log('form',response)
        //return response;
        return response.json();
        // const json = response.json();
        // if(response.ok) {
        //     //return response.json();
        //     return {
        //         success: true,
        //         data: json
        //     };
        // } else {
        //     return {
        //         success: false,
        //         message: "Something went wrong for get record",
        //     };
        // }
    } catch (error) {
        //console.error('Error:', error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }

    // return fetch(`${app_url}/index.php?id=${id}`)//('http://backend:83/index.php?id='+id)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => {
    //         return {
    //             success: true,
    //             data: data,
    //         };
    //     })
    //     .catch(error => {
    //         console.log('Error fetching data:', error);
    //         return {
    //             success: false,
    //             message: "Something went wrong",
    //         };
    //     });
};

export const insertItem = async (table,columns,payload) => {

    //console.log('data111',JSON.stringify(data))
    //const user = JSON.parse(localStorage.getItem("user"));

    try {

        //синхронізувати передані поля з статусом колонки (save_in_db)
        const columns2 =  columns.filter(function (column) {
            return column.store;
        });

        let data = [];
        columns2.map((item) =>
            // (
            //     data[item.name] = payload[item.name]
            //     // {[item.name]: payload[item.name]}
            // )
            // items.push({id: id, count: count});
            data[item.name] = payload[item.name]

        );
        //console.log('data',data)

        // if (payload.lang1 === undefined) payload.lang1 = '<>';
        // if (payload.lang2 === undefined) payload.lang2 = '<>';
        // if (payload.desc === undefined) payload.desc = '<>';
        // if (payload.level === undefined) payload.level = 'A0';

        //передаєм масив: ключ(колонка БД)->значення
        // desc: "aaa",lang1: "bbb", lang2: "ccc",level: "A1"

        const response = await fetch(`${app_url}/insert.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                table: table,
                //...data,
                ...data,

                // ...payload,
                // user_id: user.id,
            }),
        });

        const result = await response.json();

        if (result.status === 'success') {
            return {
                success: true,
                message: "Record added successfully",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong for added",
        };
    }
}

export const editItem = async (table,columns,payload,id) => {
    //const user = JSON.parse(localStorage.getItem("user"));
    try {
        //console.log('payload',payload)
        //const id = payload.id;

        // if (payload.lang1 === undefined) payload.lang1 = '<>';
        // if (payload.lang2 === undefined) payload.lang2 = '<>';
        // if (payload.desc === undefined) payload.desc = '<>';
        // if (payload.level === undefined) payload.level = 'A0';

        //console.log('ttt',table,id)
        //синхронізувати передані поля з статусом колонки (save_in_db)
        const columns2 = columns.filter(function (column) {
            return column.store;
        });
        let data = [];
        columns2.map((item) =>
            data[item.name] = payload[item.name]
        );
        //console.log('data2',data)

        //const response = await fetch('http://backend:83/edit.php', {
        const response = await fetch(`${app_url}/edit.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                table: table,
                id: id,
                ...data,
                // user_id: user.id,
                // user_name: user.name,
            }),
        });
        const result = await response.json();
        if (result.status === 'success') {
            return {
                success: true,
                message: "Record updated successfully",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong for updated',
        };
    }
}

export const deleteItem = async (table,id) => {
    const data = { table, id };

    try {
        const response = await fetch(`${app_url}/delete.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.status === 'success') {
            return {
                success: true,
                message: 'Record deleted successfully',
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            message: 'Something went wrong for deteted',
        };
    }
}


export const ajax = async (table,fieldName,search) => {
    try {
        // const columns2 =  columns.filter(function (column) {
        //     return column.store;
        // });
        // let data = [];
        // columns2.map((item) =>
        //     data[item.name] = payload[item.name]
        // );
        // console.log('data2',data)

        //const response = await fetch('http://backend:83/edit.php', {

        const response = await fetch(`${app_url}/ajax.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                table: table,
                fieldName: fieldName,
                search: search,
            }),
        });
        return response.json();
        // const result = await response.json();
        // if (result.status === 'success') {
        //     return {
        //         success: true,
        //         message: "Record updated successfully",
        //     };
        // }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong',
        };
    }
}
// import React, { useEffect, useState } from 'react';
//
// const UsersList = () => {
//     const [users, setUsers] = useState([]);
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch('http://your-server-url/get_users.php');
//                 const data = await response.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//
//         fetchUsers();
//     }, []);
//
//     return (
//         <ul>
//             {users.map(user => (
//                 <li key={user.id}>{user.name} - {user.email}</li>
//             ))}
//         </ul>
//     );
// };
//
// export default UsersList;

// const editUser = async (id, name, email) => {
//     const data = { id, name, email };
//
//     try {
//         const response = await fetch('http://your-server-url/edit_user.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });
//
//         const result = await response.json();
//         console.log(result);
//
//         if (result.status === 'success') {
//             alert('User updated successfully');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };
