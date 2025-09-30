import React from 'react'
import {currentUser} from '@clerk/nextjs/server'
import Guest from '../../components/Guest'
//this is the homepage, will be used for the landing page
//async bc itll be in server side
export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }

  return (
    <div  className='text-red-400'> Homepage</div>
  )
}

