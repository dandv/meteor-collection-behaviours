/* global CollectionBehaviours Meteor Mongo _ */
var behaviours = {};

CollectionBehaviours = {};

CollectionBehaviours.defineBehaviour = function (name, method) {
  behaviours[name] = method;
};

CollectionBehaviours.extendCollectionInstance = function (self) {
  // Wrap mutator methods, letting the defined advice do the work
  //var collection = Meteor.isClient ? self : self._collection;
  _.each(behaviours, function (behaviour, method) {
    self[method] = function () {
      return behaviour.call(self,
        function (doc) {
          return  _.isFunction(self._transform)
                  ? function (d) {
                    var dd = d || doc;
                    //make sure only valid docs get transformed
                    if(!dd._id)
                      return dd;
                    return self._transform(dd);
                  }
                  : function (d) { return d || doc; };
        },
        _.toArray(arguments)
      );
    };
  });
};

CollectionBehaviours.wrapCollection = function (ns, as) {
  if (!as._CollectionConstructor2) as._CollectionConstructor2 = as.Collection;
  if (!as._CollectionPrototype2) as._CollectionPrototype2 = new as.Collection(null);

  var constructor = as._CollectionConstructor2;
  var proto = as._CollectionPrototype2;

  ns.Collection = function () {
    var ret = constructor.apply(this, arguments);
    CollectionBehaviours.extendCollectionInstance(this);
    return ret;
  };

  ns.Collection.prototype = proto;

  for (var prop in constructor) {
    if (constructor.hasOwnProperty(prop)) {
      ns.Collection[prop] = constructor[prop];
    }
  }
};

if (typeof Mongo !== "undefined") {
  CollectionBehaviours.wrapCollection(Meteor, Mongo);
  CollectionBehaviours.wrapCollection(Mongo, Mongo);
} else {
  CollectionBehaviours.wrapCollection(Meteor, Meteor);
}