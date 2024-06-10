import MyNav from "../components/navbar/MyNav";
import MyFooter from "../components/footer/MyFooter";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

    const navigate = useNavigate();

    const backHomePage = () => {
        navigate('/')
    }
    
    return (
        <div className="error-page">
            <MyNav />
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="text-center">Oops, qualcosa è andato storto...</p>
                <Button onClick={backHomePage}>Torna alla Home Page</Button>
            </div>
            <MyFooter/>
        </div>
    )
}

export default ErrorPage;