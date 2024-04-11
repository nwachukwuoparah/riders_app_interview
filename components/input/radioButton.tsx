import { useRef } from "react";
import { RadioButnProps } from "../../types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableOpacity, View } from "react-native";

const RadioButton = ({
	value,
	size,
	selectedColor,
	color,
	onChange,
}: RadioButnProps) => {
	const currentSize = useRef<number>(size || hp("3%")).current;
	return (
		<TouchableOpacity
			onPress={() => onChange && onChange(false)}
			style={{
				width: currentSize,
				height: currentSize,
				borderRadius: 100,
				justifyContent: "center",
				alignItems: "center",
				borderColor: value ? selectedColor : color,
				borderWidth: 2,
			}}
		>
			{value && (
				<View
					style={{
						width: Math.round(currentSize / 2),
						height: Math.round(currentSize / 2),
						borderRadius: 100,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: value ? selectedColor : color,
					}}
				/>
			)}
		</TouchableOpacity>
	);
};

export default RadioButton;
