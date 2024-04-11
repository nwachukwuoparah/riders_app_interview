import React, {
	ReactNode,
	Children,
	FunctionComponent,
	ReactElement,
} from "react";

interface ShowProps {
	children: ReactNode;
}

interface WhenProps {
	isTrue: boolean;
	children: ReactNode;
}

interface ElseProps {
	render?: ReactNode;
	children: ReactNode;
}

const Show: FunctionComponent<ShowProps> & {
	When: FunctionComponent<WhenProps>;
	Else: FunctionComponent<ElseProps>;
} = (props) => {
	let when: ReactNode | null = null;
	let otherwise: ReactNode | null = null;

	Children.forEach(props.children, (child) => {
		if (React.isValidElement(child) && child.props.isTrue === undefined) {
			otherwise = child;
		} else if (
			!when &&
			React.isValidElement(child) &&
			(child as ReactElement<WhenProps>).props.isTrue === true
		) {
			when = child;
		}
	});

	return when || otherwise;
};

Show.When = ({ isTrue, children }) => (isTrue ? (children as ReactNode) : null);
Show.Else = ({ render, children }) => render || (children as ReactNode);

export default Show;
