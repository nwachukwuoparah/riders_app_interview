import LottieView from "lottie-react-native";
import Typography from "../typography";
import { Modal, StyleSheet, View } from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../../constant/theme";

const LoadingComponent = ({
	displayLoadingComponent,
}: {
	displayLoadingComponent: boolean;
}) => {
	const styles = StyleSheet.create({
		container: {
			position: "absolute",
			alignItems: "center",
			justifyContent: "center",
			width: wp("100%"),
			height: hp("100%"),
			backgroundColor: "rgba(0, 0, 0, 0.05)",
			display: "flex",
		},
	});
	return (
		<Modal transparent visible={displayLoadingComponent}>
			<View style={styles.container}>
				<LottieView
					autoPlay
					style={{
						width: 250,
						height: 250,
						// backgroundColor: '#eee',
					}}
					source={require("../../assets/lottile/loader.json")}
				/>
			</View>
		</Modal>
	);
};

export const Loading = ({ title }: { title: string }) => {
	const styles = StyleSheet.create({
		container: {
			position: "absolute",
			alignItems: "center",
			width: "100%",
			display: "flex",
			gap: 10,
			paddingTop: 20,
		},
	});
	return (
		<View style={styles.container}>
			<LottieView
				autoPlay
				style={{
					width: 300,
					height: 300,
					// backgroundColor: '#eee',
					marginTop: 30,
				}}
				source={require("../../assets/lottile/loader.json")}
			/>
			<Typography type="text16" sx={{ color: colors.white }}>
				{title}....
			</Typography>
		</View>
	);
};

export default LoadingComponent;