import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import ActivityFeedList from './components/ActivityFeedList.jsx';


const App = () => {
  return (
    <div className='container'>
      <Header/>
      <ActivityFeedList />
      <div className="container-view">Some activities should be here</div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
