
import postsJson from "@/mock-data/posts.json"
import Post from "@/types/Post";



export default class PostService {


    
    // #url:string

 
     private static subtractPrevPostDateTimestampFromNextPostDateTimestamp<T extends {pubDate:string}>(prevPost: T,nextPost: T) {
        
  
        return new Date(nextPost.pubDate).getTime() - new Date(prevPost.pubDate).getTime();

  }
    
        constructor( ) {
            

    }
    
 
    getLatestPosts() {

        return this.getPosts().sort(PostService.subtractPrevPostDateTimestampFromNextPostDateTimestamp)

    }

    getPosts() {

            
           
        return postsJson.posts.map( post => {
    
            
            return new Post(
                post.title,
                post.content,
                post.thumbnail,
                post.image,
                post.author,
                post.authorImage,
                post.pubDate,
                post.tag,
            )
    
        })
            
        
    
 
    }

} 