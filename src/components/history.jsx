import React, { Component } from "react";
import { observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

@observer
class HistoryPanel extends Component {
  state = {};

  searchAgain = query => {
    this.props.store.searchSongs(query);
  };

  getList = () => {
    return this.props.store.searchHistory.map(x => {
      return (
        <Grid
          item
          onClick={() => this.searchAgain(x)}
          key={x}
          xs={12}
          style={{ width: "100%", textAlign: "center" }}
        >
          <Paper>{x}</Paper>
        </Grid>
      );
    });
  };

  render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        spacing={5}
      >
        {this.getList()}
      </Grid>
    );
  }
}

export default HistoryPanel;
