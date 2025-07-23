import React from "react";
import { Link } from "react-router-dom";

export default function TollStart(props) {
    props.setSignInButton(false);
    const [showHowTo, setShowHowTo] = React.useState(false);
    const [showHelp, setShowHelp] = React.useState(false);

    return (
        <div className="parenth">
            <div className="mt-5 d-flex container border border-black border-4 shadow-lg flex-column justify-content-center align-items-center rounded-4 p-4" style={{ backdropFilter: 'blur(3px)', maxWidth: '600px' }}>
                <h2 className="shadow-lg border border-white border-3 p-4 rounded-4 text-center " style={{ color: 'white', background: 'black' }} >Toll Plaza: {props.selectedToll}</h2>
                <div className="row mt-4 d-flex  justify-content-center">
                    <div className="col-sm-5 m-1 d-flex justify-content-center">
                        <Link to="/toll/upload" type="button" className="btn btn-light  d-flex w-75 justify-content-center">
                            UPLOAD DATA
                        </Link>
                    </div>

                    <div className="col-sm-6 m-1 d-flex justify-content-center">
                        <Link to="/toll/checkrecords" type="button" className="btn btn-light d-flex w-75 justify-content-center">
                            CHECK RECORDS
                        </Link>
                    </div>
                    <div className="col-sm-5 m-1 d-flex justify-content-center">
                        <button
                            type="button"
                            id="button3"
                            className="btn btn-light  d-flex w-75 justify-content-center"
                            onClick={() => setShowHowTo(true)}
                        >
                            HOW TO
                        </button>
                    </div>
                    <div className="col-sm-6 m-1 d-flex justify-content-center">
                        <button
                            type="button"
                            id="button4"
                            className="btn btn-light d-flex w-75 justify-content-center"
                            onClick={() => setShowHelp(true)}
                        >
                            HELP
                        </button>
                    </div>
                </div>
            </div>

            {/* HOW TO Modal */}
            <div className={`modal fade ${showHowTo ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ backgroundColor: showHowTo ? "rgba(0,0,0,0.5)" : "transparent" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">How To Fill The Fields</h5>
                            <button type="button" className="btn-close" onClick={() => setShowHowTo(false)}></button>
                        </div>
                        <div className="modal-body">
                            <ol>
                                <li>Click on "Upload Data"</li>
                                <li>Enter the vehicle number and user Mobile Number</li>
                                <li>Upload Tire images from your device</li>
                                <li>Click on Submit</li>
                            </ol>
                            <ul>
                                <h6 className=" ">Note:</h6>
                                <li> You can upload multiple images</li>
                                <li>After uploading, you can check the records by clicking on "Check Records".</li>
                                <li>For any issues, click on "Help" to contact support.</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-secondary" onClick={() => setShowHowTo(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* HELP Modal */}
            <div className={`modal fade ${showHelp ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ backgroundColor: showHelp ? "rgba(0,0,0,0.5)" : "transparent" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Help</h5>
                            <button type="button" className="btn-close" onClick={() => setShowHelp(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Mail us at <a href="mailto:g81projectschool@gmail.com">g81projectschool@gmail.com</a></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowHelp(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}