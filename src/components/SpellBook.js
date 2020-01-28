import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateStore } from '../store/store.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function SpellBook() {
  const classes = useStyles();
  //const [menu, setMenu] = useState(false);
  const [{spells}, dispatch] = useStateStore();

  let spellsBook = spells.map((spell_level, index) => {
    return(
    <ExpansionPanel key={index}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{backgroundColor: 'rgba(0, 0, 0, 1)', color: "white"}}
      >
        <Typography className={classes.heading}>Spell Level: {index == 0 ? 'Cantrip' : index}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{padding: '0px', flexDirection: 'column'}}>
        
        
      {spell_level.map((spell, idx) => {
        return(
          <ExpansionPanel key={idx}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{backgroundColor: 'rgba(0, 0, 0, .04)',}}
            >
              <Typography className={classes.heading}>{spell.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              
            
                <div style={{width:'100%'}}>
                  <Typography variant="h6" gutterBottom>Description</Typography>
                  <Typography variant="body1" gutterBottom>{spell.desc}</Typography>

                  <Typography variant="h6" gutterBottom>Range</Typography>
                  <Typography variant="body1" gutterBottom>{spell.range}</Typography>

                  <Typography variant="h6" gutterBottom>Description</Typography>
                  <Typography variant="body1" gutterBottom>{spell.duration}</Typography>

                  <Typography variant="h6" gutterBottom>Concentration</Typography>
                  <Typography variant="body1" gutterBottom>{spell.concentration}</Typography>

                  <Typography variant="h6" gutterBottom>Casting Time</Typography>
                  <Typography variant="body1" gutterBottom>{spell.casting_time}</Typography>

                  <Typography variant="h6" gutterBottom>School</Typography>
                  <Typography variant="body1" gutterBottom>{spell.school}</Typography>

                  <Typography variant="h6" gutterBottom>Materials</Typography>
                  <Typography variant="body1" gutterBottom>{spell.material}</Typography>

                  <Typography variant="h6" gutterBottom>Components</Typography>
                  <Typography variant="body1" gutterBottom>{spell.components}</Typography>

                  <Typography variant="h6" gutterBottom>Classes</Typography>
                  <Typography variant="body1" gutterBottom>{spell.dnd_class}</Typography>

                  <Typography variant="h6" gutterBottom>Archetype</Typography>
                  <Typography variant="body1" gutterBottom>{spell.archetype}</Typography>

                  <Typography variant="h6" gutterBottom>Circles</Typography>
                  <Typography variant="body1" gutterBottom>{spell.circles}</Typography>
                  </div>
                
              
            

            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
      

      </ExpansionPanelDetails>
    </ExpansionPanel>
    )
  });
    

  return (
    <div className="">
      { spellsBook }
    </div>
  );
}