import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { vNameColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';


const Datatable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  
  const [list, setList] = useState([]);
  const {data, loading,error} = useFetch(`/${path}`)

  const handleDelete = async (id) => {
    try{
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item) => item._id !== id))
    }catch(err){

    }
  };

    
  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Define the columns for your PDF report
    const columns = [
      { title: "ID", dataKey: "_id" },
      { title: "Name", dataKey: "name" },
      { title: "Driver", dataKey: "Driver" },
      { title: "Price(per day)", dataKey: "price" },
      { title: "Type", dataKey: "type" },
      { title: "License Plate", dataKey: "vehicleNumber" },
    ];

    // Define the rows by extracting data from your 'list' state
    const rows = list.map((item) => ({
      _id: item._id,
      name: item.name,
      Driver: item.Driver,
      price: item.price,
      type: item.type,
      vehicleNumber: item.vehicleNumber,
    }));

    // Set the title for your PDF report
    doc.text("Vehicle Report", 10, 10);

    // Create the PDF table
    doc.autoTable({
      columns,
      body: rows,
      startY: 20,
    });

    // Save or display the PDF
    doc.save("vehicleReport.pdf");
  };

  useEffect(() => {
      setList(data)

  },[data, error])

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/vehicles/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div

              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <button className="btn" onClick={generatePDFReport}>Generate Report</button>
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        key="datagrid"
        className="datagrid"
        rows={list}
        columns={vNameColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
