import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectUser } from 'app/store/userSlice';
import {logoutUser} from "../../auth/store/userSlice";

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const displayName = 'Admin';

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            Admin
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="text.secondary">
            Guest
          </Typography>
        </div>

        <Avatar className="md:mx-4">{displayName[0]}</Avatar>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        <>
          <MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
          <MenuItem component={Link} to="/apps/mailbox" onClick={userMenuClose} role="button">
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/"
            onClick={() => {
              dispatch(logoutUser());
              userMenuClose();
            }}
          >
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </MenuItem>
        </>
        {/* )} */}
      </Popover>
    </>
  );
}

export default UserMenu;
