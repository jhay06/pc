import React, { useState } from 'react';
import { Accordion, Tabs, Tab } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import GeneralMenu from '../GeneralMenu';
import CustomerDocuments from './CustomerDocuments';
import CustomerInfo from './CustomerInfo';
import '../AccordionList.css';
import PropTypes from 'prop-types';
import useClickOutside from '../../../../hooks/useClickOutside';
import ClaimLoading from './ClaimLoading';
import CUSTOMER from '../../../../api/queries/Customer';
import CLAIM from '../../../../api/queries/Claim';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { NetworkStatus } from 'apollo-client';
import ContextAwareToggle from '../ContextAwareToggle';
import { internalStatusMapping } from '../../../../claimStatusMapping';
import useRoleRestrict from '../../../../hooks/useRoleRestrict';

export const ClaimList = ({ claim, claimKey, claimsRefetch }) => {
  const { claimReferenceNo, claimsStatus, internalClaimsStatus } = claim || {};
  const {
    hasAccess: documentsAccess,
    restrictClaimEditDocsCRUD,
  } = useRoleRestrict('claimDocuments');
  const { hasAccess: statusAccess } = useRoleRestrict('updateStatus');
  const { hasAccess: editClaimAccess } = useRoleRestrict('editClaim');

  const [
    showGenMenu,
    clickedOutside,
    setClickedOutside,
    ,
    toggleMenuShow,
  ] = useClickOutside();
  const { id } = useParams();
  const { networkStatus, refetch: refetchAfterStatusEdit } = useQuery(
    CUSTOMER.CLAIMS,
    {
      variables: {
        limit: '1000',
        page: '1',
        customerNo: id,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const docsQueryObj = useQuery(CLAIM.DOCUMENTS, {
    variables: {
      claimReferenceNo: claimReferenceNo,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [hoverStyle, setHoverStyle] = useState({});
  const handledNA =
    internalClaimsStatus === 'NOT AVAILABLE'
      ? 'Not Applicable'
      : internalClaimsStatus;
  const statusDetails = internalStatusMapping.find(
    (status) =>
      status.claimsStatus === claimsStatus &&
      status.internalClaimsStatus === handledNA
  );
  const cmsClaimsStatus = statusDetails
    ? statusDetails.cmsDisplay
    : 'dataError';

  return (
    <>
      <Accordion>
        {showGenMenu &&
          !clickedOutside &&
          !claimsStatus.includes('Settled') &&
          !restrictClaimEditDocsCRUD(cmsClaimsStatus) &&
          networkStatus !== NetworkStatus.refetch && (
            <GeneralMenu
              clickedOutside={clickedOutside}
              uniqueClickHandle={setClickedOutside}
              claimKey={claimKey}
              claim={claim}
              refetchAfterStatusEdit={refetchAfterStatusEdit}
              claimsRefetch={claimsRefetch}
              isUpdatingStatus={networkStatus === NetworkStatus.refetch}
              docsQueryObj={docsQueryObj}
            />
          )}
        <Card>
          <Card.Header>
            <div className="claim-header-container">
              <Accordion.Toggle
                eventKey="0"
                style={hoverStyle}
                onMouseEnter={() =>
                  setHoverStyle({ backgroundColor: '#fafafa' })
                }
                onMouseLeave={() => setHoverStyle({})}
              >
                <div className="d-flex align-items-start">
                  <ContextAwareToggle eventKey="0" />
                  <div className="title text-left">
                    <h6>{claimReferenceNo}</h6>
                    <p>PROTECTMAX</p>
                  </div>
                  {networkStatus !== NetworkStatus.refetch ? (
                    <label>{cmsClaimsStatus}</label>
                  ) : (
                    <label>
                      <div className="claim-loading">
                        <ClaimLoading />
                      </div>
                    </label>
                  )}
                </div>
              </Accordion.Toggle>
              {!claimsStatus.includes('Settled') &&
                !claimsStatus.includes('Archived') &&
                editClaimAccess &&
                documentsAccess &&
                statusAccess &&
                !restrictClaimEditDocsCRUD(cmsClaimsStatus) && (
                  <ion-icon
                    name="ellipsis-horizontal"
                    onClick={toggleMenuShow}
                    id={`claim${claimKey}`}
                    class="gen-menu-icon"
                  ></ion-icon>
                )}
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="claim-lists d-flex flex-column">
              <Tabs
                className="mb-3"
                defaultActiveKey="info"
                id="uncontrolled-tab-example"
              >
                <Tab
                  tabClassName={documentsAccess ? '' : 'single-tab-style'}
                  eventKey="info"
                  title="Info"
                >
                  <CustomerInfo claim={claim} />
                </Tab>
                {documentsAccess && (
                  <Tab eventKey="Documents" title="Documents">
                    <CustomerDocuments
                      claimReferenceNo={claimReferenceNo}
                      docsQueryObj={docsQueryObj}
                      claimsStatus={cmsClaimsStatus}
                    />
                  </Tab>
                )}
              </Tabs>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default ClaimList;

ClaimList.propTypes = {
  claim: PropTypes.object,
  claimKey: PropTypes.number,
  claimsRefetch: PropTypes.func,
};
