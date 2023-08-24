import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/Header'
import axios from "axios";
import { useSnackbar } from "notistack";
import { config } from "../../../../App";



function UserDocuments({ userData }) {
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem("token");

    const handleDelete = async (fileId) => {
        if (!token) {
            enqueueSnackbar("Please log in again to upload files!", { variant: "warning" })
            return;
        }
        try {
            if (fileId) {

                let url = `${config.endpoint}/userFileUpload/deleteFile`;
                await axios.delete(`${url}/${fileId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },

                }
                );
                enqueueSnackbar("Successfully Deleted", { variant: "success" });
            } else {
                console.log("No fileId for Deletion present.");
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

    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className='d-flex justify-content-between align-items-center'>
                    <a href={userData.awsUrl} download>
                        {userData.shortUrl}
                    </a>
                    <span className={`badge ${userData.isDeleted ? 'bg-secondary' : 'bg-success'} mx-2`}>
                        {userData.isDeleted ? 'Expired' : 'Unexpired'}
                    </span>
                </div>

                <div>
                    <a href={userData.awsUrl} download>
                        <button className="btn btn-primary btn-sm mx-2">Download File</button>
                    </a>                    
                    <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDelete(userData._id)}>Delete</button>

                </div>
            </li>

        </div>
    )
}

export default UserDocuments