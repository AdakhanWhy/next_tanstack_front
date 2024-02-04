import { ReactNode } from 'react';

export interface AddButtonProps {
	id: number;
	icon: ReactNode;
	func: (id: number) => void;
}

export interface AddInputProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}
