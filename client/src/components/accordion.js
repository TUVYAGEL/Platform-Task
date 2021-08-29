import Typography from '@material-ui/core/Typography';

//import icon from './Card - icon.svg';
import icon from '../Card - icon.svg'

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

//import functions
import {isEmpty, jsonToCleanString}  from './functions';
 




//styling our accordion , using withStyles:

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
    
      backgroundColor: 'rgba(0, 0, 0, ,0)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56
      },
    },
    content: {
      
        margin: '12px 0',
        display: 'flex',
        justifyContent: 'space-between'
  
      
    },
  
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      paddingLeft: 100,
  
    },
    
  }))(MuiAccordionDetails);
  
  
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
    },
  }));
  
  

  

  //This is the "ertra data component".  if we has more datails in the "message", or if we don't (and than we will show an icon in the expanded panel)
  const DetailsRenderOnCondition = props => {
    if (isEmpty(props.data['details'])) {
      return  <center><img src={icon}   width="128" height="128" /></center>;

    } else {
      return <AccordionDetails>
      <div >    
        <p><b>Severity:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {props.data['details']['severity']}</p> 
        <p><b>Status:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {props.data['details']['status']}  </p>
        <p><b>Tags:</b>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        {jsonToCleanString(props.data['details'])} </p>
      </div>
    </AccordionDetails>;
    }
  }

  



//our main component , the "CustomizedAccordion" component
  export const CustomizedAccordion = props => {

    const classes = useStyles();
  
    return (
      <div >
          <Accordion square expanded={window.$expanded === `panel${props.index+1}`} id={`panel${props.index+1}d-accordion`} onChange={props.handlePanelEvent(`panel${props.index+1}`)}>
          <AccordionSummary aria-controls={`panel${props.index+1}d-content`} id={`panel${props.index+1}d-header`}>
            <Typography className={classes.heading}>  {props.data['resource']}-{props.data['creation_date']} </Typography>
            <Typography className={classes.secondaryHeading}> {props.data['category']}   </Typography> 
            <Typography >{props.data['errors']}&nbsp;&nbsp;&nbsp;{props.data['date']} </Typography>
          </AccordionSummary>
          <DetailsRenderOnCondition data = {props.data}/>
          </Accordion>
      </div >
    );
  };









