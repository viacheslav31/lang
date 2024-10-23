import {CheckSquareOutlined} from "@ant-design/icons";
const config = {
    //table: 'country_lang', //main table
    //model: 'Country', //model in backend
};

//inner tables
const tables = [];

const columns =  [
    // {name: 'id', title: 'id', type: 'id',},
    // {name: 'code', title: 'Код', type: 'string',},
    // {name: 'name', title: 'Назва', type: 'string',},

    {
        name: 'id',
        type: 'id',
        width: '20%',
        sorter: true,
    },
    {
        name: 'code',
        sorter: true,
        editable: true,
    },
    {
        name: 'name',
        sorter: true,
    },
    {
        name: 'created_at',
        sorter: true,
    }

];

export const users =
    {
        config : config,
        tables : tables,
        columns : columns,
    };

