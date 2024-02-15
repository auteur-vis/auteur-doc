"use client"; // This is a client component

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

export default function PermanentDrawerLeft({options=[]}) {

  return (
    <div style={{ minWidth:"200px", margin:"0px 50px" }}>
      <List>
        {options.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton style={{ height:"30px", padding:"0px 24px" }}>
              <a href={`#${text.startsWith("*") ? text.slice(1) : text}`.replace(/\s/g, '')}><ListItemText style={text.startsWith("*") ? {"margin-left":"15px"} : {}} primary={text.startsWith("*") ? text.slice(1) : text} sx={{ "& .MuiTypography-root":{ fontSize:"0.8rem" } }} /></a>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton style={{ height:"30px", padding:"0px 24px" }}>
            <a href="https://github.com/auteur-vis/auteur"><ListItemText primary={"Github"} sx={{ "& .MuiTypography-root":{ fontSize:"0.8rem" } }} /></a>
          </ListItemButton>
        </ListItem>

        {/*<ListItem disablePadding>
          <ListItemButton style={{ height:"30px", padding:"0px 24px" }}>
            <ListItemText primary={"Cite"} sx={{ "& .MuiTypography-root":{ fontSize:"0.8rem" } }} />
          </ListItemButton>
        </ListItem>*/}
      </List>
    </div>
  );
}