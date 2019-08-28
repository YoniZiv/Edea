import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class SongContainer extends Component {
  state = {};
  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html:
            this.props.store.songClicked && this.props.store.embedResult
              ? this.props.store.embedResult.html
              : ""
        }}
      />
    );
  }
}

export default SongContainer;
