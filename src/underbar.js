(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
      return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n > array.length) {
      return array;
    }
    return n === undefined ? array[array.length-1] : array.slice(array.length-n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    };
    } else {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };
  // _.iterator = function(value, key, collection) {
  //   collection[key] = value+1;
  // };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    let filteredCollection = [];
    for( let i =0; i < collection.length; i++) {
      if(test(collection[i])) {
        filteredCollection.push(collection[i]);
      }
    }
    return filteredCollection;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    let reducedCollection = [];
    for(let e of collection) {
      reducedCollection.push(e);
    }
    let filteredCollection = _.filter(collection, test);
    for(let i = 0; i < reducedCollection.length; i++) {
      for(let j = 0; j < filteredCollection.length; j++) {
        if(reducedCollection[i] === filteredCollection[j]) {
          reducedCollection.splice(i,1);
          i--;
        }
      }
    }
    return reducedCollection;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    let noDuplicateArray = []
    for(let i = 0; i < array.length; i++) {
      if(!noDuplicateArray.includes(array[i])) {
        noDuplicateArray.push(array[i]);
      }
    }
    return noDuplicateArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let iteratedArray = []
    for(let i = 0; i < collection.length; i++) {
      iteratedArray.push(iterator(collection[i]));
    }
    return iteratedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    let i = 0;
    if(accumulator === undefined) {
      accumulator = collection[0];
      i = 1;
    }
    if(Array.isArray(collection)) {
      for(; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      for(let key in collection) {
        accumulator = iterator(accumulator, collection[key]);
      }
    }
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if(collection.length === 0) {
      return true;
    }
    if(iterator === undefined) {
      for(let i = 0; i < collection.length; i++) {
        if(!!collection[i] === false) {
          return false;
        }
      }
    } else {
      //let reducedCollection = _.reduce(collection, iterator);
      for(let i = 0; i < collection.length; i++) {
        if(!!iterator(collection[i]) === false) {
          return false;
        }
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(collection.length === 0) {
      return false;
    }
    if(_.every(collection, iterator)) {
      return true;
    } else if(iterator === undefined) {
      for(let i = 0; i < collection.length; i++) {
        if(!!collection[i] === true) {
          return true;
        }
      }
    } else {
      for(let i = 0; i < collection.length; i++) {
        if(!!iterator(collection[i]) === true) {
          return true;
        }
      }
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a helper for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    let i = 1;
    for(; i < arguments.length; i++) {
      // console.log(typeof(arguments[i]));
      for(let j = 0; j < Object.keys(arguments[i]).length; j++) {
        obj[Object.keys(arguments[i])[j]] = arguments[i][Object.keys(arguments[i])[j]];
      }
    }
    return obj;
  };

}());
