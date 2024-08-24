import { useState } from "react";
import Star from "./Star"

const StarRating = ({maxRating = 5, color = "black", size="18px", className, messages=[], defaultRating=0}) => {
    
    
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(defaultRating);

    const containerStyle = {
        width: "80%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        padding: "15px 20px",
        justifyContent: "space-between",
        borderRadius: "6px",
        border: "1px solid white"
    }

    const startContainerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "15px"
    }
    
    const textStyle = {
        fontSize: "15px",
        lineHeight: 1,
        margin: 0
    }

    const starStyle = {
        width: size,
        height: size,
        display: "block",
        cursor: "pointer",
    }

    return <div style={containerStyle} className={className}>
        <div style={startContainerStyle}>{Array.from({length: maxRating}, (_,i)=>(
             <Star key={i} onRate={()=>setRating(i+1)} onHoverIn={()=>setTempRating(i+1)} onHoverOut={()=>setTempRating(0)} full={tempRating ? tempRating >= i + 1 : rating >= i + 1} starStyle={starStyle} color={color}/>
        ))}</div>
       <h4 style={textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating-1] : tempRating || rating || ""}</h4>
    </div>
}

export default StarRating;