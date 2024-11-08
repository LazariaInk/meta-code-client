import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

function ProblemPopup({ problem, onClose }) {
  const [activeKey, setActiveKey] = useState('problemContent');

  return (
    <Modal show={!!problem} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Problem Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)} id="problem-tabs">
          <Tab eventKey="problemContent" title="Problem Content">
            <div>
              <p>Problem Content:</p>
              <div>{problem?.problemContent}</div>
            </div>
          </Tab>
          <Tab eventKey="problemSolution" title="Problem Solution">
            <div>
              <p>Problem Solution:</p>
              <div dangerouslySetInnerHTML={{ __html: problem?.problemSolution }} />
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
