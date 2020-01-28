import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Modal from '@material-ui/core/Modal';
import { Paper } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStateStore } from '../store/store.js';

const dndClasses = ["Barbarian", "Fighter", "Paladin", "Bard", "Sorcerer", "Paladin", "Warlock", "Cleric", "Druid", "Monk", "Ranger", "Monk", "Fighter", "Rogue", "Ranger", "Wizard"];

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

export default function Header() {
  const classes = useStyles();
  const [menu, setMenu] = useState(false);
  const [{playerClass, level}, dispatch] = useStateStore();
  
  function setClass(v){
    dispatch({
      type: "setClass",
      payload: v
    });
  }
  function setLevel(v){
    dispatch({
      type: "setLevel",
      payload: v
    });
  }
  function submitRequest(c, l){
    //return fetch("https://api.open5e.com/spells/?dnd_class__contains=" + c, {
    return fetch("https://api.open5e.com/spells/?limit=300&search=" + c, {
      method: 'GET'
    })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let spell_book = json.results.reduce((book, d) => {
        book[d.level_int].push(d)
        return book
      }, [...Array(10)].map(() => []) );
      dispatch({
        type: "setSpells",
        payload: spell_book
      })
    }).then(() => {
      setMenu(false)
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Spell Book
          </Typography>
          <Button color="inherit" onClick={() => setMenu(true)}>Class Select</Button>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={menu}
        onClose={() => setMenu(false)}
        style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Paper style={{maxHeight: "calc(100% - 20px)", maxWidth: "calc(100% - 20px)", padding: '20px', margin: '0 20px'}}>
          <Typography>Character Profile</Typography>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={playerClass}
              onChange={(e) => setClass(e.target.value)}
              style={{width: "200px"}}
            >
              <MenuItem value={""}>Class</MenuItem>
              { dndClasses.map((d, idx) =>  
                <MenuItem key={idx} value={d}>{d}</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{width: "200px"}}
            >
              <MenuItem value={""}>Level</MenuItem>
              { [...Array(20).keys()].map((d, idx) =>  
                <MenuItem key={idx} value={d+1}>{d+1}</MenuItem>
              )}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => submitRequest(playerClass, level)}
          >
            Collect Spells
          </Button>
        </Paper>
        
      </Modal>
    </div>
  );
}