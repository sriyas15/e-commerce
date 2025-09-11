import bcrypt from 'bcrypt';

const users = [
    {
        name:"Admin user",
        email:"admin@gmail.com",
        password:bcrypt.hashSync('1234567',10),
        isAdmin:true
    },
    {
        name:"riyas",
        email:"sriyas150803@gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:"mohamed",
        email:"riyas@gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    }
]


export default users;