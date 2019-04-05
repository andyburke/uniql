'use strict';

const uniql = require( '../src/parser.js' );

describe( 'comparisons', () => {
    test( '<', () => {
        expect( uniql( 'foo < 10' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ '10' ],
                'type': 'NUMBER'
            } ],
            'type': '<'
        } );
    } );

    test( '<=', () => {
        expect( uniql( 'foo <= 10' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ '10' ],
                'type': 'NUMBER'
            } ],
            'type': '<='
        } );
    } );

    test( '>', () => {
        expect( uniql( 'foo > 10' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ '10' ],
                'type': 'NUMBER'
            } ],
            'type': '>'
        } );
    } );

    test( '>=', () => {
        expect( uniql( 'foo >= 10' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ '10' ],
                'type': 'NUMBER'
            } ],
            'type': '>='
        } );
    } );

    test( '==', () => {
        expect( uniql( 'foo == 10' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ '10' ],
                'type': 'NUMBER'
            } ],
            'type': '=='
        } );
    } );

    test( '!=', () => {
        expect( uniql( 'foo != 10' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ '10' ],
                'type': 'NUMBER'
            } ],
            'type': '!='
        } );
    } );

    test( '~=', () => {
        expect( uniql( 'foo ~= "hi"' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ 'hi' ],
                'type': 'STRING'
            } ],
            'type': 'MATCH'
        } );
    } );
} );

describe( 'logical operators', () => {
    test( 'and', () => {
        expect( uniql( 'foo and bar' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ 'bar' ],
                'type': 'SYMBOL'
            } ],
            'type': '&&'
        } );
    } );
    
    test( 'or', () => {
        expect( uniql( 'foo or bar' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, {
                'arguments': [ 'bar' ],
                'type': 'SYMBOL'
            } ],
            'type': '||'
        } );
    } );

    test( 'in', () => {
        expect( uniql( '"foo" in [ "foo", "bar", "baz", 1, 2, 3 ]' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'STRING'
            }, {
                'arguments': [ {
                    'arguments': [ 'foo' ],
                    'type': 'STRING'
                }, {
                    'arguments': [ 'bar' ],
                    'type': 'STRING'
                }, {
                    'arguments': [ 'baz' ],
                    'type': 'STRING'
                }, {
                    'arguments': [ '1' ],
                    'type': 'NUMBER'    
                }, {
                    'arguments': [ '2' ],
                    'type': 'NUMBER'
                }, {
                    'arguments': [ '3' ],
                    'type': 'NUMBER'
                } ],
                'type': 'ARRAY'
            } ],
            'type': 'IN'
        } );
    } );

    test( 'not', () => {
        expect( uniql( 'foo and not bar' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            }, { 
                'arguments': [ {
                    'arguments': [ 'bar' ],
                    'type': 'SYMBOL'
                } ],
                'type': '!'
            } ],
            'type': '&&'
        } );
    } );
} );

describe( 'unary minus', () => {
    test( '-SYMBOL is unary minus', () => {
        expect( uniql( '-foo' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            } ],
            'type': '-'
        } );
    } );
    
    test( '-NUMBER is number', () => {
        expect( uniql( '-10' ) ).toEqual( {
            'arguments': [ '-10' ],
            'type': 'NUMBER'
        } );
    } );
} );

describe( 'expressions', () => {
    test( '( foo )', () => {
        expect( uniql( '( foo )' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ 'foo' ],
                'type': 'SYMBOL'
            } ],
            'type': 'EXPRESSION'
        } );
    } );

    test( '( foo and bar )', () => {
        expect( uniql( '( foo and bar )' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ {
                    'arguments': [ 'foo' ],
                    'type': 'SYMBOL'
                }, {
                    'arguments': [ 'bar' ],
                    'type': 'SYMBOL'
                } ],
                'type': '&&'
            } ],
            'type': 'EXPRESSION'
        } );
    } );

    test( '( foo and bar ) or baz', () => {
        expect( uniql( '( foo and bar ) or baz' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ {
                    'arguments': [ {
                        'arguments': [ 'foo' ],
                        'type': 'SYMBOL'
                    }, {
                        'arguments': [ 'bar' ],
                        'type': 'SYMBOL'
                    } ],
                    'type': '&&'
                } ],
                'type': 'EXPRESSION'
            }, {
                'arguments': [ 'baz' ],
                'type': 'SYMBOL'
            } ],
            type: '||'
        } );
    } );

    test( '( ( foo and bar ) or baz )', () => {
        expect( uniql( '( ( foo and bar ) or baz )' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ {
                    'arguments': [ {
                        'arguments': [ {
                            'arguments': [ 'foo' ],
                            'type': 'SYMBOL'
                        }, {
                            'arguments': [ 'bar' ],
                            'type': 'SYMBOL'
                        } ],
                        'type': '&&'
                    } ],
                    'type': 'EXPRESSION'
                }, {
                    'arguments': [ 'baz' ],
                    'type': 'SYMBOL'
                } ],
                type: '||'
            } ],
            type: 'EXPRESSION'
        } );
    } );

    test( '( ( foo and bar ) or ( baz and yak ) )', () => {
        expect( uniql( '( ( foo and bar ) or ( baz and yak ) )' ) ).toEqual( {
            'arguments': [ {
                'arguments': [ {
                    'arguments': [ {
                        'arguments': [ {
                            'arguments': [ 'foo' ],
                            'type': 'SYMBOL'
                        }, {
                            'arguments': [ 'bar' ],
                            'type': 'SYMBOL'
                        } ],
                        'type': '&&'
                    } ],
                    'type': 'EXPRESSION'
                }, {
                    'arguments': [ {
                        'arguments': [ {
                            'arguments': [ 'baz' ],
                            'type': 'SYMBOL'
                        }, {
                            'arguments': [ 'yak' ],
                            'type': 'SYMBOL'
                        } ],
                        'type': '&&'
                    } ],
                    'type': 'EXPRESSION'
                } ],
                type: '||'
            } ],
            type: 'EXPRESSION'
        } );
    } );

} );