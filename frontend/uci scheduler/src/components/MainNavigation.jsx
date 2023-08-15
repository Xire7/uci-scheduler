import {NavLink} from 'react-router-dom'
import classes from './css/MainNavigation.module.css'

const MainNavigation = () => {
    return (
        <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                // className={({ isActive }) => {
                //   return isActive ? classes.active : undefined;
                // }}
              >Home Page</NavLink>
            </li>
            <li>
              <NavLink
                to="/new"
                // className={({ isActive }) => {
                //   return isActive ? classes.active : undefined;
                // }}
              >Add Course</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
};

export default MainNavigation;