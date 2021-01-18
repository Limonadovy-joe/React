import App from './App';
import './styles/main.scss';

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
App();

if (module.hot) {
  module.hot.accept('./App.ts', function() {
    const App = require('./App.ts');
    console.log('Hot Module Replacement, updating: /.app.ts');
    App();
  });
}
