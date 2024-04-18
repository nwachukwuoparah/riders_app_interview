import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const splashVideo = require("../../assets/splash_video.mp4");
const Splash = () => {
	const video = useRef<any>();
	const [status, setstatus] = useState<AVPlaybackStatus>();
	return (
		<Video
			ref={video}
			style={styles.video}
			source={splashVideo}
			resizeMode={ResizeMode.COVER}
			shouldPlay
			// isLooping
			// useNativeControls
			onPlaybackStatusUpdate={(videoStatus) => setstatus(videoStatus)}
		/>
	);
};

export default Splash;

const styles = StyleSheet.create({
	video: {
		width: wp("100%"),
		flex:1
	},
});
