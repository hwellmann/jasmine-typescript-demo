/// <reference path="./CustomMatchers.d.ts"/>

import { Player } from './Player';
import { Song } from './Song';

import { customMatchers } from './CustomMatchers';

describe('Player', function () {
    let player: Player;
    let song: Song;

    beforeEach(() => {
        player = new Player();
        song = new Song();
    });

    it('should be able to play a Song', () => {
        player.play(song);
        expect(player.currentlyPlayingSong).toEqual(song);

        // demonstrates use of custom matcher
        expect(player).toBePlaying(song);
    });

    describe('when song has been paused', () => {
        beforeEach(function () {
            player.play(song);
            player.pause();
        });

        it('should indicate that the song is currently paused', () => {
            expect(player.isPlaying).toBeFalsy();

            // demonstrates use of 'not' with a custom matcher
            expect(player).not.toBePlaying(song);
        });

        it('should be possible to resume', () => {
            player.resume();
            expect(player.isPlaying).toBeTruthy();
            expect(player.currentlyPlayingSong).toEqual(song);
        });
    });

    // demonstrates use of spies to intercept and test method calls
    it('tells the current song if the user has made it a favorite', () => {
        spyOn(song, 'persistFavoriteStatus');

        player.play(song);
        player.makeFavorite();

        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });

    // demonstrates use of expected exceptions
    describe('#resume', function () {
        it('should throw an exception if song is already playing', () => {
            player.play(song);
            expect(() => player.resume()).toThrowError('song is already playing');
        });
    });
});
