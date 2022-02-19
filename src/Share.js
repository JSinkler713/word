import React, {useState, useEffect, createRef, useContext} from 'react'; 
const deployedURL = process.env.REACT_APP_DEPLOYED_URL || "http://localhost:4000";
 
const Share = ({hash})=> { 
  const [success, setSuccess] = useState(false)

  const handleCopy = ()=> {
    navigator.clipboard.writeText(`deployedURL/?${hash}`)
    setSuccess(true)
  }

  return ( 
    <div>
        <button
    onClick={handleCopy}
>
  Or Share
          {success &&
          <div className="SharedSuccess">Copied to clipboard, send to a friend</div>
          }
</button>
    </div>

  ) 
} 
export default Share;
