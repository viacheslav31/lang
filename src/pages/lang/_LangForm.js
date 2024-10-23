import {Col, Form, Input, message, Row, Select} from "antd";
import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
//import { addRecord, editRecord, clearCollection, getDocumentCount } from "../../apis/lang";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import {insertItem,editItem,getRecordById} from "../../apis/api_php";

import {dataStr} from "./data.js"
import Select2 from "../../components/Select2";
import FirebaseSelect from "../../components/FirebaseSelect";
import SelectAjax from "../../components/FirebaseSelectAjax";
import * as fields from "../../config/columns";

export function LangForm() {
  const table= 'lang';////// ####

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [level, setLevel] = useState('A0');
  const [columns, setColumns] = useState(fields[`${table}_columns`]);

  const clearLang = () => {
    //clearCollection('lang')
    ////const countRec = await getDocumentCount('lang')
  }

  const onFinish = async (values) => {
    //console.log('values_',values)
    let data = {};
    for (var key in values) {
      if (values[key] === null ) {
        continue;
      }
      if (typeof(values[key]) === 'object') {
        data[key] = values[key].value;
        data[key+'_label'] = values[key].label;
        //console.log( "Ключ: " + key + " значение: " + values[key] + " тип " + typeof(values[key]) );
      } else {
        data[key] = values[key];
      }
    }
    //console.log('data---',data)
    try {
      dispatch(ShowLoading());
      let response = null;
      if (params.id) {
        // EDIT
        //response = await editItem({...data, table: table, id: params.id,});
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
        navigate("/lang");
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
      const response = await getRecordById('lang',params.id);
       setData(response);
      //console.log('form2',response);
      // if (response.success) {
      //   setData(response.data);
      //   console.log('form2',response.data);
      // } else {
      //   message.error(response.message);
      // }

      dispatch(HideLoading());
      // if (response.success) {
      //
      //   setData(response.data);
      //   console.log('form2',response.data);
      //   //setData(response.result[0]);
      // } else {
      //   message.error(response.message);
      // }
    } catch (error) {
      message.error(error.message);
    }

  };

  useEffect(() => {
    if (params.id) {
      getData();
    } else {
      setData({});
    }
  }, []);


  const handleChangeLevel = (value) => {
    setLevel(value);
  };

  return (
    <div>
      {/*{JSON.stringify(data)}*/}
      <PageTitle title={params.id ? "Edit Record" : "Add New Record"} />
      {data && (
        <Form layout="vertical" onFinish={onFinish} initialValues={data}>
          <Row gutter={[10, 10]}>
            <Col span={6}>
              <Form.Item
                label="Level"
                name="level"
                //rules={[{ required: true, message: "required" }]}
              >
                <select name="" id="">
                  <option value="A0">A0</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="A3">A3</option>
                </select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                  label="Status2"
                  name="status"
                  //rules={[{ required: true, message: "required" }]}
              >
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="label"
                    // onChange={onChangeSelect2}
                    // onSearch={onSearchSelect2}
                    style={{width: 150,}}
                    options={[
                      {value: 'open', label: 'Open',},
                      {value: 'close', label: 'Close',},
                    ]}
                />

              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                  label="User"
                  name="user"
                  //rules={[{ required: true, message: "required" }]}
              >

                {/*SELECT2 All loading/Ajax*/}

                <SelectAjax
                    tableName="users"
                    field1="name"
                    field2="email"
                    defOptionsValue={data?.author_id}
                    defOptionsLabel={data?.author_id_label}
                    onChange={(value) => {
                      setData(pre=>{
                        return {...pre, author_id: value }
                      });
                    }}
                />

              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Eng"
                name="lang1"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Ukr"
                name="lang2"
                //rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                  label="Transcript"
                  name="descrition"
                  //rules={[{ required: true, message: "required" }]}
              >
                {/*<input type="text" />*/}
                <Input style={{height:35}}  type="text" />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content gap-2">
          {/*<div className="d-flex justify-content-end gap-2">*/}
            <button
                className="primary-outlined-btn"
                onClick={(e) => {
                  e.preventDefault();
                  clearLang()
                }}
            >
              Clear Lang / Count Rec
            </button>

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

            <button
                className="primary-outlined-btn"
                onClick={() => navigate("/lang")}
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


