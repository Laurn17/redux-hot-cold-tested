import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from '../actions/actions';

describe('reducer', () => {
    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});

        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.auralStatus).toEqual('');
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

	describe('restartGame', () => {
    	it('Should restart the game', () => {
    		let state = {
	    		guesses: [45, 3, 19],
	            feedback: 'Hot',
	            correctAnswer: 53
    		};
    		const correctAnswer = 98
    		state = reducer(state, restartGame(correctAnswer));

    		expect(state.guesses).toEqual([]);
    		expect(state.feedback).toEqual('Make your guess!');
	        expect(state.auralStatus).toEqual('');
	        expect(state.correctAnswer).toBe(correctAnswer);
    	})
    });

describe('makeGuess', () => {
    	it('should make a number guess', () => {
    		let state = {
	    		guesses: [],
	            feedback: '',
	            correctAnswer: 100
    		};
    		state = reducer(state, makeGuess(50));
    		expect(state.guesses).toEqual([50]);
    		expect(state.feedback).toEqual("You're Ice Cold...");

    		state = reducer(state, makeGuess(70));
			expect(state.guesses).toEqual([50, 70]);
    		expect(state.feedback).toEqual("You're Cold...");

    		state = reducer(state, makeGuess(90));
			expect(state.guesses).toEqual([50, 70, 90]);
    		expect(state.feedback).toEqual("You're Warm.");

    		state = reducer(state, makeGuess(99));
			expect(state.guesses).toEqual([50, 70, 90, 99]);
    		expect(state.feedback).toEqual("You're Hot!");

    		state = reducer(state, makeGuess(100));
			expect(state.guesses).toEqual([50, 70, 90, 99, 100]);
    		expect(state.feedback).toEqual('You got it!');
    	});
    });

    	it('should generate Aural Updates', () => {
    		let state = {
	    		guesses: [45, 9, 83],
	            feedback: "You're Cold...",
	            auralStatus: ''
    		};

    		state = reducer(state, generateAuralUpdate());
    		expect(state.auralStatus).toEqual(
    			`Here's the status of the game right now: You're Cold... You've made 3 guesses. In order of most- to least-recent, they are: 83, 9, 45`
			);
    	});
    });
