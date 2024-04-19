import {
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	View,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constant/theme";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const Container = ({ children, sx }: any) => {
	const styles = StyleSheet.create({
		container: {
			width: wp("100%"),
			flex: 1,
			backgroundColor: colors.black_1,
			alignItems: "center",
		},
	});

	return (
		<SafeAreaView style={{ ...styles.container, ...sx }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<>{children}</>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export const InnerWrapper = ({ children, sx }: any) => {
	const styles = StyleSheet.create({
		innerWrapper: {
			width: "90%",
			paddingTop: "5%",
		},
	});

	return <View style={{ ...styles.innerWrapper, ...sx }}>{children}</View>;
};

export const KeyboardView = ({ children, sx }: any) => {
	const styles = StyleSheet.create({
		wrapper: {
			width: "100%",
			// height: "100%",
			alignItems: "center",
		},
	});

	return (
		<KeyboardAvoidingView
			style={{ ...styles.wrapper, ...sx }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{children}
		</KeyboardAvoidingView>
	);
};

export const ScrollContainer = ({
	children,
	sx,
	horizontal,
	innerStyles,
	refreshControl,
	keyboardShouldPersistTaps,
}: any) => {
	const styles = StyleSheet.create({
		wraper: {
			height: "100%",
			width: "100%",
			...sx,
		},
	});

	return (
		<ScrollView
			keyboardShouldPersistTaps={keyboardShouldPersistTaps}
			refreshControl={refreshControl}
			contentContainerStyle={{ ...innerStyles }}
			showsVerticalScrollIndicator={false}
			style={styles.wraper}
			horizontal={horizontal}
		>
			{children}
		</ScrollView>
	);
};
