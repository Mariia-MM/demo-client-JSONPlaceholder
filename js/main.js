Vue.createApp({
    data() {
        return {
            urlAPIPost: 'https://jsonplaceholder.typicode.com/posts',
            urlAPIUsers:'https://jsonplaceholder.typicode.com/users',
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
            page: 1,
            maxElementPage: 5,
            totalPages: 0,
           

        }
    },
    methods: {
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

        // func get all users from API
        getUsers: async function(){
            const fetchUsers= await fetch(this.urlAPIUsers); //get info from API
            const jsonUsers= await fetchUsers.json(); //transform info in JSON
            this.users = jsonUsers; //saving info about users

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
            return this.posts.slice(posStart,posFinal); //dividing all ifo in pages
        },

        //func. get and show inform.from API 
        getPosts:async function(){
            this.loading = true; //for css
            const fetchPosts= await fetch(this.urlAPIPost); //get info from API
            const jsonPosts= await fetchPosts.json(); //transform info in JSON
            this.posts = jsonPosts; //push info in variable
            this.loading = false;
            this.totalPages = Math.ceil(this.posts.length/this.maxElementPage); //calc the quantity of pages

        }        
    },
    mounted: function() {
        //constructor
        //Download info
        this.getUsers();
        this.getPosts();
        
        

    },
}).mount('#app')