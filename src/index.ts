import app from './app'
import './database';
require ('dotenv').config();

app.listen(app.get('port'));
console.log(`Listening on http://localhost:${app.get('port')}`);