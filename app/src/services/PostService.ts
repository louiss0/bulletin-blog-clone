import Post from "@/types/Post";


export default class PostService {


    
    // #url:string

 
     private static subtractPrevPostDateTimestampFromNextPostDateTimestamp(prevPost: Post,
        nextPost: Post) {
        
  
        return new Date(nextPost.pubDate).getTime() - new Date(prevPost.pubDate).getTime();

  }
    
        constructor( ) {
            
        // this.#url=  new URL(, secondHalfOfUrl).href

    }
    
 
    async getLatestPosts() {

        return (await this.getPosts()).sort(PostService.subtractPrevPostDateTimestampFromNextPostDateTimestamp)

    }

    async getPosts() {

        const { posts } = (await fetch(`${import.meta.url}/src/mock-data/posts.json`)
            .then((response) => response.json())
            .catch(console.error)    
        ) as {
            posts: Array<Post>;
    };

        return posts

    }

} 