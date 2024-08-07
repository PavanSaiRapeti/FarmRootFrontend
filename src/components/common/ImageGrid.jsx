import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const ImageGrid = ({ images }) => {
  return (
    <Container fluid>
      <Row>
        {images.map((image, index) => (
          <Col lg={4} key={index}>
            <Image src={image.src} alt={image.alt} className="w-100" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;