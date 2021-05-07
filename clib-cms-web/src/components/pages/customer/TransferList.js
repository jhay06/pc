import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './TransferList.css';
import useCocList from '../../../hooks/useCocList';
import format from 'date-fns/format';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList({
  existingCocs,
  handleCocSelect,
  actionType,
  benefits,
}) {
  const classes = useStyles();
  const [
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
  ] = useCocList(
    existingCocs,
    benefits,
    actionType,
    intersection,
    not,
    union,
    handleCocSelect
  );

  const renderTooltip = (props) => {
    if (props.popper.state) {
      const cocObj = props.popper.state.options;
      var { address, city, zipCode, effectiveDate, expiryDate } = cocObj;
    }
    return (
      <Tooltip id="button-tooltip" {...props}>
        <div className="tool-tip">
          {props.popper.state && (
            <>
              <label>Address</label>
              <p>{`${address}, ${city}, ${zipCode}`}</p>
              <label>Inception Date</label>
              <p>{format(new Date(effectiveDate), 'MM/dd/yyyy')}</p>
              <label>Expiry Date</label>
              <p>{format(new Date(expiryDate), 'MM/dd/yyyy')}</p>
            </>
          )}
        </div>
      </Tooltip>
    );
  };

  const customList = (title, items) => {
    const unbannedItems = items.filter(
      (coc) => !bannedCocs.includes(coc.cocNumber)
    );
    return (
      <Card>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Checkbox
              color={'primary'}
              onClick={handleToggleAll(unbannedItems)}
              checked={
                numberOfChecked(unbannedItems) === unbannedItems.length &&
                unbannedItems.length !== 0
              }
              indeterminate={
                numberOfChecked(unbannedItems) !== unbannedItems.length &&
                numberOfChecked(unbannedItems) !== 0
              }
              disabled={unbannedItems.length === 0}
              inputProps={{ 'aria-label': 'all unbannedItems selected' }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(unbannedItems)}/${
            unbannedItems.length
          } selected`}
        />
        <Divider />
        <List className={classes.list} dense component="div" role="list">
          {unbannedItems.map((value, index) => {
            const { cocNumber } = value;
            const labelId = `transfer-list-item-${index}-label`;
            return (
              <OverlayTrigger
                placement="left"
                overlay={renderTooltip}
                key={index}
                popperConfig={value}
              >
                <ListItem role="listitem" button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      color={'primary'}
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={cocNumber} />
                </ListItem>
              </OverlayTrigger>
            );
          })}
        </List>
      </Card>
    );
  };

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList('Active', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('In force', right)}</Grid>
    </Grid>
  );
}

TransferList.propTypes = {
  existingCocs: PropTypes.array,
  actionType: PropTypes.string,
  handleCocSelect: PropTypes.func,
  benefits: PropTypes.array,
  popper: PropTypes.object,
};
