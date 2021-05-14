import React, { useRef, useState } from "react";

interface Person {
	firstName: string;
	lastName: string;
}

interface Props {
	text: string;
	ok?: boolean;
	i?: number;
	fn?: (bob: string) => string;
	person: Person;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/* interface TextNode {
	text: string;
} */

const TextField: React.FC<Props> = ({ handleChange }) => {
	/* const [count, setCount] = useState<number | null | undefined | string>(5);
	const [anotherState, setAnotherState] = useState<TextNode>({
		text: "Julie",
  });
  
	setCount(undefined); */

	const inputRef = useRef<HTMLInputElement>(null);
	const divRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={divRef}>
			Yo
			<input ref={inputRef} onChange={handleChange} />
		</div>
	);
};

export default TextField;
