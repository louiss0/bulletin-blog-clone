


export default class Post{


    constructor(
        public readonly title:string,
        public readonly content:string,
        public readonly thumbnail: string,
        public readonly image: string,
        public readonly author: string,
        public readonly authorImage:string,
        public readonly pubDate: string,
        public readonly tag: string,
        public readonly id = Symbol()
    ) {
    

    }

}