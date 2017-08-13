import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
export default class Footer extends React.Component {
    render() {
        return(
          <div className="footer">
            <Grid>
              <Row>
                <Col xs={12}>
                +79197759763 / liubovff@gmail.com / Москва
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                © 2014 created by Splash Course
                </Col>
              </Row>
            </Grid>
          </div>
    );
    }
}
