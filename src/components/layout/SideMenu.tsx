import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export interface SideMenuItem {
  label: string;
  href?: string | undefined;
  onClick?: (() => void) | undefined;
}

export interface SideMenuProps {
  items?: SideMenuItem[] | undefined;
  expandButton?: React.ReactNode;
  onNavigate?: ((item: SideMenuItem) => void) | undefined;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  items = [],
  expandButton,
  onNavigate,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <>
      {expandButton &&
        React.isValidElement(expandButton) &&
        React.cloneElement(expandButton as React.ReactElement<{ onClick?: () => void }>, {
          onClick: handleOpen,
        })}
      <Drawer
        anchor="left"
        open={open}
        variant="temporary"
        transitionDuration={500}
        onClose={handleClose}
      >
        <List>
          {items.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={item.href ? 'a' : 'div'}
                href={item.href}
                onClick={() => {
                  item.onClick?.();
                  onNavigate?.(item);
                  handleClose();
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
