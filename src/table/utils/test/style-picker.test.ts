/**
 * Internal dependencies
 */
import {
	pickBorderColor,
	pickBorderRadius,
	pickBorderSpacing,
	pickBorderWidth,
	pickPadding,
} from '../style-picker';

describe( 'style-picker', () => {
	describe( 'pickPadding', () => {
		it( 'should separate shorthand prop', () => {
			expect( pickPadding( { padding: '10px' } ) ).toStrictEqual( {
				top: '10px',
				right: '10px',
				bottom: '10px',
				left: '10px',
			} );
		} );

		it( 'should separate vertical and horizontal', () => {
			expect( pickPadding( { padding: '30px 10px' } ) ).toStrictEqual( {
				top: '30px',
				right: '10px',
				bottom: '30px',
				left: '10px',
			} );
		} );

		it( 'should split vertical and horizontal and side', () => {
			expect( pickPadding( { padding: '30px 10px 20px' } ) ).toStrictEqual( {
				top: '30px',
				right: '10px',
				bottom: '20px',
				left: '10px',
			} );
		} );

		it( 'should split four direction', () => {
			expect( pickPadding( { padding: '30px 10px 20px 40px' } ) ).toStrictEqual( {
				top: '30px',
				right: '10px',
				bottom: '20px',
				left: '40px',
			} );
		} );
	} );

	describe( 'pickBorderWidth', () => {
		it( 'should separate shorthand prop', () => {
			expect( pickBorderWidth( { borderWidth: '10px' } ) ).toStrictEqual( {
				bottom: '10px',
				left: '10px',
				right: '10px',
				top: '10px',
			} );
		} );

		it( 'should separate vertical and horizontal', () => {
			expect( pickBorderWidth( { borderWidth: '30px 10px' } ) ).toStrictEqual( {
				top: '30px',
				right: '10px',
				bottom: '30px',
				left: '10px',
			} );
		} );

		it( 'should split vertical and horizontal and side', () => {
			expect( pickBorderWidth( { borderWidth: '30px 10px 20px' } ) ).toStrictEqual( {
				top: '30px',
				right: '10px',
				bottom: '20px',
				left: '10px',
			} );
		} );

		it( 'should split four direction', () => {
			expect( pickBorderWidth( { borderWidth: '30px 10px 20px 40px' } ) ).toStrictEqual( {
				top: '30px',
				right: '10px',
				bottom: '20px',
				left: '40px',
			} );
		} );
	} );

	describe( 'pickBorderColor', () => {
		it( 'should separate shorthand prop', () => {
			expect( pickBorderColor( { borderColor: 'red' } ) ).toStrictEqual( {
				top: 'red',
				right: 'red',
				bottom: 'red',
				left: 'red',
			} );
		} );

		it( 'should separate vertical and horizontal', () => {
			expect( pickBorderColor( { borderColor: 'red #f015ca' } ) ).toStrictEqual( {
				top: 'red',
				right: '#f015ca',
				bottom: 'red',
				left: '#f015ca',
			} );
		} );

		it( 'should split vertical and horizontal and side', () => {
			expect(
				pickBorderColor( {
					borderColor: 'red rgb(240,30,50,.7) green',
				} )
			).toStrictEqual( {
				top: 'red',
				right: 'rgb(240,30,50,.7)',
				bottom: 'green',
				left: 'rgb(240,30,50,.7)',
			} );
		} );

		it( 'should split four direction', () => {
			expect( pickBorderColor( { borderColor: 'red yellow green blue' } ) ).toStrictEqual( {
				top: 'red',
				right: 'yellow',
				bottom: 'green',
				left: 'blue',
			} );
		} );
	} );

	describe( 'pickBorderRadius', () => {
		it( 'should separate shorthand prop', () => {
			expect( pickBorderRadius( { borderRadius: '10px' } ) ).toStrictEqual( {
				topLeft: '10px',
				topRight: '10px',
				bottomRight: '10px',
				bottomLeft: '10px',
			} );
		} );

		it( 'should separate two value', () => {
			expect( pickBorderRadius( { borderRadius: '10px 5%' } ) ).toStrictEqual( {
				topLeft: '10px',
				topRight: '5%',
				bottomRight: '10px',
				bottomLeft: '5%',
			} );
		} );

		it( 'should split three value', () => {
			expect( pickBorderRadius( { borderRadius: '2px 4px 2px' } ) ).toStrictEqual( {
				topLeft: '2px',
				topRight: '4px',
				bottomRight: '2px',
				bottomLeft: '4px',
			} );
		} );

		it( 'should split four value', () => {
			expect( pickBorderRadius( { borderRadius: '1px 0 3px 4px' } ) ).toStrictEqual( {
				topLeft: '1px',
				topRight: '0',
				bottomRight: '3px',
				bottomLeft: '4px',
			} );
		} );
	} );

	describe( 'pickBorderSpacing', () => {
		it( 'should split value', () => {
			expect( pickBorderSpacing( { borderSpacing: '2px' } ) ).toStrictEqual( {
				vertical: '2px',
				horizontal: '2px',
			} );
		} );

		it( 'should parsed correctly', () => {
			expect( pickBorderSpacing( { borderSpacing: '1rem 2em' } ) ).toStrictEqual( {
				vertical: '2em',
				horizontal: '1rem',
			} );
		} );
	} );
} );
