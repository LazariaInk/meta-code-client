import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

function ProblemPopup({ problem, onClose }) {
  const [activeKey, setActiveKey] = useState('problemContent');

  return (
    <Modal
      show={!!problem}
      onHide={onClose}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Problem Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          id="problem-tabs"
          className="mb-3"
        >
          <Tab eventKey="problemContent" title="Conținutul problemei">
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: problem?.problemContent || '<p>No content available.</p>',
                }}
              />
            </div>
          </Tab>
          <Tab eventKey="problemSolution" title="Rezolvarea problemei">
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: problem?.problemSolution || '<p>No solution available.</p>',
                }}
              />
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProblemPopup;
