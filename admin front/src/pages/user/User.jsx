import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
  import { Link } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls";
  import "./user.css";
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import app from "../../firebase";
import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
  
  export default function User() {
    const [file, setFile] = useState(null);
    const [users,setUsers]=useState({});
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const user = useSelector((state) =>
    state.use.users.find((user) => user._id === userId)
  );
  const handleChange =(e)=>{
    const value=e.target.value;
    setUsers({
        ...users,
       [e.target.name]:value
    });
      };
    const dispatch = useDispatch();

    const handleclick=(id)=>{
    
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (!downloadURL){downloadURL=user.img}
            const userr = { ...users, img: downloadURL};
            updateUser(user._id,dispatch,userr)
           
          });
        }
      );
      setTimeout(function () {
        window.location.href = "/users"; 
     }, 9000);
    console.log(user._id)
    }
    
    useEffect(() => {
      updateUser(dispatch);
    }, [dispatch]);
    

    return (
      

      <div className="user">
        <Topbar/>
        <Sidebar/>
        <div className="contain">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.img}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
                <span className="userShowUserTitle">{user.title}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{user.birthDate}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.phoneNumber}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.mail}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{user.address}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                    name="username"onChange={handleChange}
                  />
                </div>
                
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={user.mail}
                    className="userUpdateInput"
                    name="mail"onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder={user.phoneNumber}
                    className="userUpdateInput"
                    name="phoneNumber"onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder={user.address}
                    className="userUpdateInput"
                    name="address"onChange={handleChange}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={user.img}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} name="img" onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <button className="userUpdateButton" onClick={(e)=>handleclick(user._id,e.preventDefault())}>Update</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    );
  }