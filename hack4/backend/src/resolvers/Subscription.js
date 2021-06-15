const Subscription = {
    people: {
        subscribe(parent, {}, { db, pubsub }, info){
            return pubsub.asyncIterator(`people`);
        }
    }
}
export { Subscription as default };