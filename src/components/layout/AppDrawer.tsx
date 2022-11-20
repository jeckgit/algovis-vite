import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function AppDrawer({ drawerWidth }: { drawerWidth: number }) {
    const [open, setOpen] = React.useState(true);
    const data = [
        { route: 'algorithms/bubblesort', label: 'Bubble Sort' },
        { route: 'algorithms/binarytree', label: 'Binary Tree' },
        { route: 'algorithms/binarysearch', label: 'Binary Search' },
        { route: 'algorithms/binarysearchtree', label: 'Binary Search Tree' }
    ];
    const navigate = useNavigate();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                <ListItem dense>
                    <ListItemButton sx={{ borderRadius: '4px', padding: '0 10px' }} disableRipple onClick={() => setOpen(!open)}>
                        <ListItemText primary={'Sorting Algotrythms'} />
                        <KeyboardArrowDown
                            sx={{
                                mr: -1,
                                opacity: 1,
                                transform: open ? 'rotate(0)' : 'rotate(-90deg)',
                                transition: '0.2s'
                            }}
                        />
                    </ListItemButton>
                </ListItem>
                {open &&
                    data.map((item, idx) => (
                        <ListItem key={`item.label-${idx}`}>
                            <ListItemButton sx={{ py: 0, pl: 3, minHeight: 32, borderRadius: '4px' }} onClick={() => navigate(item.route)}>
                                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                <ListItem dense>
                    <ListItemButton sx={{ borderRadius: '4px', padding: '0 10px' }} onClick={() => navigate('maps')}>
                        <ListItemText primary={'Maps'} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
export default AppDrawer;
