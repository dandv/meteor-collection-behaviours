/* global CollectionBehaviours */
CollectionBehaviours.defineBehaviour('blamable', function(getTransform, args){
  var self = this;
  self.ownerable();
  self.before.update(function (userId, doc, fieldNames, modifier, options) {
    if(!modifier.$set)
      modifier.$set = {};
    modifier.$set.lastUpdatedBy = userId;
  });
});