import React from "react"

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div style={{color:"grey", opacity:"0.7", borderTop:"1px solid lightgrey", maxWidth:"600px", margin:"auto"}} className="py-5 col-xs-12">
                <h5 className="text-uppercase">Disclaimer</h5>
                <p>Please note that there may be up to a 1-hour delay in fetching the latest exchange rates, so we advise against using this application for anything that requires real-time exchange rates.</p>
            </div>
        </div>
    </div>
</footer>

export default Footer