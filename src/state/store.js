import { observable, action, computed } from "mobx";

const CLIENT_ID = "ggX0UomnLs0VmW7qZnCzw";

class Store {
  @observable searchHistory =
    JSON.parse(localStorage.getItem("songHistory")) || [];
  @observable searchResults = [];
  @observable chosenSong = { title: "yoni" };
  @observable embedResult = {};
  @observable imgRectangle = {};
  @observable transitionComplete = false;
  @observable songClicked = false;
  @observable isTiles = false;
  @observable currResultPage = 1;

  @computed get filteredResults() {
    return this.searchResults.filter(
      (x, i) =>
        i >= 6 * (this.currResultPage - 1) && i < 6 * this.currResultPage
    );
  }

  switchPage(forward) {
    if (forward) {
      if (this.searchResults.length / 6 > this.currResultPage) {
        this.currResultPage += 1;
      }
    } else {
      if (this.currResultPage > 1) {
        this.currResultPage -= 1;
      }
    }
  }

  addToHistory(value) {
    if (this.searchHistory.length >= 5) {
      this.searchHistory.shift();
    }
    this.searchHistory.push(value);
    localStorage.setItem("songHistory", JSON.stringify(this.searchHistory));
  }

  setTransitionComplete(status) {
    this.transitionComplete = status;
  }

  chooseSong = song => {
    this.chosenSong = song;
    this.getSong(song.uri);
  };

  @action.bound
  searchSongs = query => {
    this.searchResults = [];
    this.chosenSong = {};

    window.SC.initialize({
      client_id: CLIENT_ID
    });

    window.SC.get("/tracks", {
      q: query,
      license: "cc-by-sa"
    }).then(this.getTracksSuccess, this.getTracksFailed);
  };

  @action.bound
  getTracksSuccess = tracks => {
    console.log("Before replace");
    this.searchResults = tracks;
    console.log("after replace");
  };

  @action.bound
  getTracksFailed(res) {
    console.log("error", res);
  }

  @action.bound
  getSong = track_url => {
    window.SC.initialize({
      client_id: CLIENT_ID
    });

    window.SC.oEmbed(track_url, { auto_play: true }).then(
      this.getSongSuccess,
      this.getSongFailed
    );
  };

  @action.bound
  getSongSuccess = res => {
    this.embedResult = res;
  };

  @action.bound
  getSongFailed = res => {
    console.log(res);
  };
}

var store = (window.store = new Store());

export default store;
