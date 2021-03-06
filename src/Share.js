import React, {useState, useEffect, createRef, useContext} from 'react'; 
const deployedURL = process.env.REACT_APP_DEPLOYED_URL || "http://localhost:3000";
 
const Share = ({hash})=> { 
  const [success, setSuccess] = useState(false)

  const handleCopy = ()=> {
    navigator.clipboard.writeText(`${deployedURL}/?${hash}`)
    setSuccess(true)
  }

  return ( 
    <div>
        <button
    onClick={handleCopy}
>
  Share
</button>
    </div>

  ) 
} 
export default Share;
