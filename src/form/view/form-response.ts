export class FormResponse {
	actionUrl: string | null;
	message: string;
	data: any;
	status: string;

	constructor(result: any) {
		this.actionUrl = result?.actionUrl;
		this.message = result.message;
		this.data = result.data;
		this.status = result.status;
	}

	get isSuccess() {
		return this.status === 'success';
	}

	get isError() {
		return this.status === 'error';
	}

	get isProcessing() {
		return this.status === 'processing';
	}
}
