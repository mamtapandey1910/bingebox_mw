import db from '../../db'

export const createUser = async (
    name: string, 
    email: string, 
    password: string, 
    role: string,  
    avatar_url?: string, 
    refresh_token?: string) =>{
         await db.execute(`CREATE TABLE IF NOT EXISTS 
            users(id INT AUTO_INCREMENT PRIMARY KEY ,
            name VARCHAR(50), 
            email VARCHAR(50) UNIQUE NOT NULL, 
            password VARCHAR(20) NOT NULL, 
            role VARCHAR(50) NOT NULL, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
            avatar_url VARCHAR(255), 
            refresh_token varchar(255))`)
 
            const [userid]: any = await db.execute("INSERT INTO users (name, email, password, role) VALUES(?,?,?,?)", [name, email, password, role])

            // console.log('insertedID', userid.insertId)
            const [userRows] : any = await db.execute('SELECT name, email, role FROM users WHERE id=?', [userid.insertId])
            console.log('user', userRows[0])
        return {
            userid: userid.insertId,
            ...userRows[0]
        }
    
}

export const updatedUser = async (userid: string, email?: string, 
    password?: string, 
    role?: string,  
    avatar_url?: string, 
    refresh_token?: string
) =>{

    const field =[]
    const values = []

const updatedUser = await db.execute(``)

}