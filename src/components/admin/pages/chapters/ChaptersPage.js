import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TopicsList from '../topics/TopicsList'
import ChaptersTable from './ChaptersTable'
import { useParams } from 'react-router-dom'
import CreateChapter from './CreateChapter'
import { API_BASE_URL } from '../../../config/endpoints';

function ChaptersPage () {
  const { id } = useParams()
  const { topicName } = useParams()

  let titleText;

  if(id ==="*") {
    titleText = "select topic!"
  } else {
    titleText = "Chapters for " + topicName
  }
  

  if(id ==="*") {}
  return (
    <div>
      <br></br>
      <h1>{titleText}</h1>
      <br></br>
      <div>
        <Container>
          <Row>
            <Col lg={{ span: 2 }} xs={{ order: 'first' }}>
              <TopicsList nameOfTopic={topicName} hrefValue = "chapters" page=""/>
            </Col>
            <Col lg={{ span: 7 }} xs={{ order: 13 }}>
              <ChaptersTable />
            </Col>
            <Col xs={{ order: 'last' }}>
              <CreateChapter topicId={id} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default ChaptersPage
