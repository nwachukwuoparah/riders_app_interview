import React, { useEffect } from "react";
import BottomModal from "./index";
import { Image, Platform, StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import {
	InnerWrapper,
} from "../components/container";
import CustButton from "../components/button";
import {
	useQueryClient,
} from "@tanstack/react-query";
import { handleError } from "../helpers";
import LoadingComponent from "../components/loading";

export default function PreviewModal({
	previewRef,
	close,
	modalOpen,
	image
}: any) {
	const queryClient = useQueryClient();
	useEffect(() => {
		console.log(image);
	}, [image])
	return (
		<BottomModal
			bottomSheetModalRef={previewRef}
			open={modalOpen}
			handleClose={close}
			snapMin="25%"
			snapMax="100%"
			sx={{ backgroundColor: colors.black }}
		>
			<InnerWrapper
				sx={{
					flex: 1,
					width: "100%",
					paddingHorizontal: "5%",
					gap: 50,
				}}
			>

				<View>
					<CustButton type="back" onPress={close} color={colors.white} />
					<Typography type="text24">
						Preview document
					</Typography>
				</View>
				<View style={styles.imageCont}>
					<Image
						source={{ uri: image }}
						style={{
							width: "100%",
							height: "100%",
							borderRadius: 10,
							alignSelf: "center",
						}}
						resizeMode="cover"
					/>
				</View>
			</InnerWrapper>
		</BottomModal>
	);
}

const styles = StyleSheet.create({
	top: {
		width: "100%",
		backgroundColor: colors.grey_a,
		gap: 5,
	},
	imageCont: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.black_1,
		// padding: 15,
		width: "100%",
		height: "70%",
		borderRadius: 20
	},
});
