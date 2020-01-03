>THIS IS ENV MODEL

    DB=mongodb+srv://ADMIN:PASSWORD@PROJECT-e0isv.mongodb.net/DATABASE?retryWrites=true&w=majority
    TOKEN_SECRET=YOURTOKENSECRETKEY

>API ENDPOINTS

    /api/auth/login 
        REQUEST: POST
        Data Model
        {
            "email": "name@domain.com",
            "password": "passwordFild"
        }
    
    /api/auth/create
        REQUEST: POST
        Data Model
        {
            "name": "Your Name",
            "email": "name@domain.com",
            "password": "passwordFild"
        }
        
    /api/post/create
        REQUEST: POST
        {
            "title": "Post Title",
            "description": "Post DFescription"
        }

    /api/post/all
        REQUEST: GET
        {
            "_id": "Post ID",
            "user_id": "Post User ID",
            "title": "Post Title",
            "description": "Post Description",
        }