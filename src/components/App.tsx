import React, { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import avatarPng from '@/assets/avatar3.png';
import avatarJpeg from '@/assets/avatar2.jpeg';
import Avatar from '@/assets/avatar.svg';

// TREE SHAKING
function todo() {
  todo2();
}

function todo2() {
  throw new Error();
}

export const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => todo();
  // setCount(count + 1);

  // if (__PLATFORM__ === 'mobile') {
  //   return (
  //     <div>
  //       <h1>Mobile</h1>
  //     </div>
  //   )
  // }

  // if (__PLATFORM__ === 'desktop') {
  //   return (
  //     <div>
  //       <h1>Desktop</h1>
  //     </div>
  //   )
  // }

  return (
    <div data-testid={'App.DataTestId'}>
      <Link to="/about">About</Link>
      <br />
      <Link to="/shop">Shop</Link>
      <br />
      <h2 data-testid={'Platform.DataTestId'}>Platform: {__PLATFORM__}</h2>
      <img src={avatarPng} alt='' height={100} width={100} />
      <img src={avatarJpeg} alt='' height={100} width={100} />
      <div>
        <Avatar style={{color: 'darkred'}} height={100} width={100} />
      </div>

      <h1>{count}</h1>
      <button 
        onClick={increment}
        className={classes.button}
      >
        Increment
      </button>
      <Outlet />
    </div>
  )
};