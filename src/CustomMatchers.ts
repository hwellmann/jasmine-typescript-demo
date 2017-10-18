export const customMatchers: jasmine.CustomMatcherFactories = {
    toBePlaying(util: jasmine.MatchersUtil,
        customEqualityTesters: jasmine.CustomEqualityTester[]): jasmine.CustomMatcher {

        return {
            compare(actual: any, expected: any): jasmine.CustomMatcherResult {
                const player = actual;
                return {
                    pass: player.currentlyPlayingSong === expected && player.isPlaying
                };
            }
        };
    }
};

beforeEach(() => {
    jasmine.addMatchers(customMatchers);
});

