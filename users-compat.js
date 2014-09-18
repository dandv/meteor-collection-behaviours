if (Meteor.users) {
  // If Meteor.users has been instantiated, attempt to re-assign its prototype:
  CollectionBehaviours.reassignPrototype(Meteor.users);

  // Next, give it the hook aspects:
  CollectionBehaviours.extendCollectionInstance(Meteor.users);
}