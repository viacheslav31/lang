import React from "react";

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

    {name: 'id', title: 'country_id', type: 'id',},
    {name: 'country_id', title: 'country_id', type: 'string',},
    {name: 'region_id', title: 'region_id', type: 'string',},

];

export const lang_users =
    {
        config : config,
        tables : tables,
        columns : columns,
    };

