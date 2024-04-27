import React, { useState } from "react";
import { BaseObject, JsonPatch } from "../../Utils/Constants";
import JsonViewer from "../JSONViewer";

import styles from './styles.module.css'

const JsonPatchUI = () => {
    const [patches, setPatches] = useState(JsonPatch);

    const acceptChange = (index) => {
        const patch = patches[index];
        applyChange(patch);
        const updatedPatches = [...patches];
        updatedPatches.splice(index, 1);
        setPatches(updatedPatches);
    };

    const rejectChange = (index) => {
        const updatedPatches = [...patches];
        updatedPatches.splice(index, 1);
        setPatches(updatedPatches);
    };

    const applyChange = (patch) => {

        const path = patch.path.split("/");
        let target = BaseObject;

        // Traverse the object to the target property
        for (let i = 1; i < path.length - 1; i++) {
            target = target[path[i]];
        }

        // Extract the last key and its value
        const lastKey = path[path.length - 1];
        const value = patch.value;

        // Apply the patch operation based on the last key
        if (Array.isArray(target[lastKey]) && patch.op === "add") {
            target[lastKey].push(value);
        } else if (Array.isArray(target[lastKey]) && patch.op === "replace") {
            const index = parseInt(path[path.length - 2]);
            Object.assign(target[lastKey][index], value);
        } else {
            target[lastKey] = value;
        }
    };


    return (
        <div className={styles.jsonPatchUIWrapper}>
            <div className={styles.sides}>
                <JsonViewer data={BaseObject} level={1} />
            </div>
            <div className={styles.sides}>
                {patches.map((patch, index) => {
                    let path = patch.path.split("/").slice(1).join(" -> ",)
                    return (
                        <div key={index} className={styles.changeCard}>
                            <p>Operation : {patch.op}</p>
                            <p>Target : {path}</p>
                            <p>Value : {JSON.stringify(patch.value)}</p>
                            <button onClick={() => acceptChange(index)}>Accept</button>
                            <button onClick={() => rejectChange(index)}>Reject</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default JsonPatchUI;
