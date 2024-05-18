import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../typography";
import File from "../../assets/svg/file.svg";
import Delete from "../../assets/svg/delete.svg";
import Preview from "../../assets/svg/preview.svg";
import colors from "../../constant/theme";
import { filePreview } from "../../types";

export default function FilePreview({
	handelPreview,
	handelDelete,
	type,
}: filePreview) {
	return (
		<View style={styles.doc_list}>
			<View style={{ flexDirection: "row", gap: 10 }}>
				<File />
				<Typography type="text16" sx={{ color: colors.white }}>
					{type || "	My utility bill"}
				</Typography>
			</View>
			<View style={{ flexDirection: "row", gap: 10 }}>
				<TouchableOpacity onPress={handelPreview}>
					<Preview />
				</TouchableOpacity>
				<TouchableOpacity onPress={handelDelete}>
					<Delete />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	doc_list: {
		width: "100%",
		backgroundColor: colors.grey_a,
		paddingVertical: 15,
		paddingHorizontal: 25,
		borderRadius: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	doc_list_left: {},
	doc_list_right: {},
});
