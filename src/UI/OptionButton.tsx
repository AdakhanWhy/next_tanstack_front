import { AddButtonProps } from '@/types/IAddBlock';

const OptionButton = ({ id, icon, func }: AddButtonProps) => {
	return <button onClick={() => func(id)}>{icon}</button>;
};

export default OptionButton;
