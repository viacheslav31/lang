import React from "react";
import {Link} from "react-router-dom";

import {lang} from "./tables/lang.js";

//import {country_regions} from "./tables/country_regions";
//import {regions} from "./tables/regions";

export const lang_columns = getColumns(lang.columns,'lang');
export const lang_inner_tables = lang.tables;

// export const country_regions_columns = getColumns(country_regions.columns,'country_regions');
// export const country_regions_inner_tables = country_regions.tables;
//
// export const regions_columns = getColumns(regions.columns,'regions');
// export const regions_inner_tables = regions.tables;

function getColumns(obj,tableName) {
    //console.log('obj',obj)
    // console.log('country_regions.columns',obj,'tableName',tableName)
    // country_items.map((item,index) => {}
    //console.log(columns)
    obj.map((item,index) => {
        const name = item['name'];
        if (name.trim() !== '') { // error
            if (!isset(item,'tableName')) item['tableName'] = tableName;
            if (!isset(item,'title')) item['title'] = name;
            if (!isset(item,'type')) item['type'] = 'string';
            if (!isset(item,'sorter')) item['sorter'] = false;
            if (!isset(item,'searcher')) item['searcher'] = false;
            if (!isset(item,'ref')) item['ref'] = false;
            if (!isset(item,'show_in_list')) item['show_in_list'] = true;
            if (!isset(item,'show_in_form')) item['show_in_form'] = true;
            if (!isset(item,'showSorterTooltip')) item['showSorterTooltip'] = false;
            if (!isset(item,'rules')) item['rules'] = {required: {value: false, message: ''},};
            if (!isset(item,'is_link')) item['is_link'] = false; //link to form or outer url
            if (!isset(item,'store')) item['store'] = false; //save in db: create/edit, def:false
            //Render (record as link)
            if (!item['render'] && item['is_link']) {
                item['render'] = (text,record) => {
                    ///lang/edit/1
                    //const editUrl = `/app/form/edit/${tableName}/${record.id}`;
                    const editUrl = `/app/edit/${record.id}`;
                    return (
                        <Link to={editUrl}>{text}</Link>
                    )
                }
            }

            ///relation
            item['dataIndex'] = name;
            if (item['type'] !== 'id') {
                item['dataIndex'] = tableName + '_' + name;
            } else {
                item['dataIndex'] = name;
            }
            item['key'] = index+1;
        }
    })
    return obj;
}

function isset(obj, key) {
    if(key in obj) {
        return true;
    } else {
        return false;
    }
}

function setRender(text, record) {
    return <Link to={`/app/form/edit/${record.id}`}>{text}</Link>;
}
