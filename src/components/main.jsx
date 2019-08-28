import React, { Component } from "react";
import "../App.css";
import { observer } from "mobx-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import InteractiveGrid from "./interactiveGrid";

@observer
class Main extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <InteractiveGrid store={this.props.store} />
      </React.Fragment>
    );
  }
}

export default Main;
