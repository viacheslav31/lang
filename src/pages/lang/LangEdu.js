import {Card, Col, Form, message, Row, Select, Switch} from "antd";
import React, {useState} from "react";
import { useEffect } from "react";
import {getAllRecords} from "../../apis/api_php";
import PageTitle from "../../components/PageTitle";
import * as fields from "../../config/columns";


import {
    DoubleRightOutlined,
    DoubleLeftOutlined,
    LeftOutlined,
    RightOutlined,
    TrademarkOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export function LangEdu() {

  const table = 'lang';
  //const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentLang, setCurrentLang] = useState('lang1');
  //const [currentItem, setCurrentItem] = useState(null);
  const [translate, setTranslate] = useState(false);
  const [random, setRandom] = useState(true);
  const [searchText, setSearchText] = useState('A0');


  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 1,
    },
  });

  //const [level, setLevel] = useState('A0');
  const [lang, setLang] = useState('ukr');

  const columns = fields[`${table}_columns`];

  const getData = async () => {
    // try {
    //   const response = await getRecordByIndex(currentItem,level);
    //   if (response.success) {
    //     setData(response.data);
    //   } else {
    //     message.error(response.message);
    //   }
    // } catch (error) {
    //   message.error(error.message);
    //}

    try {
        //console.log('fff1',tableParams,searchText,table)

        //console.log('index',index)
        //let search = (index === null) ? searchText : index;

        const response = await getAllRecords(columns,tableParams,searchText,table);
        if (response.success) {
          //console.log('fff',response.result[0])
          setData(response.result[0]);
          const total = response.total;
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: total,
            },
          });
          //setSearchText("")
        } else {
          message.error(response.message);
        }
    } catch (error) {

        message.error(error.message);
    }
  };

  const changeCart = async () => {
    if (currentLang === 'lang1') {
      setCurrentLang('lang2')
    } else {
      setCurrentLang('lang1')
    }
  }


  useEffect(() => {
    //random();
    getData();

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
        table,
        //currentItem,
        //setLevel,
        setLang,
      ]
  );

  const handleChangeLevel = (value) => {
        setSearchText(value);
  };

  // const handleChangeLang = (value) => {
  //    setLang(value);
  // };

  const getRandom = () => {
    //min = Math.ceil(min);max = Math.floor(max);
    //const index = getRandom(1,countRec);
    const min = 1;
    //const max = await getDocumentCount(table);
    const max = tableParams.pagination.total;
    //  console.log('max',max);
    return Math.ceil(Math.random() * (max - min) + min);
  }

  const rnd = () => {
      //let index = getRandom()
      //index = `ind${index}`;

      setTableParams(
          {
              ...tableParams,
              pagination: {
                  current:  getRandom(),
                  pageSize: tableParams.pagination.pageSize,
              },
          });

      // getData(index)
      // getData() // reset index
  }

  const first = () => {
      const pageSizeParam = tableParams.pagination.pageSize;
      setTableParams(
           {...tableParams, pagination: {current: 1, pageSize: pageSizeParam,},
          }
      );
  }

  const next = async () => {
        //const current = tableParams.pagination.current++;
        //const total = tableParams.pagination.total;
        const currentParam = tableParams.pagination.current;
        const pageSizeParam = tableParams.pagination.pageSize;
        setTableParams(
        {
          ...tableParams,
          pagination: {
            current: currentParam + 1,
            pageSize: pageSizeParam,
          },
        }
        //tableParams.pagination.current = 2
      //pagination.current = 2,
       //{
      //current,
      //filters,
      //sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      //sortField: Array.isArray(sorter) ? undefined : sorter.field,
    //}
    );

    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setData([]);
    // }

  }

  const prev = () => {
      //const total = tableParams.pagination.total;
      const currentParam = tableParams.pagination.current;
      const pageSizeParam = tableParams.pagination.pageSize;
      //console.log('total',total,currentParam)
      setTableParams(
          {
              ...tableParams,
              pagination: {
                  current: currentParam - 1,
                  pageSize: pageSizeParam,
              },
          }
      );
      //setCurrentItem(index)
  }
    const last = () => {
        const total = tableParams.pagination.total;
        //const currentParam = tableParams.pagination.current;
        const pageSizeParam = tableParams.pagination.pageSize;
        setTableParams(
            {...tableParams, pagination: {current: total, pageSize: pageSizeParam,},
            }
        );
    }

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
                //{value: 'Random',label: 'Random',},
              ]}
          >
          </Select>



          {/*<button className="primary-outlined-btn" onClick={() => navigate("/lang/new")}>Learned</button>*/}
          {/*  <small className="mt-2">Level: {data.lang_level}</small><br/>*/}
          <small className="mt-2 ml-5"><span style={{textDecoration:'underline'}}>Current</span>: {currentLang}</small><br/>
          {/*<small className="mt-2">Index: {currentItem}</small>*/}
        </div>
      </div>
      <div className="d-flex justify-content-start gap-3">
          <small className="mt-2">Translate:</small>
          <Switch className="mt-2" defaultChecked onChange={()=>setTranslate(!translate)} />
          <small className="mt-2">Random:</small>
          <Switch className="mt-2" defaultChecked onChange={()=>setRandom(!random)} />
      </div>

          <>
            {/*{JSON.stringify(data)}*/}
            {data && (
                <Card
                    onClick={() => changeCart()}
                    hoverable
                    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    style={{ width: 350,height:200 }}
                    className="mt-3"
                >
                  <h5><strong className="text-muted">{currentLang === 'lang1' ? data.lang_lang1 : data.lang_lang2}</strong></h5>

                  {(currentLang === 'lang1' && data.lang_descrition !== '') && (
                      <><hr/><h6><span className="text-success">{data.lang_descrition}</span></h6></>
                  )}

                  {translate && (
                      <><hr/><h5><span className="text-danger">{data.lang_lang2}</span></h5></>
                  )}

                </Card>
            )}


            <div className="d-flex justify-content-between mt-4">
              <div className="d-flex justify-content-start gap-3">
                  {random && (
                      <button
                          className="btn btn-warning"
                          type="submit"
                          onClick={() => rnd()}
                      >
                          {/*<i className="ri-save-line"></i>*/}

                          <TrademarkOutlined />
                          &nbsp;&nbsp;Random&nbsp;&nbsp;
                      </button>
                  )}
                  {!random && (
                    <>
                        <button
                            disabled={(tableParams.pagination.current <= 1) ? true : false}
                            className="btn btn-primary"
                          type="submit"
                          onClick={() => first()}
                        >
                            <DoubleLeftOutlined />
                          {/*&nbsp;&nbsp; First &nbsp;&nbsp;*/}
                        </button>
                        <button
                            disabled={(tableParams.pagination.current <= 1) ? true : false}
                            className="btn btn-success"
                            type="submit"
                            onClick={() => prev()}
                        >
                            <LeftOutlined />
                          {/*&nbsp;&nbsp; Prev &nbsp;&nbsp;*/}
                        </button>
                        <button
                            disabled={(tableParams.pagination.current>=tableParams.pagination.total) ? true : false}
                            className="btn btn-success"

                            type="submit"
                            onClick={() => next()}
                        >
                            <RightOutlined />
                          {/*&nbsp;&nbsp; Next &nbsp;&nbsp;*/}
                        </button>
                        <button
                            disabled={(tableParams.pagination.current>=tableParams.pagination.total) ? true : false}
                            className="btn btn-primary"
                          type="submit"
                          onClick={() => last()}
                        >
                            <DoubleRightOutlined />
                            {/*&nbsp;&nbsp; Last &nbsp;&nbsp;*/}
                        </button>
                    </>
                  )}
              </div>
            </div>
          </>
    </div>
  );
}
