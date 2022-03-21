Vue.createApp({
    data() {
        return {
            urlAPIPost: 'https://jsonplaceholder.typicode.com/posts',
            urlAPIUsers:'https://jsonplaceholder.typicode.com/users',
            urlAPIComments: 'https://jsonplaceholder.typicode.com/comments',
            loading : true,
            posts: [
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                },
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                },
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                },
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                },
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }
            ],
            users:[],
            comments: [],
            page: 1,
            maxElementPage: 5,
            totalPages: 0,
            showBodySet: new Set(),
            searchRequest: ""           

        }
    },
    computed:{
        searchResult: function(){
            const result = this.posts.filter(post=>post.title.includes(this.searchRequest));

            this.totalPages = Math.ceil(result.length/this.maxElementPage); //calc the quantity of pages

            return result;
        }

    },
    methods: {
        

        //transitions
        addRealHeight:function(el){
            el.style.height =  `${el.scrollHeight}px`;
        },
        addHeightZero: function(el){
            el.style.height = "0";
        },

        //func for hide full text of post
        hidePostBody: function(id){
            this.showBodySet.delete(id); /*deleting id of opened post from Set of id
                                          for hiding the full post*/
        },

        //func for show full text of post
        showPostBody: function(id){
            this.showBodySet.add(id); //adding to Set id of opened(showed) post 
        },

        //func for button Show more
        toggleBody: function(id){
           /*using method of Set (has) revising if there id of post 
            for hide or show it*/
            switch(this.showBodySet.has(id)){
                case true:
                    this.hidePostBody(id);
                    break;

                case false:
                    this.showPostBody(id);
                    break;
            }       
        },


        //func for to get user name using  user id
        getNameUser: function(id){
                // return this.users.filter(user => id === user.id)[0].name;

                /*
                return this.users.reduce((nombreFinal, user)=>{
                    if(user.id === id) return user.name; 
                }) */


                /*
                for (this.users of user){
                    if *(user.id === id){
                        return user.name;
                    }
                }    
                */

           const user=this.users.filter(user => id === user.id)[0];
           return user.name;
        },

        //func for to get data of comments
        getCommentsRelatedToPost: function(postId){
            const commentList=this.comments.filter(comment => postId === comment.postId);
            // const resultObject={};
            // resultObject.name = comment.name;
            // resultObject.body = comment.body;
            return commentList;
        },
               
        //func for to get data fron API
        getData: async function(url){

            const fetchData= await fetch(url); //get info from API
            const jsonData= await fetchData.json(); //transform info in JSON
            return jsonData; //push info in variable

        },
         // func get all users from API
         getUsers: async function(url){            
            this.users = await this.getData(url); 
        },
         // func get all commentss from API
         getComments: async function(url){            
            this.comments = await this.getData(url); 
        },
        
        //func for create previous page
        prevPage:function () {
            this.page -= 1
            //this.getPosts();
        },

        //func for create next page
        nextPage: function (){
            this.page+=1
            //this.pag=this+1
            //this.pag++

             //this.getPosts();
        },

        //func. create paging
        getPostPag: function(){
            const posStart = (this.page-1)*this.maxElementPage; //start position
            const posFinal = posStart + this.maxElementPage; //final position
            return this.searchResult.slice(posStart,posFinal); //dividing all ifo in pages
        },

        //func. get and show inform.from API 
        getPosts:async function(){
            this.loading = true; //for css
            const fetchPosts= await fetch(this.urlAPIPost); //get info from API
            const jsonPosts= await fetchPosts.json(); //transform info in JSON
            this.posts = jsonPosts; //push info in variable
            this.loading = false;

        }        
    },
    watch:{
        searchRequest: function(){
            this.page=1;

        }
    },
    mounted: function() {
        //constructor
        //Download info
        this.getUsers(this.urlAPIUsers);
        this.getPosts();
        this.getComments(this.urlAPIComments);
        
        

    },
}).mount('#app')