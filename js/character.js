module.exports = function Character( opts ) {
  var defaultOpts = {
        traits: [],
        features: [],
        appearance: {
          age: '',
          height: '',
          weight: '',
          size: ''
        },
        stats: {
          hit_points: 0,
          strength: 0,
          dexterity: 0,
          constitution: 0,
          wisdom: 0,
          intelligence: 0,
          charisma: 0
        }
      },
      mergedOpts = merge( defaultOpts, opts ),
      self = this;

  function merge( obj1, obj2 ) {
    var ret = {},
        attr;
    for ( attr in obj1 ) { ret[attr] = obj1[attr]; }
    for ( attr in obj2 ) { ret[attr] = obj2[attr]; }
    return ret;
  }

  this.traits = defaultOpts.traits;
  this.features = defaultOpts.features;
  this.appearance = defaultOpts.appearance;
  this.stats = defaultOpts.stats;

  this.init = function init() {
    self.traits = mergedOpts.traits;
    self.features = mergedOpts.features;
    self.appearance = mergedOpts.appearance;
    self.stats = mergedOpts.stats;

    return self;
  };

};
