import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegTrashAlt, FaArrowUp } from 'react-icons/fa';
import EditLesson from './EditLesson';
import CreateLesson from './CreateLesson';
import Modal from 'react-bootstrap/Modal';
import { API_BASE_URL } from '../../../config/endpoints';

function LessonsTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lessons, setItems] = useState([]);
  const { chapterId } = useParams();
  const [lessonContent, setLessonContent] = useState('');
  const [lessonId, setLessonId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const handleShow = id => {
    setLessonId(id);
    setShow(true);
  };

  const imageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(image);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const imagesData = await Promise.all(selectedImages.map(async (image) => {
      const base64Image = await imageToBase64(image);
      return {
        fileName: image.name,
        base64Data: base64Image
      };
    }));
  
    const dataToSend = {
      lessonContent: lessonContent,
      images: imagesData
    };
  
    try {
      const response = await fetch(API_BASE_URL + `admin/lesson/${lessonId}/insert`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json', // Important pentru a specifica tipul de conținut
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload lesson content and images.');
      }
  
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  

  const base64ToBlob = (base64) => {
    // Split the base64 string to get metadata and data
    const [metadata, data] = base64.split(';base64,');
    // Extract the content type from metadata
    const contentType = metadata.split(':')[1];
    // Convert base64 string to ArrayBuffer
    const arrayBuffer = Uint8Array.from(atob(data), c => c.charCodeAt(0)).buffer;
    // Create Blob object
    return new Blob([arrayBuffer], { type: contentType });
  };
  


  const handleDeleteImage = (index) => {
    // Remove the selected image at the given index
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);

    // Remove the preview image at the given index
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const handleImageChange = (e) => {
    // Get the selected files
    const files = Array.from(e.target.files);

    // Update selected images state
    setSelectedImages([...selectedImages, ...files]);

    // Update preview images state
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imagePreviews]);
  };

  async function handleDelete(id) {
    await fetch(API_BASE_URL + `admin/lesson/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')} `,
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    }).then(() => {
      const newLessons = [...lessons]

      const index = lessons.findIndex(lesson => lesson.lessonId === id)

      newLessons.splice(index, 1)

      setItems(newLessons)
    })
  }

  useEffect(() => {
    var tempId = chapterId
    if (tempId === '*') {
      tempId = ' '
    }
    fetch(API_BASE_URL + 'admin/lesson/all/' + tempId, {
      headers: {
        'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')} `,
      'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    })
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true)
          setItems(result)
        },
        error => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th rowSpan={2}>ID</th>
              <th rowSpan={2}>name</th>
              <th colSpan={3}> Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map(lesson => (
              <tr key={lesson.lessonId}>
                <td>{lesson.lessonId}</td>
                <td>{lesson.lessonName}</td>
                <td>
                  <Button
                    variant='link'
                    onClick={e => handleDelete(lesson.lessonId, e)}
                  >
                    <FaRegTrashAlt color='black' />
                  </Button>
                </td>
                <td>
                  <EditLesson
                    lessonId={lesson.lessonId}
                    lessonName={lesson.lessonName}
                  />
                </td>
                <td>
                  <Button
                    variant='link'
                    onClick={e => handleShow(lesson.lessonId)}
                  >
                    <FaArrowUp color='black' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* ... */}
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Lesson</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Lesson Content</label>
                  <textarea
                    className="form-control"
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Upload Images</label>
                  <input type="file" multiple onChange={handleImageChange} />
                </div>
                <div className="preview-images">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="preview-image">
                      <img src={preview} alt={`Preview ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      <button type="button" onClick={() => handleDeleteImage(index)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </>
        <CreateLesson chapterId={chapterId} />
      </div>
    )
  }
}

export default LessonsTable
