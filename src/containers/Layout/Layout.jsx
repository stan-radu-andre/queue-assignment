import React from "react";
import './Layout.scss';
import MenuDrower from '../../assets/menu-drawer.svg';

export function Layout(props) {
  return (
    <div className='layout-container'>
      <div className="top-menu"></div>
      <div className="flex min-w-full justify-space-between">
        <div className="side-menu">
          <img src={MenuDrower} alt="side menu" width='256' />
        </div>
        <div className="flex flex-col">
          {props.children}
        </div>
      </div>
    </div>
  );
}
