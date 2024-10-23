import React from "react";
import {CheckSquareOutlined} from "@ant-design/icons";
// import {CheckSquareOutlined} from "@ant-design/icons";
// import {Link} from "react-router-dom";

// User config:
// the user must configure the table 'country_lang'
/// const table = 'lang';

//const config = {
    //table: 'lang', //main table
    //model: 'Country', //model in backend
//};

//inner tables
const tables = [
       // {
            //table: 'lang_users',
            // model: null,
            // columns: [
            //     {name: 'id', type: 'id'},
            //     {name: 'code', title: 'Код', type: 'string'},
            //     {name: 'name', title: 'Назва'},
            // ],
        //},
        //table2: [{table: '', columns: {},}],
];



const columns =  [
    {
        name: 'id', //required
        //key: '1',
        title: 'id', //def: title=name
        //dataIndex: 'country_lang_id',  //def: tableName_name
        //width: '20',//'10%',
        // filters: [ { text: '1', value: '1' },{text: '2',value: '2' } ],
        type: 'id', //def: string
        store: false,
        sorter: (a, b) => a.age - b.age, //: true, //def: false
        //showSorterTooltip: false,
        searcher: true, //def: false
        ref: false, //def: false
        show_in_list: true, //def: true
        show_in_form: true, //def: true
        is_link: true, //or link
        //render: (text) => <a>{text}</a>,
    },
    {
        //key: '2',
        //dataIndex: 'country_lang_alias',
        name: 'lang1',
        title: 'Eng',
        store: true,
        sorter: true,
        searcher: true,
        type: 'string',
        required: true,
        is_link: true, //or link
        //переоприділяєм render з columns.js
        render: (text) => <a>{text}</a>,

        //render: setRender,
        // render: (text,record) => {
        //     return (
        //         <Link to={`dashboard/form/edit/country_lang/${record.id}`}>{text}</Link>
        //     )
        // },
        rules:  {
                    required: {value:true,  message: 'Please input your Eng1!'},
                    //type: {value:'email',  message: 'The input is not valid E-mail!'},
        },

                    //required_message:true,
                    // {type: 'email', message: 'The input is not valid E-mail!',},
                    // {required: true, message: 'Please input your E-mail!',},
               //],
        //filteredValue: ['searchText'],
        // onFilter: (value, record) => {
        //     return String(record.name).toLowerCase().includes(value.toLowerCase());
        // },

        //...getColumnSearchProps('name'),

    },
    {
        name: 'lang2',
        title: 'Ukr',
        store: true,
        sorter: true,
        searcher: true,
        type: 'string',
        required: true,
        is_link: true,
    },
    {
        name: 'descrition',
        title: 'Desc',
        store: true,
        sorter: true,
        type: 'string',
    },
    {
        name: 'level',
        title: 'Level',
        store: true,
        sorter: true,
        searcher: true,
        type: 'string',
    },
    /*
        {
            name: 'index',
            title: 'Index',
            store: true,
            sorter: true,
            searcher: true,
            type: 'string',
        },

        {
            name: 'user_id',
            title: 'User',
            store: true,
            sorter: true,
            searcher: true,
            type: 'ref',
            ref: {
                table: 'users',
                alias: 'users1',
                name: 'name',
                name2: 'code', //advansedd name [code]
            }
        },
        {
            title: 'Act',
            sorter: true,
            render: (_, record) => {
                return (
                    <>
                        {record.lang_active
                            ? <CheckSquareOutlined />
                            : ''
                        }
                    </>
                )
            },
            name: 'active',
            type: 'bool',
            store: true,
        },
        {
            name: 'created',
            title: 'Created',
            type: 'date',
            store: true,
        },
        {
            name: 'updated',
            title: 'Updated',
            type: 'datetime',
            store: true,
        },

        */
    /*
    {
        //key: '5',
        title: 'Region',
        //dataIndex: 'country_lang_region_id',
        sorter: true,
        name: 'region_id',
        type: 'ref',
        ref: {
            table: 'regions',
            alias: 'regions1',
            name: 'name',
        }
    },
    */
];

// function setRender(text, record) {
//     return (
//         <Link to={`dashboard/form/edit/country_lang/${record.id}`}>{text}</Link>
//     )
// }


export const lang = {
    //config : config,
    tables : tables,
    columns : columns,
};

