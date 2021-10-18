import  { connect } from 'mongoose';


export async function startConnection(){
    await connect('mongodb://localhost/backtesis-db', {
        //useNewUrlParser: true,
        
        
    });
    console.log('database is connected');
}