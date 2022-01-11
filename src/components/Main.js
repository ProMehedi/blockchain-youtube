import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const Main = () => {
  return (
    <Container fluid>
      <Row className='mt-5'>
        <Col md={10}>
          <div
            className='embed-responsive embed-responsive-16by9'
            style={{ maxHeight: '768px' }}
          >
            {/* Video... */}
          </div>
          <h3>{/* Code... */}</h3>
        </Col>
        <Col md={2}>
          <h4>Share Video</h4>
          <Form>
            <Form.Group controlId='file' className='mb-3'>
              <Form.Label>Upload your video</Form.Label>
              <Form.Control type='file' accept='.mp4, .mkv .ogg .wmv' />
            </Form.Group>
            <Form.Group controlId='title' className='mb-3'>
              <Form.Label>Set your video title</Form.Label>
              <Form.Control type='text' placeholder='Video Title' />
            </Form.Group>
            <Button type='submit' variant='danger btn-block'>
              Upload!
            </Button>
          </Form>
          {/* Map Video...*/}
          {/* Return Video...*/}
          <div style={{ width: '175px' }}>
            <div className='card-title bg-dark'>
              <small className='text-white'>
                <b>{/*Video title*/}</b>
              </small>
            </div>
            <div>
              {/* Change Video...*/}
              {/* Return Side Videos...*/}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Main
