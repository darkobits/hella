import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


export const Footer = () => {
  return (
    // Ensures we fill the entire width of the viewport with the footer's
    // background color.
    <footer className="bg-dark text-secondary">
      <Container>
        <Row>
          <Col xs="12" className="py-3">
            © {new Date().getFullYear()} ACME Co.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
