/* global Selectable _ Session */
Selectable = function(doc, collectionName) {
  _.extend(this, doc);
  this.collectionName = collectionName;
};


/* global CollectionBehaviours Session _ */
CollectionBehaviours.defineBehaviour('selectable', function(getTransform, args) {
  var self = this;

  _.extend(Selectable.prototype, {
    select: function() {
      Session.set('pb' + this.collectionName + 'Selected', this._id);
    },
    isSelected: function() {
      return Session.equals('pb' + this.collectionName + 'Selected', this._id);
    },
    unSelect: function() {
      Session.set('pb' + this.collectionName + 'Selected', null);
    }
  });
  if (_.isFunction(self._transform)) {
    self.prevTransformS = self._transform;
  } else {
    self.prevTransformS = function(doc) { return doc; };
  }
  self._transform = function(doc) {
    return new Selectable(self.prevTransformS(doc), self._name);
  };
  //new methods for the collection
  self.selected = function() {
    return self.findOne({
      _id: Session.get('pb' + self._name + 'Selected')
    });
  }
  self.selectedId = function() {
    return Session.get('pb' + self._name + 'Selected');
  }
  self.unSelect = function() {
      Session.set('pb' + self._name + 'Selected', null);
  }
});