import React, { useContext } from 'react';
import { AccordionContext, useAccordionToggle } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ContextAwareToggle({ eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey === eventKey;
  return (
    <>
      <ion-icon
        name={isCurrentEventKey ? 'caret-down' : 'caret-forward'}
        onClick={decoratedOnClick}
        style={{ color: isCurrentEventKey ? '#004c73' : '' }}
      ></ion-icon>
    </>
  );
}

export default ContextAwareToggle;

ContextAwareToggle.propTypes = {
  eventKey: PropTypes.string,
  callback: PropTypes.func,
};
