import React from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import youtube_details from "../apis/youtube_details";


function failureCallback(error) {
  console.log(error);
}
class App extends React.Component {
  state = { videos: [], selectedVideo: null, videoDetails: [] };

  //componentDidMount() {
  //  this.onTermSubmit('classical music')
  //}
  successCallback(result) {
    console.log(result.data.items[0].contentDetails['duration']);
  };

  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
      },
    });

    const details = response.data.items.map(async (item) => {
      const response_detail = await youtube_details.get("/videos", {
        params: {
          id: item.id.videoId,
        },
      }).then(this.successCallback, failureCallback);
      return response_detail
    }); 

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
      videoDetails: details,
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmitParent={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
                details={this.state.videoDetails}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
