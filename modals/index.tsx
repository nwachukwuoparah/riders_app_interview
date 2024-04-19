import { Pressable, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useCallback, useEffect, useMemo, useState } from "react";
import colors from "../constant/theme";

const BottomModal = ({
	handleClose,
	open,
	children,
	snapMin,
	snapMax,
	bottomSheetModalRef,
}: any) => {
	const snapPoints = useMemo(() => [snapMin, snapMax], []);
	const [checkIndex, setCheckIndex] = useState(-1);

	const openModal = useCallback(() => {
		if (open) {
			bottomSheetModalRef?.current?.present();
		} else {
			bottomSheetModalRef?.current?.dismiss();
		}
	}, [open]);

	useEffect(() => {
		openModal();
	}, [open]);

	const handleSheetChanges = (index: number) => {
		setCheckIndex(-1);
		if (open && index === -1) {
			handleClose();
		}
	};

	const handleOverlayPress = () => {
		bottomSheetModalRef?.current?.dismiss();
	};

	return (
		<Pressable
			onPress={handleOverlayPress}
			style={{ ...styles.overlay, display: open ? "flex" : "none" }}
		>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				stackBehavior="replace"
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				backgroundStyle={styles.bottomSheet}
			>
				{children}
			</BottomSheetModal>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	overlay: {
		width: "100%",
		height: hp("100%"),
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		position: "absolute",
	},
	bottomSheet: { backgroundColor: colors.grey_a },
});

export default BottomModal;
