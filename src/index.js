import React, { Component } from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyANJzPSv_EG-spc1KuKOxcjro32sSBnJm4';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }


    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })
        });
    }


    render() {

        const videosearch=_.debounce((term)=>{this.videoSearch(term)},300);
        return (
            <div >
                <SearchBar onSearchTermChange={term=>this.videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector('.container'));