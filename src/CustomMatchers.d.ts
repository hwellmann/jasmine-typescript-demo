declare class Song {
}

declare namespace jasmine {

    interface Matchers<T> {
        toBePlaying(song: Song): boolean;
    }
}

