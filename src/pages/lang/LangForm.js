import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import {Form2} from "../../components/Form2";

export function LangForm() {
  const table = 'lang';////// ####

  const params = useParams();

  return (
    <div>
      <PageTitle title={params.id ? "Edit Record" : "Add New Record"} />
      <Form2 table={table}></Form2>
    </div>
  );
}


