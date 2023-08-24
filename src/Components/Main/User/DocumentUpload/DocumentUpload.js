import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/Header'
import axios from "axios";
import { useSnackbar } from "notistack";
import { config } from "../../../../App";
import UserDocuments from '../UserDocuments/UserDocuments';
import Logout from '../../../Shared/Logout';


const DocumentUpload = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState(null);
  const [allFile, setallFile] = useState([]);
  const token = localStorage.getItem("token");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!token) {
      enqueueSnackbar("Please log in again to upload files!", { variant: "warning" })
      return;
    }
    // You can implement the file upload logic here
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        // You can use APIs like fetch or axios to upload the file to the server
        let url = `${config.endpoint}/books/upload`;

        await axios.post(url, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
        );
        performAPICall();
        enqueueSnackbar("Successfully Uploaded", { variant: "success" });
      } else {
        console.log("No file selected for upload.");
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        enqueueSnackbar("Invalid Email or Password !", { variant: "error" });
      }
      else {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      }
    }

  };

  const performAPICall = async () => {
    try {
      let listOfFileUpload = await axios.get(`${config.endpoint}/books`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      let data = listOfFileUpload.data;
      setallFile(data);

    } catch (e) {

      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        console.log(e.response.message);
      }
      else {
        enqueueSnackbar("Something went wrong!", { variant: "error" });

      }
    }
  };

  useEffect(() => {
    performAPICall();
  }, []);

  return (
    <>
                <div className='d-flex justify-content-between align-items-center'>
    <Header />
      <Logout/></div>
      <div className="container mt-5">
        <h4 className="mb-4">Upload Files:</h4>
        <div className="mb-3">
          <input type="file" className="form-control" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
        </div>
        <button className="btn btn-primary" onClick={handleUpload} disabled={!selectedFile}>
          Upload
        </button>
      </div>

      <div className="container mt-5">
        <h4 className="mb-4">Users Files:</h4>
        <ul className="list-group">
          {allFile.length!=0 ? allFile.map((userFile) => (
            <UserDocuments userData={userFile} />
          )):`No files uploaded !`}
        </ul>
      </div>

    </>
  );
};

export default DocumentUpload;
