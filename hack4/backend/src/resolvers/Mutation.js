const Mutation = {
    insertPeople(parent, {data}, { db, pubsub }, info){
        try{
            console.log(data.length)
            for(let i = 0; i < data.length; i++){
                const index = db.people.findIndex((person)=>person.ssn === data[i].ssn)
                if(index === -1){
                    db.people.push(data[i])
                }
                else{
                    db.people[index] = data[i]
                }
            }
            pubsub.publish(`people`, {people: db.people });
            return true;
        }
        catch{
            return false;
        }
    }
}
export default Mutation