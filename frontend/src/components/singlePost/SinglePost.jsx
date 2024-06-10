import "./singlePost.css"
import { useNavigate } from "react-router-dom";

const SinglePost = ({ _id, category, title, cover, author, content, comments, readTime }) => {

    const navigate = useNavigate();

    const navigateToDetails = () => {
        navigate("/post/" + _id)
    }

    return (
            <div data-testid="book-card">
                <div className="card-container-light my-3">
                    <h2 className="card-title py-2 text-truncate">{title}</h2>
                    <img className="card-img" src={cover} alt={title} />
                    <p>Author: {author}</p>
                    <p>Category: {category}</p>
                    <p>Read Time: {readTime} min</p>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-danger">Delete</button>
                        <button onClick={navigateToDetails} className="btn btn-secondary">Details</button>
                    </div>
                </div>
            </div>
    )
}

export default SinglePost;