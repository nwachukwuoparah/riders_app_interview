import { StyleSheet, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../constant/theme";
import { textType } from "../../types";
import { font } from "../../utilities/loadFont";


const Typography = ({ type, children, sx, fontfamily }: textType) => {
	const styles = StyleSheet.create({
		text24: {
			fontSize: hp("3%"),
			fontFamily: fontfamily || font.DMSans_700Bold,
			color:colors.white
		},

		text20: {
			fontSize: hp("2.2%"),
			fontFamily: fontfamily || font.DMSans_700Bold,
			color:colors.white
		},

		text16: {
			fontSize: hp("1.8%"),
			fontFamily: fontfamily || font.DMSans_500Medium,
			color:colors.white
		},

		text14: {
			fontSize: hp("1.5%"),
			fontFamily: fontfamily || font.DMSans_400Regular,
			color:colors.white
		},

		text12: {
			fontSize: hp("1.4%"),
			fontFamily: fontfamily || font.DMSans_400Regular,
			color:colors.white
		},
	});

	switch (type) {
		case "text24":
			return <Text style={{ ...styles.text24, ...sx }}>{children}</Text>;
		case "text20":
			return <Text style={{ ...styles.text20, ...sx }}>{children}</Text>;
		case "text16":
			return <Text style={{ ...styles.text16, ...sx }}>{children}</Text>;
		case "text14":
			return <Text style={{ ...styles.text14, ...sx }}>{children}</Text>;
		case "text12":
			return <Text style={{ ...styles.text12, ...sx }}>{children}</Text>;
		default:
			return <></>;
	}
};
export default Typography;
