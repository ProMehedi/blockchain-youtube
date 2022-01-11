import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const Main = ({ uploadVideo, videos, currentTitle, hash }) => {
  const [title, setTitle] = React.useState('')
  const [buffer, setBuffer] = React.useState([])

  //Get video
  const captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const _buffer = Buffer.from(reader.result)
      setBuffer(_buffer)
    }
  }

  return (
    <Container fluid>
      <Row className='mt-5'>
        <Col md={10}>
          <div
            className='embed-responsive embed-responsive-16by9'
            style={{ maxHeight: '768px' }}
          >
            <video
              className='embed-responsive-item'
              src={`https://ipfs.infura.io/ipfs/${hash}`}
              controls
            />
          </div>
          <h3 className='mt-3'>{currentTitle}</h3>
        </Col>
        <Col md={2}>
          <h4>Share Video</h4>
          <Form
            onSubmit={(event) => {
              event.preventDefault()
              uploadVideo(title, buffer)
            }}
          >
            <Form.Group controlId='file' className='mb-3'>
              <Form.Label>Upload your video</Form.Label>
              <Form.Control
                type='file'
                accept='.mp4, .mkv .ogg .wmv'
                onChange={captureFile}
              />
            </Form.Group>
            <Form.Group controlId='title' className='mb-3'>
              <Form.Label>Set your video title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Video Title'
                onChange={({ target }) => setTitle(target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='danger btn-block'>
              Upload!
            </Button>
          </Form>
          {videos &&
            videos.map((video) => (
              <Card key={video.hash} bg='dark' text='light' className='mt-3'>
                <Card.Body className='p-1'>
                  <small>{video.title}</small>
                  <div className='embed-responsive embed-responsive-16by9'>
                    <video
                      className='embed-responsive-item'
                      src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                      controls
                    />
                  </div>
                </Card.Body>
              </Card>
            ))}
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
