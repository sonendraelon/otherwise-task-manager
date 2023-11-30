import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white h-[40vh] py-8 text-center'>
            <h1 className='text-4xl font-bold mb-8'>Welcome to Task Manager App</h1>
            <Link to="/signup" className='inline-block bg-white text-blue-500 px-6 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition duration-300'>
              Manage your tasks
            </Link>
          </div>
        ) : (
          <div className='mx-8'>
            <h1 className='text-2xl font-bold mb-8'>Welcome {authState.user.name}</h1>
            <Tasks />
          </div>
        )}
      </MainLayout>
    </>
  )
}

export default Home;