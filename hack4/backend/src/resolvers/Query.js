const Query = {
    statsCount(parent, {severity, locationKeywords}, { db, pubsub }, info){
        try{
            console.log('statsCount', severity, locationKeywords)
            if(!severity) severity = -1
            const ret = [];
            for(let i = 0; i < locationKeywords.length; i++){
                const peoples = db.people.filter((person)=>person.location.description.includes(locationKeywords[i]) && person.severity >= severity)
                if(!peoples){
                    ret.push(0)
                }
                else{
                    ret.push(peoples.length)
                }
            }
            return ret
        }
        catch{
            return null
        }
    }
}
export { Query as default };