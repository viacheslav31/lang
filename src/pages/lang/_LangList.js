import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
// import {getAllRecordsByLevel, deleteRecordById, getDocumentCount,} from "../../apis/lang";
import {getAllRecords,insertItem,deleteItem} from "../../apis/api_php";
import {message, Modal, Select, Table} from "antd";
import { useEffect } from "react";
import {dataStr} from "./data";
import {Table2} from "../../components/Table2";
//import AppliedCandidates from "./AppliedCandidates";

export function LangList() {
  const [level, setLevel] = useState('A0');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [data, setData] = React.useState([]);
  //const [showAppliedCandidates, setShowAppliedCandidates] = React.useState(false);
  //const [appiledCandidates, setAppiledCandidates] = React.useState([]);

  const handleChangeLevel = (value) => {
    //console.log(`selected ${value}`);
    setLevel(value);
  };

  // const getData = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     //const response = await getAllRecordsByLevel(level);
  //     const response = await getAllRecords();
  //
  //     if (response.success) {
  //       setData(response.result);
  //     } else {
  //       message.error(response.message);
  //     }
  //
  //     //if (response.success) {setData(response.data.result);}
  //     dispatch(HideLoading());
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  // const deleteRecord = async (id) => {
  //   try {
  //     dispatch(ShowLoading());
  //
  //     const response = await deleteItem(id); // deleteRecordById(id)
  //     if (response.success) {
  //       setData(response.data);
  //       getData();
  //     }
  //     dispatch(HideLoading());
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  //const columns = [

    // {title: "Eng", dataIndex: "lang1",},
    // {title: "Ukr", dataIndex: "lang2",},
    // {title: "Transcript", dataIndex: "desc",},
    // {title: "Level", dataIndex: "level",},
    // // {title: "Status", dataIndex: "status",},
    // {title: "Created", dataIndex: "created",},
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (text, record) => (
    //     <div className="d-flex gap-3 align-items-center">
    //       <i className="ri-delete-bin-line text-danger"
    //         onClick={() => {
    //           Modal.confirm({
    //             title: 'Are you sure, you want to delete this record?',
    //             okText:'Yes',
    //             okType:'danger',
    //             onOk:()=>{
    //               return deleteRecord(record.id)
    //             }
    //           })
    //         }}
    //       ></i>
    //       <i
    //           className="ri-pencil-line text-success"
    //         onClick={() => navigate(`/lang/edit/${record.id}`)}
    //         // onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
    //       ></i>
    //     </div>
    //   ),
    // },
  //];

  // useEffect(() => {
  //   getData();
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [level]);

  const importData = async (e) => {
    const data = {
      lang1: 'name',
      lang2: 'email'
    };
    insertItem(data);

    // const arr = dataStr.split(".");
    // arr.map(async (item,index) => {
    //
    //   let arr2 = item.split("/");
    //   // console.log('arr2',arr2)
    //
    //   if (arr2.length > 1) {
    //     const sEng = arr2[1];
    //     const sUkr = arr2[0];
    //     let sTransk = (arr2.length > 2) ? arr2[2].replace("\n", "") : '';
    //     sTransk = sTransk.slice(0, -2) //del last 2 symb
    //
    //     const startIndex = await getDocumentCount('lang') + 1;
    //     addRecordToDB(sEng,sUkr,sTransk,index+startIndex);
    //   }
    //   // arr2.map((item) => {let str = item.trim()});//id: doc.id,//...doc,
    //   return arr2
    // });

  }

  return (
    <div>

        <div className="d-flex justify-content-between">
          <PageTitle title="Carts (Admin)" />
          <div className="d-flex justify-content-end gap-4">
            <Select
              defaultValue="A0"
              style={{width: 120,height:40}}
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
                onClick={(e) => {
                  e.preventDefault();
                  importData()
                }}
            >
              Import
            </button>

            {/*<button*/}
            {/*    className="primary-outlined-btn"*/}
            {/*    onClick={() => navigate("/lang/new")}*/}
            {/*>*/}
            {/*  New Record*/}
            {/*</button>*/}

          </div>
        </div>


      {/*<Table columns={columns} dataSource={data} size="small" />*/}

      <Table2 table="lang"/>

      {/*{showAppliedCandidates && (*/}
      {/*  <AppliedCandidates*/}
      {/*    showAppliedCandidates={showAppliedCandidates}*/}
      {/*    setShowAppliedCandidates={setShowAppliedCandidates}*/}
      {/*    appiledCandidates={appiledCandidates}*/}
      {/*    reloadData={getAppliedCandidates}*/}
      {/*  />*/}
      {/*)}*/}

    </div>
  );
}

// export default LangList;
