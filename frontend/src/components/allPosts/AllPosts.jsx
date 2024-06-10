import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SinglePost from '../singlePost/SinglePost';
import { useState, useEffect } from 'react';


const AllPosts = (props) => {

    const URL_ENDPOINT = "http://localhost:3030/blogpost"

    const [blogPosts, setBlogPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllPosts = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(URL_ENDPOINT)
            const data = await response.json()
            setIsLoading(false)
            setBlogPosts(data)
            return data
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <Container>
            <Row>
            {blogPosts.map((post, index) => (
                    <Col key={`singlebook-${index}`} xs={12} md={4} lg={3}>
                        <SinglePost
                            title={post.title}
                            cover={post.cover}
                            author={post.author}
                            category={post.category}
                            _id={post._id}
                            readTime={post.readTime.value}
                        />
                    </Col>
                )).reverse()}
                {blogPosts.length === 0 &&
                <Col>
                    <p>ACCENDERE SERVER!</p>
                </Col>
                }
            </Row>
        </Container>
    )
}

export default AllPosts;