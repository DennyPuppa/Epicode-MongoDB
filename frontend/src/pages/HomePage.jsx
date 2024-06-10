import MyNav from "../components/navbar/MyNav";
import MyFooter from "../components/footer/MyFooter";
import AlertWelcome from "../components/welcome/Welcome";
import AllPosts from "../components/allPosts/AllPosts";
import useSession from "../hooks/useSession";


const HomePage = () => {
    const {session} = useSession()
    console.log(session);
    
    return (
        <>
            <MyNav />
            <AlertWelcome/>
            <AllPosts />
            <MyFooter />
        </>
    )
}

export default HomePage;