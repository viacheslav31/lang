import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import {getAllRecords,insertItem,deleteItem} from "../apis/api_php";
import {message, Modal, Input, Select, Table} from "antd";
import { useEffect } from "react";
import * as fields from "../config/columns";
const { Search } = Input;

export const Table2 = ({table}) => {

    //console.log('col',fields[`${table}_columns`])
    //const [columns, setColumns] = useState(null);
    const [columns, setColumns] = useState(fields[`${table}_columns`]);

    //const [level, setLevel] = useState('A0');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [searchText, setSearchText] = useState("");
    // const [dataSource, setDataSource] = useState();
    // const handleChangeLevel = (value) => {
    //     setLevel(value);
    // };

    // const colAction = {
    //     key: 'col_action',
    //     title: 'Action',
    //     render: (record) => {
    //         const urlEdit = `/app/form/edit/${table}/${record.id}`;
    //         return (
    //             <>
    //                 <Link to={urlEdit}>Form</Link>
    //                 <DeleteOutlined
    //                     onClick={() => {
    //                         onDeleteItem(record);
    //                     }}
    //                     style={{color: 'red', marginLeft: 12}}
    //                 />
    //             </>
    //         )
    //     }
    //
    // };
    const colAction = {

        title: "Action",
        name: "action",
        dataIndex: "action",
        render: (text, record) => (
        <div className="d-flex gap-3 align-items-center">
            <i className="ri-delete-bin-line text-danger"
               onClick={() => {
                   Modal.confirm({
                       title: 'Are you sure, you want to delete this record?',
                       okText:'Yes',
                       okType:'danger',
                       onOk:()=>{
                           return deleteRecord(record.id)
                       }
                   })
               }}
            ></i>
            <i
                className="ri-pencil-line text-success"
                onClick={() => navigate(`/app/edit/${record.id}`)}
                // onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
            ></i>
        </div>
        ),
    };

    const inArray = (arr, elem) => {
        return arr.indexOf(elem) != -1;
    };

    const initTable = () => {
        // + add column Action
        setColumns((cols) => {
            if (!inArray(cols, colAction)) {
                return [...cols, colAction];
            } else {
                return cols;
            }
        });
    };

    // const initColumns = () => {
    //     //console.log(table)
    //     setColumns(fields[`${table}_columns`]);
    // };

    const getData = async () => {
        try {
            // initColumns();
            //initTable();
            dispatch(ShowLoading());

            const response = await getAllRecords(columns,tableParams,searchText,table);

            // console.log('response',response)
            if (response.success) {
                //console.log('res',response.result)
                setData(response.result);
                const total = response.total;
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: total,
                    },
                });
            } else {
                message.error(response.message);
            }

            //if (response.success) {setData(response.data.result);}
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const deleteRecord = async (id) => {
        try {
            dispatch(ShowLoading());

            const response = await deleteItem(table,id); // deleteRecordById(id)
            if (response.success) {
                setData(response.data);
                getData();
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };
/*
    const columns = [
        {title: "Eng", dataIndex: "lang1",},
        {title: "Ukr", dataIndex: "lang2",},
        {title: "Transcript", dataIndex: "desc",},
        {title: "Level", dataIndex: "level",},
        // {title: "Status", dataIndex: "status",},
        {title: "Created", dataIndex: "created",},
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="d-flex gap-3 align-items-center">
                    <i className="ri-delete-bin-line text-danger"
                       onClick={() => {
                           Modal.confirm({
                               title: 'Are you sure, you want to delete this record?',
                               okText:'Yes',
                               okType:'danger',
                               onOk:()=>{
                                   return deleteRecord(record.id)
                               }
                           })
                       }}
                    ></i>
                    <i
                        className="ri-pencil-line text-success"
                        onClick={() => navigate(`/lang/edit/${record.id}`)}
                        // onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
                    ></i>
                </div>
            ),
        },
    ];
*/
    useEffect(() => {
        initTable();
    }, []);

    useEffect(() => {
        getData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        searchText,
        JSON.stringify(tableParams.filters),
        table
    ]);

    // const importData = async (e) => {
    //     const data = {
    //         lang1: 'name',
    //         lang2: 'email'
    //     };
    //     insertItem(data);
    // }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <div className="d-flex justify-content-end gap-4">
                    {/*<Select*/}
                    {/*    defaultValue="A0"*/}
                    {/*    style={{width: 120,height:40}}*/}
                    {/*    onChange={handleChangeLevel}*/}
                    {/*    options={[*/}
                    {/*        {value: 'A0', label: 'A0',},*/}
                    {/*        {value: 'A1', label: 'A1',},*/}
                    {/*        {value: 'A2', label: 'A2',},*/}
                    {/*        {value: 'A3', label: 'A3',},*/}
                    {/*        {value: 'B1',label: 'B1',},*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*</Select>*/}

                    {/*<button*/}
                    {/*    className="primary-outlined-btn"*/}
                    {/*    onClick={(e) => {*/}
                    {/*        e.preventDefault();*/}
                    {/*        importData()*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Import*/}
                    {/*</button>*/}

                    <button
                        className="primary-outlined-btn"
                        onClick={() => navigate("/app/new")}
                    >
                        New Record
                    </button>

                    <Search
                        placeholder="Search..."
                        style={{marginLeft:20,marginBottom:8,width:300}}
                        allowClear
                        //addonBefore={selectBefore}
                        onSearch={(value) => {
                            setSearchText(value)
                        }}
                    />

                </div>
            </div>
            {/*{JSON.stringify(data)}*/}

            <Table
                columns={columns}
                dataSource={data}
                size="small"
                rowKey={(record) => record.id}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
            />
        </div>
    );
}
