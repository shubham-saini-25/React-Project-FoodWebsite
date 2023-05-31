import React from "react";
import Sidebar from "../components/Sidebar";
import FoodNavbar from "../components/FoodNavbar";
import BillDashboard from "../components/BillDashboard";

const Layout = (props) => {
    return (
        <>
            <FoodNavbar />
            <div className="row row-cols-4">
                <div className="col-sm-2">
                    <Sidebar />
                </div>
                <div className="col-sm-7">
                        {props.children} <br />
                </div>
                <div className="col-sm-3 bg-dark">
                    <BillDashboard />
                </div>
            </div>
            <footer id="sticky-footer" className="flex-shrink-0 py-3 bg-dark text-white-50">
                <div className="container text-center">
                    <small>Copyright &copy; 2023</small>
                </div>
            </footer>
        </>
    );
};

export default Layout;
