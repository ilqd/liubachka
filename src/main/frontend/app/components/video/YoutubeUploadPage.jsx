import React from 'react';
import {Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';
import {FieldGroup} from '@/components/Util.js';
import {connect} from 'react-redux';
import {loadVideo, clearData, updateVideoField, saveVideo} from '@/store/videoEdit.store.js';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';
import {goBack} from '@/store/store';
import Dropzone from 'react-dropzone';
import './video.css';
import ProgressBar from './ProgressBar';

class YoutubeUpload extends React.Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.setField = this.setField.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {files: []};
    }
    componentWillUnmount() {
        this.props.clearData();
    }
    onDrop(files) {
        this.setState({files});
    }
    hideModal() {
        this.props.clearMessage();
        if (this.props.netMessage == SUCCESS_MESSAGE) {
            goBack();
        }
    }
    save() {
        const multiPartformData = new FormData();
        multiPartformData.append(
          'meta',
          new Blob([JSON.stringify(this.props.data.toJS())], { type: 'application/json' })
        );
        multiPartformData.append('file', this.state.files[0]);
        this.props.saveVideo(multiPartformData);
    }
    setField(field, value) {
        if (!value || !value.target) {
            this.props.updateVideoField(field, '');
        } else {
            this.props.updateVideoField(field, value && value.target && value.target.value);
        }
    }
    render() {
        return (<div className="video-upload">
        <Modal show={this.props.netMessage} onHide={this.hideModal}>
          <Modal.Body>
            {this.props.netMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Оки доки</Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col xs={12} md={4}>
            <FieldGroup
              value={this.props.data.get('name')}
              onChange={this.setField.bind(this, 'name')}
              id="name"
              type="text"
              label="Название"
            />
            </Col>
            <Col xs={12} md={8}>
              <FieldGroup
                value={this.props.data.get('description')}
                onChange={this.setField.bind(this, 'description')}
                id="description"
                type="text"
                label="Описание"
              />
              </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <Dropzone
              style={{
                  width: '100%',
                  height: '2.4em',
                  borderStyle: 'solid',
                  borderRadius: 0,
                  borderColor: 'lightgray',
                  borderWidth: 1,
                  cursor: 'pointer'
              }}
              onDrop={this.onDrop} accept="video/*" multiple={false}>
              <div className="file-upload-text">
              {(this.state.files && this.state.files.length > 0 && this.state.files[0].name) || 'Выберите файл (1GB макс)'}
              </div>
              </Dropzone>
              <ProgressBar/>
            </Col>
            <Col xs={12} sm={4}>
            <Button bsStyle="primary" style={{float: 'right'}} onClick={this.save} disabled={this.props.busy || this.state.files.length < 1}>
              <Glyphicon glyph="save"/>
                Сохранить
            </Button>
            <Button style={{float: 'right', margin: '0 10px'}} onClick={goBack}>
              Назад
            </Button>
            </Col>
          </Row>
        </div>);
    }
}
YoutubeUpload.propTypes = {
    data: React.PropTypes.object,
    clearData: React.PropTypes.func,
    clearMessage: React.PropTypes.func,
    loadVideo: React.PropTypes.func,
    updateVideoField: React.PropTypes.func,
    saveVideo: React.PropTypes.func,
    busy: React.PropTypes.bool,
    netMessage: React.PropTypes.string,
};
export default connect(state=>({
    data: state.getIn(['video', 'edit']),
    busy: state.getIn(['ajaxStatus', 'posting']),
    netMessage: state.getIn(['ajaxStatus', 'message']),
}), dispatch=>({
    loadVideo(id) {
        loadVideo(dispatch, id);
    },
    clearData() {
        clearData(dispatch);
    },
    updateVideoField(field, value) {
        updateVideoField(dispatch, field, value);
    },
    saveVideo(data) {
        saveVideo(dispatch, data);
    },
    clearMessage() {
        clearMessage(dispatch);
    }
}))(YoutubeUpload);
