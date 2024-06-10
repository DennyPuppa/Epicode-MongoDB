import { useState } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import useSession from "../hooks/useSession";

const BlogPostPage = () => {
    const {session} = useSession()
    const [formData, setFormData] = useState({})
    const [avatarFile, setAvatarFile] = useState(null)
    const [succesPost, setSuccesPost] = useState()
    console.log(formData)

    const onChangeFile = (e) => {
        setAvatarFile(e.target.files[0])
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData()

        data.append('coverImg', avatarFile)
        Object
            .entries(formData)
            .forEach(([key, value]) => {
                data.append(key, value)
            })

        try {
            const response = await axios.post('http://localhost:3030/blogpost', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization' : session
                }
            })
            setSuccesPost(true)
            return response.data
        } catch (e) {
            setSuccesPost(false)
            console.log(e.message)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <h2 className="mb-3">Pubblica Articolo</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="firstname">Title</label>
                            <input
                                onChange={onChangeInput}
                                name="title"
                                type="text"
                                className="form-control"
                                aria-describedby="title"
                                placeholder="Enter title post"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category">Category</label>
                            <input
                                onChange={onChangeInput}
                                name="category"
                                type="text"
                                className="form-control"
                                aria-describedby="category"
                                placeholder="Enter category"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="inputCover">Cover input</label>
                            <input
                                onChange={onChangeFile}
                                type="file"
                                name="coverImg"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Read Time</label>
                            <input
                                onChange={onChangeInput}
                                name="time"
                                type="text"
                                className="form-control"
                                aria-describedby="time"
                                placeholder="Enter Read Time"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="date">Author</label>
                            <input
                                onChange={onChangeInput}
                                name="author"
                                type="text"
                                className="form-control"
                                aria-describedby="date"
                                placeholder="Enter author email"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="content">Blog Content</label>
                            <input
                                onChange={onChangeInput}
                                name="content"
                                type="text"
                                className="form-control"
                                aria-describedby="content"
                                placeholder="Enter Blog Content"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Create Post</button>
                        {succesPost &&
                            <Alert key="succes" variant="success" className="px-2 pt-1 pb-0 mt-2 text-center">
                                <p>Post Pubblicato!</p>
                            </Alert>
                        }
                    </form>

                </div>
            </div>
        </div>
    );
}

export default BlogPostPage;