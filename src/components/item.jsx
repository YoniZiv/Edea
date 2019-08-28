import React, { Component } from "react";
import "../App.css";
import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";

@observer
class Item extends Component {
  state = { isClicked: false, rectX: 0, rectY: 0 };
  transitionProps = {};

  componentDidMount() {
    this.itemRef.addEventListener(
      "transitionend",
      e => {
        this.itemRef.style.display = "none";
        this.props.store.setTransitionComplete(true);
      },
      { once: true }
    );
    this.updateTransitionProps();
  }

  updateTransitionProps = () => {
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    this.transitionProps = {
      transform: `translate( ${this.props.store.imgRectangle.x -
        rect.x}px, ${this.props.store.imgRectangle.y - rect.y}px ) `
    };
  };

  itemClicked = () => {
    this.updateTransitionProps();
    this.props.store.chooseSong(this.props.item);
    this.setState({
      isClicked: true
    });
    this.props.store.setTransitionComplete(false);
    this.props.store.songClicked = false;
  };

  render() {
    return (
      <Grid
        item
        xs={this.props.store.isTiles ? 3 : 12}
        ref={elem => (this.itemRef = elem)}
        className={this.state.isClicked ? "item clicked" : "item"}
        onClick={this.itemClicked}
        style={this.state.isClicked ? this.transitionProps : {}}
      >
        {this.props.item.title}
      </Grid>
    );
  }
}

export default Item;
