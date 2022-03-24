import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser,getUser } from '../../redux/apiCalls';
import { useEffect } from "react";


export default function UserList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.use.users);
  console.log(user)
  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    
  };

  

  
  
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            < img className="userListImg"  src={ params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "mail", headerName: "Email", width: 230 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 260,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar/>
      <Sidebar/>
    <div className="userList" style={{ height:600, width: '100%' }}>
      <DataGrid
       getRowId={(row) => row._id} 
        rows={user}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        columnBuffer={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
    </div>
  );
}