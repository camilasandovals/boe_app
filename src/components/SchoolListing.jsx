import { Col, Tab, Row, ListGroup } from "react-bootstrap";

export default function SchoolListing(){
    return(
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col md={4} sm={12}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Link 1
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Link 2
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col >
            <Tab.Content className="tab-content">
              <Tab.Pane eventKey="#link1">Tab pane content 1</Tab.Pane>
              <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
}