// import React from 'react';
// import ReactDOM from 'react-dom';
// import {App} from './react/App.tsx';

// const rootElem = document.getElementById('root');
// ReactDOM.render(<App/>, rootElem);
import App from './App';
App();
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

if (module.hot) {
  // module.hot.accept('./react/App.tsx', function() {
  //   const App = require('./react/App.tsx').default;
  //   ReactDOM.render(<App/>, rootElem);
  //   console.log('Hot Module Replacement, updating: /.app.tsx');
  // });
  module.hot.accept('./App.ts', function() {
    const App = require('./App.ts').default;
    App();
    console.log('Hot Module Replacement, updating: /.app.ts');
  });
}
