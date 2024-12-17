import VerticalMenu from "./verticalMenu"
import Header from "./header";
import {useState} from "react";
import Inventory from "./inventory.jsx";
import Pos from "./pos";

const Dashboard = (props) => {
    const [activeItem, setActiveItem] = useState('pos')

    return (
        <div id="dashboard">
            <div className="header">
                <Header />
            </div>
            <div className="main">
            <div className="side-menu"><VerticalMenu activeItem={activeItem} setActiveItem={setActiveItem}/></div>
            <div className="dash-content">
                {
                    (activeItem === 'pos') && <Pos />
                }
                {
                    (activeItem === 'inventory') && <Inventory />
                }
            </div>
            </div>
        </div>)
}

export default Dashboard
