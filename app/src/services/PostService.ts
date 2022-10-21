import Post from "@/types/Post";


export default class PostService {


    
    #url:string

 
    private static subtractPrevPostDateTimestampFromNextPostDateTimestamp(prevPost: Post,
        nextPost: Post) {
        
  
        return new Date(nextPost.pubDate).getTime() - new Date(prevPost.pubDate).getTime();

  }
    
        


        constructor(secondHalfOfUrl:string, ) {
            
        this.#url=  new URL("/src/mock-data/posts.json", secondHalfOfUrl).href

    }
    
 

    async getPosts() {

        const { posts } = (await fetch(this.#url).then((response) => response.json())) as {
  posts: Array<Post>;
    };

        return posts.sort(PostService.subtractPrevPostDateTimestampFromNextPostDateTimestamp)

    }

} 