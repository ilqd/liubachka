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
