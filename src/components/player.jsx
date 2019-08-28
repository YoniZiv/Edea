import React, { Component } from "react";
import { observer } from "mobx-react";
import SongContainer from "./songContainer";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";
import "../App.css";

const styles = {
  opacity: 0,
  transition: "all 1s",
  textAlign: "center"
};

@observer
class PlayerPanel extends Component {
  componentDidMount() {
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.props.store.imgRectangle = rect;
  }

  componentDidUpdate() {
    this.imgRef.style.transition = "none";
    this.imgRef.style.opacity = 0;
    setTimeout(() => {
      this.imgRef.style.transition = "all 1s";
      this.imgRef.style.opacity = 1;
    }, 500);
  }

  displayImage = () => {
    if (
      this.props.store.transitionComplete &&
      this.props.store.embedResult.thumbnail_url
    ) {
      return (
        <img
          style={{ width: "100%", height: "100%" }}
          onClick={this.embedSong}
          src={this.props.store.embedResult.thumbnail_url}
        />
      );
    }
  };

  embedSong = () => {
    this.props.store.songClicked = true;
  };

  render() {
    return (
      <Grid
        container
        justify="space-around"
        alignItems="center"
        style={{ flexGrow: 1, height: "100%", textAlign: "center" }}
      >
        <Grid item xs={12} style={{ margin: 10 }}>
          <div ref={elem => (this.imgRef = elem)} style={styles}>
            {this.displayImage()}
          </div>
        </Grid>
        <Grid item xs={12}>
          {this.props.store.songClicked && (
            <SongContainer store={this.props.store} />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default PlayerPanel;
