import React from "react";
import './Circle';

function Circle({ value }: { value: number }) {

    const colors = [

    ];

    return (
        <div className="circle" style={{ backgroundColor: colors[value] }}>{value}</div>
    );

}
export default Circle;