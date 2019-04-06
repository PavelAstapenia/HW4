function* _async(id) {
    let user = (yield fetchUser(id)),
        friends = (yield fetchFriends(id));
    return {
        user,
        friends
    };
}

function execute(generator, yieldValue) {

    let next = generator.next(yieldValue);

    if (!next.done) {
        next.value.then(
            result => execute(generator, result),
            err => generator.throw(err)
        );
    }

}

execute (_async());



