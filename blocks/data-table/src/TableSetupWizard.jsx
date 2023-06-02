/**
 * External Dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import {
	Placeholder,
	Button,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import CSVImport from './CSVImport';

const InputContainer = styled.div`
	display: flex;
`;

const Input = styled.input`
	flex-grow: 1;
	width: 100%;
	margin: 0 10px 10px 0;
`;

const CSVImportContainer = styled.div`
	margin-top: 10px;
	background-color: #f3f3f3;
	padding: 10px;
`;

export default function TableSetupWizard({ onFinish, setAttributes }) {
	const [columnCount, setColumnCount] = useState(0);
	const [columnNames, setColumnNames] = useState([]);
	const [step, setStep] = useState(0);
	const [prevColumnCount, setPrevColumnCount] = useState(0);
	const [prevColumnNames, setPrevColumnNames] = useState([]);

	const handleColumnCountSubmit = (count) => {
		setPrevColumnCount(columnCount);
		setPrevColumnNames(columnNames);
		setColumnCount(count);
	};

	const handleColumnNamesSubmit = (names) => {
		onFinish(names);
	};

	const handleBackButtonClick = () => {
		setColumnCount(prevColumnCount);
		setColumnNames(prevColumnNames.slice(0, prevColumnCount));
		setStep(0);
	};

	const handleInputChange = (index, value) => {
		const newNames = [...columnNames];
		newNames[index] = value;
		setColumnNames(newNames);
	};

	const handleSubmitClick = () => {
		handleColumnNamesSubmit(columnNames);
	};

	return (
		<Placeholder
			label="Table Setup Wizard"
			instructions={
				step === 0
					? 'Enter the number of columns to start with'
					: 'Enter the names of your columns'
			}
			icon={step === 0 ? 'table-row-after' : 'table-col-after'}
		>
			{step === 0 ? (
				<Fragment>
					<NumberControl
						isShiftStepEnabled={true}
						onChange={(val) => handleColumnCountSubmit(val)}
						shiftStep={1}
						value={columnCount}
					/>
					<Button isPrimary onClick={() => setStep(1)}>
						Next
					</Button>
					<CSVImportContainer>
						<CSVImport setAttributes={setAttributes} />
					</CSVImportContainer>
				</Fragment>
			) : (
				<Fragment>
					<InputContainer>
						{Array.from({ length: columnCount }).map((_, index) => (
							<Input
								key={index}
								type="text"
								value={columnNames[index] || ''}
								onChange={(event) =>
									handleInputChange(index, event.target.value)
								}
								tabIndex={index + 1}
							/>
						))}
					</InputContainer>
					<Button isDefault onClick={handleBackButtonClick}>
						Back
					</Button>
					<Button isPrimary onClick={handleSubmitClick}>
						Finish
					</Button>
				</Fragment>
			)}
		</Placeholder>
	);
}
