import {
  columnsDataCategory,
} from "./variables/columnsData";
import ColumnsTable from "./components/ColumnsTable";
import axios from "axios"
import {  useEffect, useState } from "react";

const Tables = () => {
  // get table data
  const [data, setData] = useState([])

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/category/")
      .then( ({data}) => {
        setData(data)
      }).catch(console.error)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="mt-8">
        <ColumnsTable
          columnsData={columnsDataCategory}
          tableData={data}
          fetchData={fetchData}
        />
    </div>
  );
};

export default Tables;
