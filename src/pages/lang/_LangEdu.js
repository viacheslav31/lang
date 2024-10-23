import {Card, Col, Form, message, Row, Select} from "antd";
import React, {useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecordByIndex,getDocumentCount } from "../../apis/lang";
import PageTitle from "../../components/PageTitle";
const { Meta } = Card;

export function LangEdu() {

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentLang, setCurrentLang] = useState('eng');
  const [currentItem, setCurrentItem] = useState(1);

  const [level, setLevel] = useState('A0');
  const [lang, setLang] = useState('ukr');

  const handleChangeLevel = (value) => {
    setLevel(value);
    setCurrentItem(1)
  };
  const handleChangeLang = (value) => {
    setLang(value);
  };

  const addRecordToDB = async (sEng,sUkr,sTransk) => {
    // try {
    //   const values = {
    //     eng: sEng,
    //     ukr: sUkr,
    //     transcript: sTransk,
    //   }
    //   const response = await addRecord(values);
    //   if (response.success) {
    //     message.success(response.message);
    //   } else {
    //     message.error(response.message);
    //   }
    // } catch (error) {
    //   message.error(error.message);
    // }
  };

  const getData = async () => {
    try {
      // const countRec = await getDocumentCount('lang')
      // const index = getRandom(1,countRec);

      const response = await getRecordByIndex(currentItem,level);
      //console.log(response)
      //const response = await getRecordById('3kGe2HByQxzBTDG5YAOu');
      if (response.success) {
        setData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const changeCart = async () => {
    if (currentLang === 'eng') {
      setCurrentLang('ukr')
    } else {
      setCurrentLang('eng')
    }
    //const countRec = await getDocumentCount('lang')
    //console.log(countRec)
  }

  useEffect(() => {
     next();
     // getData();
  }, []);

  useEffect(() => {
    getData();
  }, [currentItem,setLevel,setLang]);

  const getRandom = async () => {
    //min = Math.ceil(min);
    //max = Math.floor(max);
    const min = 1;
    const max = await getDocumentCount('lang');
    //const index = getRandom(1,countRec);

    return Math.ceil(Math.random() * (max - min) + min);
  }

  const next = async () => {
    if(level === 'Random') {
      const index = await getRandom()
      setCurrentItem(index)
    } else {
      setCurrentItem(currentItem + 1)
    }

    //console.log('index',index)
  }
  const prev = () => {
    //
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

          <>
            {/*{JSON.stringify(data)}*/}
            {data && (
                <Card
                    onClick={() => changeCart()}
                    hoverable
                    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    style={{ width: 350,height:200 }}
                >
                  {/*<Meta*/}
                  {/*    title={currentLang === 'eng' ? data.eng : data.ukr}*/}
                  {/*    // description={data.transcript}*/}
                  {/*/>*/}

                  <h5>{currentLang === 'eng' ? data.eng : data.ukr}</h5>
                  <hr/>
                  <h6>{currentLang === 'eng' ? data.transcript : ''}</h6>
                  <br/>
                  <small>Level: {data.level}</small><br/>
                  <small>Lang: {lang}</small><br/>
                  <small>Current: {currentItem}</small>
                  {/*<span>{data.ukr}</span>*/}

                </Card>
            )}
            <div className="d-flex justify-content-between mt-4">
              <div className="d-flex justify-content-start gap-4">
                {/*<button*/}
                {/*    className="btn btn-success"*/}
                {/*    type="submit"*/}
                {/*    onClick={() => prev()}*/}
                {/*>*/}
                {/*  <i className="ri-save-line"></i>*/}
                {/*  &nbsp;&nbsp;Prev&nbsp;&nbsp;*/}
                {/*</button>*/}

                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => next()}
                >
                  {/*<i className="ri-save-line"></i>*/}
                  <i className="ri-arrow-right-double-fill"></i>
                  &nbsp;&nbsp;Next&nbsp;&nbsp;
                </button>
              </div>
              {/*<button*/}
              {/*    className="primary-outlined-btn"*/}
              {/*    onClick={() => navigate("/")}*/}
              {/*>*/}
              {/*  Cancel*/}
              {/*</button>*/}
            </div>

            {/*<div className="d-flex justify-content gap-2"> </div>*/}
          </>


    </div>
  );
}
