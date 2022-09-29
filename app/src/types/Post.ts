


type Category = "sports"| "entertainment"| "business" |  "finance"| "travel"


export default class Post{


    constructor(
        public readonly title:string,
        public readonly content:string,
        public readonly author:string,
        public readonly authorImage:string,
        public readonly pubDate: string,
        public readonly tag: Category,
        public readonly id = Symbol()
    ) {
    

    }

}