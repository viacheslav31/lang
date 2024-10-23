import {Checkbox, Col, DatePicker, Form, Input, message, Row, Select} from "antd";
import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import {insertItem,editItem,getRecordById} from "../apis/api_php";
import dayjs from "dayjs";

import * as fields from "../config/columns";
import SelectAjax from "./SelectAjax";

export function Form2({table}) {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    //const [columns, setColumns] = useState(fields[`${table}_columns`]);
    const columns = fields[`${table}_columns`];

    const onFinish = async (values) => {
        // console.log('values',values)
        let data = {};
        for (var key in values) {
            if (values[key] === null ) {
                continue;
            }
            //data[key] = values[key];
            //console.log('key',key,values[key])
            if (typeof(values[key]) === 'object') {
                data[key] = values[key].value;
                data[key+'_label'] = values[key].label;
            } else {
                data[key] = values[key];
            }
        }
        //console.log('values',data)
        try {
            dispatch(ShowLoading());
            let response = null;
            if (params.id) {
                // EDIT
                response = await editItem(
                    table,
                    columns,
                    data,
                    params.id
                );
            } else {
                //CREATE
                response = await insertItem(
                    table,
                    columns,
                    data
                    // add adv user fields!
                    //user_id: user.id,
                );
            }
            if (response.success) {
                message.success(response.message);
                navigate("/app");
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };


    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getRecordById(columns,table,params.id);

            //console.log('response10',columns)

           // for (var column in columns) {
           columns.forEach( async (column) => {
                //if (response[key] === null)  continue;
                //console.log(column.type)
                // if (column.type === 'ref') {
                //     const refTable = column['ref']['table'];
                //     const refName = column['ref']['name'];
                //     const refId = response[column['name']];
                //     const ref =  await getRecordById(refTable,refId);
                //     if (ref) {
                //         response[column['name'] + '_label'] = ref[refName];
                //     }
                // }
            });

            //console.log('ref',response)
            setData(response);
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (params.id) {
            //console.log('getData')
            getData();
        } else {
            setData({});
        }
    }, []);

    // const config = {
    //     rules: [
    //         {
    //             type: 'object',
    //             required: true,
    //             message: 'Please select time!',
    //         },
    //     ],
    // };


    return (
        <div>
            {/*{JSON.stringify(data)}*/}
            {data && (
                <Form layout="vertical" onFinish={onFinish} initialValues={data}>
                    {columns.map(item =>
                        <div>
                            {/*console.log('rules',item.rules)*/}

                            {/*Input*/}
                            {(item.type === 'string')
                                ?
                                    // FormInput
                                    <Form.Item
                                        label={item.title}
                                        name={item.name}
                                        rules={[item.rules]}
                                        //rules={[{ required: true, message: "field is required" }]}
                                    >
                                        <input type="text" />
                                    </Form.Item>

                                // <Form.Item label={item.title}
                                //            required rules={[
                                //     {
                                //         required:true, message:"Please enter "+[item.title]+" name"
                                //     }
                                // ]}
                                // >
                                //     <Input
                                //         value={editingItem ? editingItem[item.dataIndex] : ''}
                                //         onChange={(e) => {
                                //             setEditingItem(pre=>{
                                //                 return {...pre, [item.dataIndex]:e.target.value};
                                //             });
                                //         }}
                                //         placeholder={item.title}
                                //     />
                                // </Form.Item>

                                : ''
                            }


                            {/*Ref*/}
                            {/*{(item.type === 'ref') ?*/}
                            {/*    <div>*/}
                            {/*        <Form.Item label={item.title}*/}
                            {/*                   required rules={[*/}
                            {/*            {*/}
                            {/*                required:true, message:"Please enter "+[item.title]+" name"*/}
                            {/*            }*/}
                            {/*        ]}*/}
                            {/*        >*/}
                            {/*            /!*<Space.Compact style={{width: 500,marginTop:10}}>*!/*/}
                            {/*            <Space.Compact block>*/}
                            {/*                <Input*/}
                            {/*                    value={editingItem ? editingItem[item.dataIndex+'_title'] : ''}*/}
                            {/*                    placeholder={item.title}*/}
                            {/*                    onDoubleClick = {() => {*/}
                            {/*                        openChoice(`${item.ref.table}`,`${item.name}`);*/}
                            {/*                    }}*/}
                            {/*                />*/}
                            {/*                <Button*/}
                            {/*                    onClick={() => {*/}
                            {/*                        setEditingItem(pre=>{*/}
                            {/*                            return {...pre, [item.dataIndex]: null, [item.dataIndex + '_title'] : null};*/}
                            {/*                        });*/}
                            {/*                    }}*/}
                            {/*                >X*/}
                            {/*                </Button>*/}
                            {/*                <Button onClick = {() =>*/}
                            {/*                {openChoice([item.ref.table],[item.name]);}*/}
                            {/*                }>...</Button>*/}
                            {/*            </Space.Compact>*/}

                            {/*        </Form.Item>*/}
                            {/*    </div>*/}
                            {/*    : ''*/}
                            {/*}*/}

                            {/*Bool*/}
                            {(item.type === 'bool')
                                ?
                                <Form.Item
                                    name={item.name}
                                    valuePropName="checked"
                                    // wrapperCol={{ offset: 8, span: 16 }}
                                    // rules={[item.rules]}
                                >
                                    <Checkbox>{item.title}</Checkbox>
                                </Form.Item>
                                : ''
                            }

                            {/*Date*/}
                            {(item.type === 'date')
                                ?
                                // <Form.Item label={item.title}>
                                //     <DatePicker
                                //         value={editingItem ? dayjs(editingItem[item.dataIndex]) : null}
                                //         format="YYYY-MM-DD"
                                //         // onChange={
                                //         //     (value, dateString) => {
                                //         //         setEditingItem(pre=>{
                                //         //             return {...pre, [item.dataIndex]:value};
                                //         //         });
                                //         //     }
                                //         // }
                                //     />
                                // </Form.Item>

                                // {...config}
                                <Form.Item
                                           label={item.title}
                                           name={item.name}
                                           rules={[item.rules]}
                                           getValueProps={(value) => ({ value: value ? dayjs(value) : "", })}
                                >
                                    <DatePicker format="MM-DD-YYYY" />
                                </Form.Item>
                                : ''
                            }
                            {/*DateTime*/}
                            {(item.type === 'datetime')
                                ?
                                <Form.Item
                                    label={item.title}
                                    name={item.name}
                                    rules={[item.rules]}
                                    getValueProps={(value) => ({ value: value ? dayjs(value) : "", })}
                                >
                                    <DatePicker format="YYYY/MM/DD HH:mm:ss" />
                                </Form.Item>
                                : ''
                            }
                            {/*DateTime*/}{/*TODO DateTime save in local (difer 1 doba)*/}
                            {/*{(item.type === 'datetime') ?*/}
                            {/*    <Form.Item  label={item.title}>*/}
                            {/*        <DatePicker*/}
                            {/*            value={editingItem ? dayjs(editingItem[item.dataIndex]) : null}*/}
                            {/*            format="YYYY-MM-DD HH:mm:ss"*/}
                            {/*            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}*/}
                            {/*            onChange={*/}
                            {/*                (value, dateString) => {*/}
                            {/*                    setEditingItem(pre=>{*/}
                            {/*                        return {...pre, [item.dataIndex]:value};*/}
                            {/*                    });*/}
                            {/*                }*/}
                            {/*            }*/}
                            {/*        />*/}
                            {/*    </Form.Item>*/}
                            {/*    : ''*/}
                            {/*}*/}

                        </div>

                    )
                    }
   {/*////////////////////////////////////////////////////////////////////*/}
   {/*                 OLD*/}

                    {/*<Row gutter={[10, 10]}>*/}
                    {/*    <Col span={6}>*/}
                    {/*        <Form.Item*/}
                    {/*            label="Level"*/}
                    {/*            name="level"*/}
                    {/*            //rules={[{ required: true, message: "required" }]}*/}
                    {/*        >*/}
                    {/*            <select name="" id="">*/}
                    {/*                <option value="A0">A0</option>*/}
                    {/*                <option value="A1">A1</option>*/}
                    {/*                <option value="A2">A2</option>*/}
                    {/*                <option value="A3">A3</option>*/}
                    {/*            </select>*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={6}>*/}
                    {/*        <Form.Item*/}
                    {/*            label="Status2"*/}
                    {/*            name="status"*/}
                    {/*            //rules={[{ required: true, message: "required" }]}*/}
                    {/*        >*/}
                    {/*            <Select*/}
                    {/*                showSearch*/}
                    {/*                placeholder="Select a person"*/}
                    {/*                optionFilterProp="label"*/}
                    {/*                // onChange={onChangeSelect2}*/}
                    {/*                // onSearch={onSearchSelect2}*/}
                    {/*                style={{width: 150,}}*/}
                    {/*                options={[*/}
                    {/*                    {value: 'open', label: 'Open',},*/}
                    {/*                    {value: 'close', label: 'Close',},*/}
                    {/*                ]}*/}
                    {/*            />*/}

                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*    /!*SELECT2 All loading/Ajax*!/*/}

                    {/*    <Col span={6}>*/}
                    {/*        <Form.Item*/}
                    {/*            label="User"*/}
                    {/*            name="user_id"*/}
                    {/*        >*/}
                    {/*            <SelectAjax*/}
                    {/*                tableName="users"*/}
                    {/*                field1="name"*/}
                    {/*                field2="code"*/}
                    {/*                defOptionsValue={data?.user_id}*/}
                    {/*                defOptionsLabel={data?.user_id_label}*/}
                    {/*                onChange={(value) => {*/}
                    {/*                    setData(pre=>{*/}
                    {/*                        return {...pre, user_id: value }*/}
                    {/*                    });*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}

                    {/*    <Col span={6}>*/}
                    {/*        <Form.Item*/}
                    {/*            label="Eng"*/}
                    {/*            name="lang1"*/}
                    {/*            rules={[{ required: true, message: "required" }]}*/}
                    {/*        >*/}
                    {/*            <input type="text" />*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={6}>*/}
                    {/*        <Form.Item*/}
                    {/*            label="Ukr"*/}
                    {/*            name="lang2"*/}
                    {/*            //rules={[{ required: true, message: "required" }]}*/}
                    {/*        >*/}
                    {/*            <input type="text" />*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={6}>*/}
                    {/*        <Form.Item*/}
                    {/*            label="Transcript"*/}
                    {/*            name="descrition"*/}
                    {/*            //rules={[{ required: true, message: "required" }]}*/}
                    {/*        >*/}
                    {/*            <Input style={{height:35}}  type="text" />*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                    <div className="divider mt-3 mb-3"></div>


                    {/*Buttons*/}
                    <div className="d-flex justify-content gap-2">
                        <button
                            className="primary-outlined-btn"
                            onClick={() => navigate("/app")}
                        >
                            Cancel
                        </button>

                        <button className="btn btn-primary" type="submit">
                            {/*<button className="primary-contained-btn" type="submit">*/}
                            {/*  <i className="ri-save-line"></i>*/}
                            &nbsp;&nbsp;Save&nbsp;&nbsp;
                        </button>
                    </div>

                </Form>
            )}
        </div>
    );
}


