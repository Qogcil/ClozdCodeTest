import React from 'react';
import './App.css';
import Listpage from './listpage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detailpage from './detailpage.js'

function App() {
  const [toDoItems, updateToDoItems] = React.useState([]);



  React.useEffect(() => {
    const getToDoItems = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_TO_DO_ITEMS_API}/employees`
      );

      const items = await response.json();
      if (items && Array.isArray(items) && items.length) {
        // @ts-ignore
        updateToDoItems(items);
      }
    };
    getToDoItems();
  }, []);

  return (
    <div className='list'>
        <div className='sideColumn'/>
        <Router>
          <div className='centerColumn'>
          <Switch>
                  <Route path='/details/:id' component={Detailpage}/>
                  <Route path='/' component={Listpage} />
          </Switch>
          </div>
        </Router>
        <div className='sideColumn'/>
        
    </div>
  );
}

export default App;
