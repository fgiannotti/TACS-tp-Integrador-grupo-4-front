import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import GoogleSignOut from "../login/GoogleSignOut";

const useStyles = makeStyles({
  navDisplayFlex: {
    display: `flex`,
    minWidth:`90%`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    alignSelf: `center`
  },
  logoutFlex: {
    display: `flex`,
    flex: `auto`,
    minWidth:`10%`,
    justifyContent: `flex-end`
  }
});

const navLinks = [
  { title: `mazos`, path: `/product` },
  { title: `jugar`, path: `/blog` },
  { title: `partidas`, path: `/contact` },
  { title: `faq`, path: `/faq` }
];

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color='secondary'>
      <Toolbar>

        <List
          component="nav"
          aria-labelledby="main navigation"
          className={classes.navDisplayFlex}>

            <Link to={"/"} key={"home"}  className={classes.linkText}>
                <IconButton edge="start" color="inherit" aria-label="home">
                  <Home fontSize="large" />
                </IconButton>
            </Link>

          {navLinks.map(({ title, path }) => (
            <Link to={path} key={title} className={classes.linkText}>
              <ListItem button>
                <ListItemText primary={title}/>
              </ListItem>
            </Link>
          ))}

        </List>

        <List
            component="nav"
            aria-labelledby="logout navigation"
            className={classes.logoutFlex}>

            <ListItem>
              <ListItemText className={classes.logoutFlex}>
              <GoogleSignOut/>
              </ListItemText>
            </ListItem>

        </List>

      </Toolbar>
    </AppBar>
  );
};
export default Header;
