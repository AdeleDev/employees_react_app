import "./app-info.css";
import logo from './logo.png'

const AppInfo = ({amount, increased}) => {
    return (
        <div className="app-info">
            <img src={logo} alt="logo"/>
            <h1>Information about employees of company</h1>
            <h2>Amount of people: {amount}</h2>
            <h2>Awards will get: {increased}</h2>
        </div>
    )
}

export default AppInfo