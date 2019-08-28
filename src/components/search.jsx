import React, { Component } from "react";
import { observer } from "mobx-react";
import "../App.css";
import Item from "./item";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

@observer
class SearchPanel extends Component {
  state = {
    searchValue: ""
  };

  listView = {
    flexDirection: this.props.store.isTiles ? "column" : "row",
    display: "flex"
  };

  searchSongs = () => {
    this.props.store.addToHistory(this.state.searchValue);
    this.props.store.searchSongs(this.state.searchValue);
    this.setValue("");
  };

  setValue(val) {
    this.setState({
      searchValue: val
    });
  }

  changeValue(e) {
    this.setValue(e.target.value);
  }

  getResults = () => {
    return this.props.store.filteredResults.map(x => {
      return <Item key={x.id} item={x} store={this.props.store} />;
    });
  };

  render() {
    return (
      <Grid
        container
        style={{ flexGrow: 1, height: "100%", textAlign: "center" }}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 60 }}
        >
          <Grid item xs={9}>
            <TextField
              label="Song name"
              value={this.state.searchValue}
              onChange={this.changeValue.bind(this)}
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              style={{ margin: 5 }}
              onClick={this.searchSongs}
            >
              {">"}
            </Fab>
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          direction={this.props.store.isTiles ? "column" : "row"}
        >
          {this.getResults()}
        </Grid>

        <Grid container justify="space-between" alignItems="flex-end">
          <Grid item xs={3}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              style={{ margin: 5 }}
              onClick={() => this.props.store.switchPage(false)}
            >
              {"<"}
            </Fab>
          </Grid>
          <Grid item xs={3}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              style={{ margin: 5 }}
              onClick={() =>
                (this.props.store.isTiles = !this.props.store.isTiles)
              }
            >
              [ ]
            </Fab>
          </Grid>
          <Grid item xs={3}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              style={{ margin: 5 }}
              onClick={() => this.props.store.switchPage(true)}
            >
              {">"}
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default SearchPanel;
