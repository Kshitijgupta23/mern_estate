import "./Error.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className='error_container'>
        <div className="notfound">
            <div className='notfound-404'>
                <h1>404</h1>
            </div>
            <div className="content">
                <h2>WE ARE SORRY, PAGE NOT FOUND</h2>
                <p>
                    THE PAGE YOU ARE LOOKING FOR HAVE BEEN REMOVED,
                    HAD ITS NAME CHANGED OR IS TEMPORARILY UNAVAILABLE.
                </p>
                <Link to="/"><button className="btn">BACK TO HOMEPAGE</button></Link> 
            </div>
        </div>
    </div>
  )
}

export default Error;