import React from 'react';
import { PlanModalWrapper } from './styled';

export interface IProps {
	open: boolean;
	onClose: () => void;
	title: string;
}

const Modal: React.FC<IProps> = ({ open, onClose, title, children }) => {
	return (
		<PlanModalWrapper open={open} onClose={onClose}>
			<div className='modal-content'>
				<div>
					<p className='modal-title'>{title}</p>
				</div>
				<div className='modal-body'>{children}</div>
			</div>
		</PlanModalWrapper>
	);
};

export default Modal;
