import React, { useEffect, useState } from 'react';
import FlashMessages from '../lib/utils/FlashMessages';
import useCustCocs from './useCustCocs';

function useCocList(
  existingCocs,
  benefits,
  actionType,
  intersection,
  not,
  union,
  handleCocSelect
) {
  const [, , , , availCocs] = useCustCocs();
  const [cocsFromBenefits, setCocsBenefits] = useState([]);
  const [claimCocs] = useState(existingCocs ? existingCocs : []);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const [bannedCocs, setBannedCocs] = useState([]);
  useEffect(() => {
    if (availCocs) {
      const firstFilteredCocs = availCocs.filter(
        (coc) =>
          (coc.COCStatus !== 'Expired' || coc.pastExpiry) &&
          coc.COCStatus !== 'INVALID DATA' &&
          coc.productCode === 'CLPMX'
      );
      setCocsBenefits(firstFilteredCocs);
    }
  }, [availCocs]);

  useEffect(() => {
    if (availCocs) {
      if (benefits) {
        var cocsToBeBanned = availCocs;
        ['ADDB', 'FCA', 'ECA'].map((item) => {
          if (benefits.map((item) => item.description).includes(item)) {
            cocsToBeBanned = cocsToBeBanned.filter(
              (coc) =>
                coc.claimsOfThisCoc.find((claim) =>
                  claim.benefits.map((item) => item.code).includes(item)
                ) && coc.COCStatus === 'Claimed'
            );
          }
          return true;
        });
        cocsToBeBanned =
          cocsToBeBanned === availCocs
            ? []
            : cocsToBeBanned.map((coc) => coc.cocNumber);
        setBannedCocs(cocsToBeBanned);
      }
    }
  }, [benefits, cocsFromBenefits, availCocs]);

  useEffect(() => {
    if (cocsFromBenefits) {
      setLeft(
        (actionType === 'add'
          ? cocsFromBenefits
          : cocsFromBenefits.filter((coc) => {
              return !claimCocs.includes(coc.cocNumber);
            })
        ).filter((coc) =>
          coc.claimsOfThisCoc.length > 0
            ? coc.claimsOfThisCoc.find(
                (claim) =>
                  claim.claimsStatus.includes('Settled') &&
                  claim.benefits.find((benefit) =>
                    ['DB', 'ADB'].includes(benefit.code)
                  )
              ) && coc.COCStatus === 'Claimed'
            : true
        )
      );
      if (actionType === 'edit') {
        setRight(
          cocsFromBenefits.filter((coc) => claimCocs.includes(coc.cocNumber))
        );
      }
    }
  }, [cocsFromBenefits, actionType, claimCocs]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    if (right.concat(leftChecked).length <= 5) {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    } else {
      FlashMessages.errors('Only 5 COCs allowed.');
    }
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  useEffect(() => {
    handleCocSelect(right.filter((coc) => !bannedCocs.includes(coc.cocNumber)));
  }, [right, handleCocSelect, bannedCocs]);

  return [
    bannedCocs,
    handleToggle,
    handleToggleAll,
    left,
    right,
    handleCheckedLeft,
    handleCheckedRight,
    numberOfChecked,
    checked,
    leftChecked,
    rightChecked,
  ];
}

export default useCocList;
