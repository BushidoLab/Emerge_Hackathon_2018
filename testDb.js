const db = require('./lib/db');

(async function() {

    console.log("ayyyyy");
    const users = await db.Person.get('asdfgh')
    console.log(users);
    console.log("ayyyyy");
})()
