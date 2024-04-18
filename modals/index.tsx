import { Pressable, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useCallback, useEffect, useMemo, useState } from "react";

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
			style={{
				width: "100%",
				height: hp("100%"),
				backgroundColor: "rgba(0, 0, 0, 0.3)",
				position: "absolute",
				display: open ? "flex" : "none",
			}}
		>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				stackBehavior="replace"
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			
				style={styles.bottomSheet}
			>
				{children}
			</BottomSheetModal>
		</Pressable>
	);
};


const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darken the overlay
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheet: {
    backgroundColor: "#1a1a1a", // Dark background color
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});


export default BottomModal;
