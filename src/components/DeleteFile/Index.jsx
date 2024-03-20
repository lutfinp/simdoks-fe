import React from "react";
import HapusFile from "./HapusFile"

const hapusFile = ({onConfirm, onCancel, selectedFileId }) => {
    return(
        <>
        <HapusFile onConfirm={onConfirm} onCancel={onCancel} selectedFileId={selectedFileId}/>
        </>
    )

}

export default hapusFile;