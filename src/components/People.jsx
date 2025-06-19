import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

const People = () => {
    const {store, dispatch} = useGlobalReducer();
    


  return (
    <div>People</div>
  )
};

export default People;