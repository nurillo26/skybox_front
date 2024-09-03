import React from 'react';
import { NavLink } from 'react-router-dom';

interface IMenuLinkProps {
  imgUrl: string;
  title: string;
}

const MenuLink: React.FC<IMenuLinkProps> = ({ imgUrl, title }) => {
  return (
    <NavLink
      to={title.toLowerCase()}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? '#60bbfb' : '',
        };
      }}>
      <img src={imgUrl} alt={title} />
      <span>{title}</span>
    </NavLink>
  );
};

export default MenuLink;
