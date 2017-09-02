import React from 'react';
import {Row, Col} from 'react-bootstrap';
export class PageElement extends React.Component {

    render() {
        let result = <div/>;
        const className = `page-element ${this.props.editMode ? 'edit-page-element' : ''}`;
        switch (this.props.data.get('type')) {
            case 'ROW':
                result = <Row className={className}>Row</Row>;
                break;
            case 'COL':
                result = <Col className={className}>Col</Col>;
                break;
            default:
                break;
        }
        return result;
    }
}
PageElement.propTypes = {
    data: React.PropTypes.object.isRequired,
    editMode: React.PropTypes.bool,
};
