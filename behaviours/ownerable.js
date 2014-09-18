/* global CollectionBehaviours Ownerable _ Session Meteor*/
Ownerable = function(doc) {
  _.extend(this, doc);
};

CollectionBehaviours.defineBehaviour('ownerable', function(getTransform, args){
  var self = this;

  self.before.insert(function (userId, doc) {
    doc.user_id = userId;
  });
  
  _.extend(Ownerable.prototype, {
    isOwner: function() {
      var userId = Meteor.userId();
      if (this.user_id == userId) {
        return true;
      } else {
        return false;
      }
    },
    owner: function() {
      var user = Meteor.users.findOne({
        _id: this.user_id
      });
      return user;
    }
  });
  
  if (_.isFunction(self._transform)) {
    self.prevTransformO = self._transform;
  } else {
    self.prevTransformO = function(doc) { return doc; };
  }
  self._transform = function(doc) {
    return new Ownerable(self.prevTransformO(doc));
  };
});
  
