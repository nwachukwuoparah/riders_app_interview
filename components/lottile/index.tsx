import LottieView from "lottie-react-native";
import Typography from "../typography";
import { Modal, StyleSheet, View } from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../../constant/theme";

export const Lottile = ({
	height,
	width,
	json,
}: {
	height?: string | number;
	width?: string | number;
	json: string;
}) => {
	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
			// width: "100%",
			// display: "flex",
      backgroundColor:"red"
		},
	});
	return (
			<LottieView
				autoPlay
				style={{
					width:20,
					height:20,
          // backgroundColor:"red",
          padding:0
				}}
				source={json}
			/>
	);
};
