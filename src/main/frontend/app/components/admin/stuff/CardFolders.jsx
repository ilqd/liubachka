import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon} from 'react-bootstrap';
import './cardcreator.css';
const stub = [{
    name:'English course',
    children:[
    {name:'Book 1',
    children:[
      {name:'Beginner',
      cards:[{name:'Unit 1'}, {name:'Unit 2'}]},
      {name:'Advanced'}]
    },
    {name:'Book 2',
    children:[
      {name:'Intermediate'},
      {name:'Upper intermediate'}]
    },
    ]
}];
class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.state = {open: false};
    }
    open(e) {
        e.stopPropagation();
        this.setState({open: !this.state.open});
    }
    canCreateFolder(elem) {
        return !elem.cards || elem.cards.length == 0;
    }
    canCreateCard(elem) {
        return !elem.children || elem.children.children == 0;
    }
    render() {
        return(
      <div className={`card-folder ${this.state.open ? 'card-folder-open' : ''}`} onClick={this.open}>
        <Glyphicon glyph={`${this.state.open ? 'folder-open' : 'folder-close'}`}/>{this.props.elem.name}
        {this.state.open && this.props.elem.children &&
          this.props.elem.children.map(e=><Folder elem={e}/>)
        }
        {this.state.open && this.props.elem.cards &&
          this.props.elem.cards.map(e=><div className="card-folder">
            <Glyphicon glyph="list-alt"/>{e.name}
          </div>)
        }
        {this.state.open && this.canCreateFolder(this.props.elem) &&
          <div className="card-folder">
            <Glyphicon glyph="inbox"/>Создать папку
          </div>
        }
        {this.state.open && this.canCreateCard(this.props.elem) &&
          <div className="card-folder">
            <Glyphicon glyph="plus"/>Создать карточку
          </div>
        }
      </div>
    );
    }
}

class CardFolders extends React.Component {
    render() {
        return (
    <div>
      <Row>
        <Col xs={12}>
          {stub.map(e=><Folder elem={e}/>)}
          <div className="card-folder">
            <Glyphicon glyph="globe"/>Создать курс
          </div>
        </Col>
      </Row>
    </div>);
    }
}
export default connect()(CardFolders);
