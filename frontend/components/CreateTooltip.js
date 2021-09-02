import React from 'react'
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function CreateTooltip({id, background, action, icon, type, effect, text, stylesClass}) {
    return (
        <div>
            <a data-tip data-for={id} style={background} onClick={action} className={stylesClass}> {icon} </a>
            <ReactTooltip id={id} type={type} effect={effect}>
                <span>{text}</span>
            </ReactTooltip>
        </div>
    )
}

export default CreateTooltip
