import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {FieldGroup} from '../../Util.js';
import './cardcreator.css';
export default class CardCreator extends React.Component {
    constructor(props) {
        super(props);
        this.setDelimeter = this.setDelimeter.bind(this);
        this.setText = this.setText.bind(this);
        this.createData = this.createData.bind(this);
        this.setLabel = this.setLabel.bind(this);
        this.setLinesCount = this.setLinesCount.bind(this);
        const delimeter = '  ';
        const text = 'I\'m  beign held  in basement  and  was forced  to do  this  text splitting  and  creating  cards  for  the activity  game  application  If  you  see  this  message  call  911  please';
        const label = 'I\'m just a little harmless label, dont touch me please  :(';
        const linesCount = 10;
        this.state = {delimeter, linesCount, label, text, data: this.createData(text, delimeter, label, linesCount)};
    }

    setDelimeter(e) {
        this.setState({delimeter: e.target.value, data: this.createData(undefined, e.target.value)});
    }
    setText(e) {
        this.setState({text: e.target.value, data: this.createData(e.target.value)});
    }
    setLabel(e) {
        this.setState({label: e.target.value, data: this.createData(undefined, undefined, e.target.value)});
    }
    setLinesCount(e) {
        const linesCount = e.target.value || 1;
        this.setState({linesCount, data: this.createData(undefined, undefined, undefined, linesCount)});
    }
    createData(text = this.state.text, delimeter = this.state.delimeter, label = this.state.label, linesCount = this.state.linesCount) {
        const data = [];
        if (text) {
            const splitted = text.split(delimeter);
            let i;
            let j;
            for (i = 0, j = splitted.length; i < j; i += parseInt(linesCount, 10)) {
                const temparray = splitted.slice(i, i + parseInt(linesCount, 10));
                const block = (<div className="card-block" key={`${i}_${linesCount}`}>
              <Row>
              <Col xs={12}>
                <div className="card-label">
                {label}
                </div>
              </Col>
              </Row>
              {temparray.map((elem, idx)=><Row key={idx}>
              <Col xs={12}>
              <div className={idx == temparray.length - 1 ? 'card-line last-line' : 'card-line'}>
              <div>
              {idx + 1}. {elem}
              </div>
              </div>
              </Col>
              </Row>)}
              </div>);
                data.push(block);
            }
        }
        return data;
    }
    render() {
        return(<div>
      <style dangerouslySetInnerHTML={{__html: `
      @media print {
          body * {
            visibility: hidden;
          }
          .all-card-blocks, .all-card-blocks * {
            visibility: visible;
          }
          .all-card-blocks {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}}/>
      <Row>
        <Col xs={12} md={4}>
          <FieldGroup
            value={this.state.delimeter}
            onChange={this.setDelimeter}
            id="delimeter"
            type="text"
            placeholder="Разделитель"
            label="Разделитель"
          />
        </Col>
        <Col xs={12} md={4}>
          <FieldGroup
            value={this.state.linesCount}
            onChange={this.setLinesCount}
            id="linecount"
            type="number"
            min="1"
            max="100"
            placeholder="Строк на карточку"
            label="Строк на карточку"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <FieldGroup
            value={this.state.label}
            onChange={this.setLabel}
            id="label"
            componentClass="textarea"
            placeholder="Заголовок карточек"
            label="Заголовок карточек"
            rows="3"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FieldGroup
            value={this.state.text}
            onChange={this.setText}
            id="delimeter"
            componentClass="textarea"
            placeholder="Текст"
            label="Текст"
            rows="5"
          />
        </Col>
      </Row>

      <Row >
      <Col xs={12} className="all-card-blocks">
      {this.state.data}
      </Col>
      </Row>
    </div>);
    }
}
