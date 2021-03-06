import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/session-content-dailymotion.scss';
import { connect } from 'react-redux';
import { updateSession } from 'actions/actions';
import Loader2 from 'components/Loader2/loader2';

class SessionContentDailymotion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dmsearch: '',
			videos: [],
			videoPicked: false
		};
		this.socket = this.props.socket;
		this.DMapi =
			'https://api.dailymotion.com/videos/?fields=thumbnail_medium_url,id,title&page=1&limit=50&search=';
		this.DMurl = 'https://www.dailymotion.com/embed/video/';
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	searchVideos = (e) => {
		if (e.key === 'Enter') {
      if(this.state.videoPicked===true){
        this.setState({
          playingVideo: '',
          videoPicked: false},()=>{
            fetch(this.DMapi + this.state.dmsearch.replace(' ', '+')).then((res) => res.json()).then((data) => {
              this.props.updateSession({ dailymotionList: data.list });
            });
          })
      } else {
        fetch(this.DMapi +  this.state.dmsearch.replace(' ', '+')).then((res) => res.json()).then((data) => {
          this.props.updateSession({ dailymotionList: data.list });
        });
      }   
		}
	};
	componentDidUpdate = (prevProps) => {
		let prop = this.props.session;
		console.log('prev', prevProps)
    if(prop){
      if (prop.videoId.id && prop.videoId.id !== prevProps.session.videoId.id && prop.videoId.id.length > 0) {
        this.showVideo(prop.videoId.id+'?autoplay=1');
      }
    }
		/* if(prop.playState.requestingTime!==prevProps.session.playState.requestingTime){	
			this.props.sendVideoCurrentTime(this.getVideosCurrentTime(),()=>{
				console.log('sending back')
				prop.playState.requestingTime = false;
				this.props.updateSession({playState:prop.playState});
			})	
		} */
	};
	
	componentDidMount = () => {
		let prop = this.props.session;
		/* if(prop.creatingSession===false){
			this.props.askForVideoCurrentTime()
    } */
    if(prop){
      if(prop.videoId.id && prop.videoId.platfrom==='dailymotion' && prop.videoId.id && prop.videoId.id.length>0 && prop.playing) {
        this.showVideo(prop.videoId.id);
      }
    }
		if (this.props.session.category && this.state.videos.length === 0) {
			fetch(this.DMapi + prop.category + '+' + prop.subCategory).then((res) => res.json()).then((data) => {
				if (data.list) {
						this.rendered = true;
						this.props.updateSession({ dailymotionList: data.list });
				}
			});
		}
	};
	hideVideo = () => {
		if (this.state.videoPicked) {
			this.YTPlayer = null;
			if (this.props.session.admin === this.socket.id) {
				this.props.unpickThisVideo({
					activePlatform: 'dailymotion',
					videoId: {},
					playing: false,				
				});
			}
			this.setState({
				videoPicked: false
			});
		}
	};
	showVideo = (videoId) => {
		this.setState({
			playingVideo: videoId,
			videoPicked: true
		});
	};
	sendPickedVideo = (videoId) => {
		console.log('picking', videoId)
		if (this.props.session.admin === this.socket.id) {
			this.props.sendVideoSignal({
				activePlatform: 'dailymotion',
				videoId: {id:videoId, platform:'dailymotion'},
				playing: true,
				requestingTime: false,
			
			});
		}
	};
	

	displayVideoSnippets = () => {
		let dailymotionList = this.props.session.dailymotionList === null ? [] : this.props.session.dailymotionList;
		if (this.props.session) {
			if(dailymotionList.length){
				return dailymotionList.map((snippet, ind) => {
					return (
						<div onClick={() => this.sendPickedVideo(snippet.id)} key={ind} className="DMvidSnippet">
							{/* <div  className="videoSignalBtn"></div> */}
							<img className="DMsnippetImg" src={snippet.thumbnail_medium_url} />
							<div className="DMchannelTitle">{snippet.title}</div>
						</div>
					);
				});
			}	
		}
	};

	renderHeader = () => {
		return (
			<div className="DMdiscContentHeader">
				<div onClick={() => this.hideVideo()} id="DMcontentBack" className="DMdiscHeaderIcon" />
				<div id="DMcontentDice" className="DMdiscHeaderIcon" />
				<div className="DMdiscHeaderSearch">
					<input
						onKeyDown={this.searchVideos}
						id={this.props.contentType}
						className="DMsearchBar"
						name="dmsearch"
						value={this.state.dmsearch}
						onChange={this.handleInput}
					/>
					<div id="DMdiscSearchIcon" className="DMdiscHeaderIcon" />
				</div>
			</div>
		);
	};

	render() {
		//if (this.props.session.isAdmin) {
		if (this.state.videoPicked) {
			return (
				<div className="DMdiscContent">
					<div className="DMdiscContentViewer">
						{this.renderHeader()}
						<div style={{ marginTop: '5px' }} className="DMvideoFrameWrap">
							<div id="DMPlayer" />
							{
								<iframe
									id="DMiFrame"
									height="100%"
									width="100%"
									className="DMvideoFrame"
									allow="autoplay; encrypted-media"
									src={this.DMurl + this.state.playingVideo}
								/>
							}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="DMdiscContent">
            {this.renderHeader()}
					<div className="DMdiscContentPreview">
					{this.props.session.dailymotionList.length > 0 ? this.displayVideoSnippets():
						<Loader2 color="#00B6FB" />}</div>
				</div>
			);
		}
		/* } else {
			return (
				<div className="discContent">
					<div className="discContentViewer">
						<div style={{ marginTop: '40px' }} className="videoFrameWrap">
							<iframe
								style={{ display: 'block' }}
								height="100%"
								width="100%"
								className="videoFrame"
								allow="autoplay"
								src={this.YTurl + 'ZA106wrMUe4'}
							/>
						</div>
					</div>
				</div>
			);
		} */
	}
}

SessionContentDailymotion.propTypes = {
	contentType: PropTypes.object,
	region: PropTypes.string,
	session: PropTypes.object,
	videoUrl: PropTypes.string,
	updateSession: PropTypes.func,
	sendVideoSignal: PropTypes.func,
	unpickThisVideo: PropTypes.func,
	saveYoutubeListRedis: PropTypes.func,
	askForVideoCurrentTime: PropTypes.func,
	sendVideoCurrentTime: PropTypes.func,
	socket: PropTypes.object
};
function stateToProps(state) {
	return {
		session: state.session
	};
}
export default connect(stateToProps, { updateSession })(SessionContentDailymotion);

