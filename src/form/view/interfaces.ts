export interface FormField {
	name: string;
	value: string;
	type: string;
	disabled: boolean;
	readonly: boolean;
	hidden: boolean;
	ref: HTMLInputElement;
}
