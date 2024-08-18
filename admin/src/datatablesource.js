export const vNameColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photos || `https://icons8.com/icon/1G2BW7-tQJJJ/no-image`} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "Driver",
    headerName: "Driver",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price(per day)",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "vehicleNumber",
    headerName: "License Plate",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithLicense ${params.row.vehicleNumber}`}>
          {params.row.vehicleNumber}
        </div>
      );
    },
  },
];

export const PColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 300,
  },
  {
    field: "telephone",
    headerName: "Telephone",
    width: 100,
  },
  {
    field: "email",
    headerName: "e-mail",
    width: 100,
  },
];


export const RColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 300,
  },
  {
    field: "telephone",
    headerName: "Telephone",
    width: 100,
  },
  {
    field: "email",
    headerName: "e-mail",
    width: 100,
  },
];
