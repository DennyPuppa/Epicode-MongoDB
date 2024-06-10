import Alert from 'react-bootstrap/Alert';
import { Container, Row, Col } from "react-bootstrap";

const AlertWelcome = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <Alert key="dark" variant="dark">
                        <h1>Welcome to BlogMongoDB!</h1>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default AlertWelcome;