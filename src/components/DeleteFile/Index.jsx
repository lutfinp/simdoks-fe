import React from "react";
import HapusFile from "./HapusFile"

const hapusFile = ({onConfirm, onCancel }) => {
    return(
        <>
        <HapusFile onConfirm={onConfirm} onCancel={onCancel}/>
        </>
    )

}

export default hapusFile;