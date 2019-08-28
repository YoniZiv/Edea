import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

import SearchPanel from "./search";
import PlayerPanel from "./player";
import HistoryPanel from "./history";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    height: 240
  },
  paper: {
    padding: theme.spacing(2),
    height: "100%",
    color: theme.palette.text.secondary
  },
  control: {
    padding: theme.spacing(2)
  }
});

class InteractiveGrid extends React.Component {
  state = {
    direction: "row",
    justify: "center",
    alignItems: "center"
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={10}
            className={classes.demo}
            alignItems={alignItems}
            direction={direction}
            justify={justify}
          >
            <Grid item>
              <Paper
                className={classes.paper}
                style={{
                  marginTop: "15vh",
                  height: "70vh",
                  width: "25vw"
                }}
              >
                <SearchPanel store={this.props.store} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                className={classes.paper}
                style={{
                  marginTop: "15vh",
                  height: "70vh",
                  width: "25vw"
                }}
              >
                <PlayerPanel store={this.props.store} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                className={classes.paper}
                style={{
                  marginTop: "15vh",
                  height: "70vh",
                  width: "25vw"
                }}
              >
                <HistoryPanel store={this.props.store} />
              </Paper>
            </Grid>

            {/* {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper
                  className={classes.paper}
                  style={{
                    marginTop: "20vh",
                    height: "60vh",
                    width: "25vw"
                  }}
                >
                  {`Cell ${value + 1}`}
                </Paper>
              </Grid>
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InteractiveGrid);
