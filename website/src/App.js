import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/login/login';
function App() {
  return (
     <div>
       <LoginComponent/>
        <div>login component changes here</div>
     </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <div>
    //     <button className="btn btn-primary">Click</button>
    //   </div>
    // </div>
  );
}

export default App;
