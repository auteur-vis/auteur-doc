"use client"; // This is a client component

import localFont from 'next/font/local';

import { Sedgwick_Ave_Display } from "next/font/google";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Link from 'next/link';

const sedgwickavedisplay = Sedgwick_Ave_Display({ weight: '400', subsets: ["latin"] });

// Font files can be colocated inside of `pages`
const menlo = localFont({ src: './menlo_bold.woff' });

function ResponsiveAppBar({selected="Getting Started", setSelection}) {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = ['Getting Started', 'Documentation', 'Gallery'];
  const hrefs = {'Getting Started':"/gettingstarted", 'Documentation':"/generationcriteria", 'Gallery':"/gallery"};

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (p) => {
    // setSelection(p);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor:"white", width:"100vw", color:"#2f8480", borderBottom: "1px solid hsl(210,8%,85%)", boxShadow:"none"}}>
      <Container style={{ margin:"0px 50px" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/auteur-doc/gettingstarted"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <span style={{fontFamily: `${sedgwickavedisplay.style.fontFamily}`, fontSize:"1.2em"}}>A</span><span className={menlo.className}>UTEUR</span> <span style={{"fontSize":"12px"}}>v0.1.6</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  {(page == selected)
                    ? (<Typography textAlign="center" style={{ fontWeight:"700", color: 'hsl(210,8%,25%)' }}><a href={`/auteur-doc/${page.replace(/\s/g, '').toLowerCase()}`}>{page}</a></Typography>)
                    : (<Typography textAlign="center" style={{ color: 'hsl(210,8%,50%)' }}><a href={`/auteur-doc/${page.replace(/\s/g, '').toLowerCase()}`}>{page}</a></Typography>)}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/auteur-doc/gettingstarted"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <span style={{fontFamily: `${sedgwickavedisplay.style.fontFamily}`, fontSize:"1.2em"}}>A</span><span className={menlo.className}>UTEUR</span> <span style={{"fontSize":"12px"}}>v0.1.6</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'hsl(210,8%,50%)', display: 'block', textTransform: 'none', padding:'0px 10px' }}
              >
                {(page == selected) ? (<span style={{ fontWeight:"700", color: 'hsl(210,8%,25%)' }}><a href={`/auteur-doc/${page.replace(/\s/g, '').toLowerCase()}`}>{page}</a></span>) : <a href={`/auteur-doc/${page.replace(/\s/g, '').toLowerCase()}`}>{page}</a>}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;