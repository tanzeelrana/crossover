// src/App.js

import React from 'react';
import CommitList from './components/CommitList';

const App = () => {
  return (
    <div>
      <CommitList username={`${import.meta.env.VITE_APP_USERNAME}`} repository={`${import.meta.env.VITE_APP_REPOSITORY_NAME}`} />
    </div>
  );
};

export default App;
