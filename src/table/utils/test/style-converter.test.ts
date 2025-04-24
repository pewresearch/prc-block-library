/**
 * Internal dependencies
 */
import { convertToInline, convertToObject } from '../style-converter';

describe( 'style-converter', () => {
	describe( 'convertToObject', () => {
		it( 'should convert inline style to object', () => {
			expect(
				convertToObject( `
				background: red;
				border-radius: 10px;
				border-right: 1px solid blue;
			` )
			).toStrictEqual( {
				background: 'red',
				borderRadius: '10px',
				borderRight: '1px solid blue',
			} );
		} );
	} );

	describe( 'convertToInline', () => {
		it( 'should convert object to inline', () => {
			expect(
				convertToInline( {
					background: 'red',
					borderRadius: '10px',
					borderRight: '1px solid blue',
				} )
			).toBe( 'background:red;border-radius:10px;border-right:1px solid blue;' );
		} );
	} );
} );
