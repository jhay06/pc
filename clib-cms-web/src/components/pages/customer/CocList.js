import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ContentLabel from './ContentLabel';
import './AccordionList.css';
import './ClaimMenu.css';
import CustomersLoading from '../../CustomersLoading';
import format from 'date-fns/format';
import useCustCocs from '../../../hooks/useCustCocs';
import ContextAwareToggle from './ContextAwareToggle';

const CocList = () => {
  const [loading, claimsLoading, error, owner, cocs] = useCustCocs();
  const [hoverStyle, setHoverStyle] = useState({ id: '', style: {} });
  return (
    <>
      {(loading || claimsLoading) && (
        <div className="cust-sidebar-loading">
          <CustomersLoading />
        </div>
      )}
      {error && <h3>{`Error: ${error.message}`}</h3>}
      {cocs.map((coc, index) => {
        const {
          cocNumber,
          productCode,
          beneficiaryName,
          expiryDate,
          effectiveDate,
          COCStatus,
        } = coc;
        return (
          <Accordion key={index}>
            <Card>
              <Card.Header>
                <div className="claim-header-container">
                  <Accordion.Toggle
                    eventKey="0"
                    style={hoverStyle.id === index ? hoverStyle.style : {}}
                    onMouseEnter={() =>
                      setHoverStyle({
                        id: index,
                        style: {
                          backgroundColor: '#fafafa',
                        },
                      })
                    }
                    onMouseLeave={() => setHoverStyle({ id: '' })}
                  >
                    <div className="d-flex align-items-start">
                      <ContextAwareToggle eventKey="0" />
                      <div className="title text-left">
                        <h6>{cocNumber}</h6>
                        <p>{productCode}</p>
                      </div>
                      <label>{COCStatus}</label>
                    </div>
                  </Accordion.Toggle>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="coc-lists">
                  <ContentLabel label="Beneficiary" input={beneficiaryName} />
                  <ContentLabel label="Owner" input={owner} />
                  <ContentLabel
                    label="Expiry Date"
                    input={format(new Date(expiryDate), 'MMMM dd, yyyy')}
                  />
                  <ContentLabel
                    label="Inception Date"
                    input={format(new Date(effectiveDate), 'MMMM dd, yyyy')}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      })}
    </>
  );
};

export default CocList;
