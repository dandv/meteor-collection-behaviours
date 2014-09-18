Tinytest.add("works", function(test) {
    Books = new Mongo.Collection('books' + test.id);
    Books.timestampable();
    Apple = new Meteor.Collection('apple' + test.id);
    Apple.timestampable();

    var book1 = Books.insert({
        authorId: 'author1',
        name: 'On the Origin of Species'
    });
    var apple1 = Apple.insert({
        authorId: 'apple1',
        name: 'On the Origin of Species'
    });

    var book = Books.findOne(book1);
    var apple = Apple.findOne(apple1);
    console.log(Meteor.users);
    test.isTrue(book.hasOwnProperty('createdAt'));
    test.isTrue(apple.hasOwnProperty('createdAt'));
});
Tinytest.addAsync("insert - Meteor.users collection document should have extra property added before being inserted and properly provide inserted _id in after hook", function(test, next) {
    var collection = Meteor.users;
    console.log(collection);
    //Meteor.users.timestampable();
});