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

        try {
            
            const res = await fetch(`${import.meta.env.VITE_SITE_HOST}/src/mock-data/posts.json`)
                
            const json = await res.json()

            return json.posts
            
        
    
        } catch (error) {
            console.error(error)

            return[]
        }

    }

} 