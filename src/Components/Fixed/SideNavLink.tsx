import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BadgeIcon from '@mui/icons-material/Badge';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
    label: string;
    path: string;
    roles?: string[];
  }
  
  interface SideNavLinkProps {
    open: boolean; // Assuming `open` is a boolean
  }

  const SideNavLink = ({ open }: SideNavLinkProps) => {
    const navigate = useNavigate();
    const menuItems: MenuItem[] = [
        { label: 'Dashboard', path: '/', roles: ['admin', 'user','manager'] },
        { label: 'Apply for Leave', path: '/leave', roles: ['user','admin','manager'] },
        { label: 'Status', path: '/status', roles: ['admin', 'manager', 'user'] },
        { label: 'Accounting Year', path: '/accountingyear', roles: ['admin'] },
        { label: 'Add Employee', path: '/employee', roles: ['admin'] },
        { label: 'Employees List', path: '/employees', roles: ['admin'] }
      ];
      
      function filterMenuItemsByRole(menuItems: MenuItem[], role: string): MenuItem[] {
        return menuItems.filter(item => !item.roles || item.roles.includes(role));
      }
      
      // Example usage
      const roleToFilter = 'admin'; // Replace with the desired role
      const filteredMenuItems = filterMenuItemsByRole(menuItems, roleToFilter);
      console.log(filteredMenuItems);

  const getIconForItem = (label: string): JSX.Element | null => {
    switch (label) {
      case 'Dashboard':
        return <SpaceDashboardIcon />;
      case 'Apply for Leave':
        // Return the icon component for "Apply for Leave"
        // return <YourApplyForLeaveIconComponent />;
      case 'Status':
        return <FactCheckIcon />;
      case 'Accounting Year':
        return <AccountBalanceIcon />;
      case 'Add Employee':
        return <BadgeIcon />;
      case 'Employees List':
        return <FormatListBulletedIcon />;
      default:
        return null;
    }
  };

  return (
    <List>
      {filteredMenuItems.map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => navigate(item.path)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              {/* Replace with appropriate icon based on the item */}
              {getIconForItem(item.label)}
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SideNavLink;
