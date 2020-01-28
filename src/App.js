import React from 'react';
import { StateProvider, initialState, reducer } from "./store/store.js";
//Material UI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

//Components
import Header from './components/Header.js'
import SpellBook from './components/SpellBook.js'
//import Spells from './components/Spells'

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#ffffff',
      },
      secondary: {
          main: '#000000',
      },
  },
});


function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <MuiThemeProvider theme={theme}>  
        <div className="App">
          <Header />
          <SpellBook />
        </div>
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;

