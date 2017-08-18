/* eslint react/no-multi-comp: "off" */
import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
export function FieldGroup({ id, label, help, ...props }) {
    return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
FieldGroup.propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
};


class CheckboxFilter extends React.Component {
    constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.isFiltered = this.isFiltered.bind(this);
    }

    filter() {
        if (this.refs.nokCheckbox.checked && this.refs.okCheckbox.checked) {
      // all checkboxes are checked means we want to remove the filter for this column
            this.props.filterHandler();
        } else {
            this.props.filterHandler({ callback: this.isFiltered });
        }
    }

    isFiltered(targetValue) {
        if (targetValue === false || targetValue === 'no' || targetValue === 'false') {
            return (this.refs.nokCheckbox.checked);
        }   return (this.refs.okCheckbox.checked);
    }

    cleanFiltered() {
        this.refs.okCheckbox.checked = true;
        this.refs.nokCheckbox.checked = true;
        this.props.filterHandler();
    }

    render() {
        return (
      <div>
        <input ref="okCheckbox" type="checkbox" className="filter" onChange={ this.filter } defaultChecked /><label>{ this.props.textOK }</label>
        <input ref="nokCheckbox" type="checkbox" className="filter" onChange={ this.filter } defaultChecked style={ { marginLeft: 30 + 'px' } } /><label>{ this.props.textNOK }</label>
      </div>
    );
    }
}

CheckboxFilter.propTypes = {
    filterHandler: React.PropTypes.func.isRequired,
    textOK: React.PropTypes.string,
    textNOK: React.PropTypes.string
};

CheckboxFilter.defaultProps = {
    textOK: 'OK',
    textNOK: 'Not OK'
};

export function getCheckboxFilter(filterHandler, customFilterParameters) {
    return (
    <CheckboxFilter filterHandler={ filterHandler } textOK={ customFilterParameters.textOK } textNOK={ customFilterParameters.textNOK } />
  );
}
