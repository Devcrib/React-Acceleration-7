## CURRYING AND PARTIAL APPLICATION

#### CURRYING

Currying and partial application are two ways of transforming a function into another function with a generally smaller arity (which is the number of arguments a function or operator takes). While they are often confused with each other, they work differently. This post explains the details.
Currying takes a function
f: X × Y → R    
 (it's a mapping from the cartesian product of X and Y (each a set) to the set R. As a mapping, it itself is a set of ordered pairs, the first item of which is an ordered pair (X x Y), and the second item is an element r of R).

and turns it into a function inverse 
f': X → (Y → R)
Instead of calling f with two arguments, we invoke f' with the first argument. The result is a function that we then call with the second argument to produce the result.
THE UNCURRIED FUNCTION
function add(a, b) {
        return a + b;
    }
Calling the uncurried function
add(5, 5)
    // RESULT GIVES 10
#### THE CURRIED FUNCTION

function addC(a) {

        return function (b) {
            return a + b;
        }
    }
Calling the curried function
 addC(5)(5)
   // RESULT GIVES 10



#### PARTIAL APPLICACTION

Partial application takes a function
f: X × Y → R
and a fixed value x for the first argument to produce a new function
f': Y → R
f' does the same as f, but only has to fill in the second parameter which is why its arity is one less than the arity  of  f. One says that the first argument is bound to x.
var plus5 = add.bind(null, 5)

     plus5(10)
    // RESULT GIVES 15


Difference between Currying and Partial Application
	•	Currying always produces nested unary (1-ary) functions. The transformed function is still largely the same as the original.
	•	Partial application produces functions of arbitrary arity. The transformed function is different from the original – it needs less arguments.



### COMPOSITION AND PIPLINE

#### COMPOSITION

Composition is a mathematical concept which allows you to combime two or more function into a new function. The return value of the function call is the overall result.  It is a key concept in functional programming. 
In mathematics, (f ° g)(x). We can achieve this using the reduceRight() 
The reduceRight() method applies a function against an accumulator and each values of the array(from right-to-left)has to reduce it to a single value.
function compose(f, g) {

    return function(x) {
   return f(g(x));
    }
}

#### PIPELINE

A pipeline is multiple processes that are chained together. Each process takes an input from the previous process’s output, and then passes its output to the next process. 
That is,     Process1| process2 |process3.
The| symbolizes the pipe.
const pipe = (...fns) => {

    return (initialVal) => {
        return fns.reduce((val, fn) => {
            return fn(val);
        }, initialVal);
    }

#### Difference between Composition and Pipeline

Composition and pipeline are similar because they both allow the result of a function to be used in another function.
The difference between them is, pipeline performs its operation form left-to-right while composition dose it inversely 

### FUNCTORS AND MONADS 

#### FUNCTORS

A functor data type is something you can map over. It’s a container which has an interface which can be used to apply a function to the values inside it. When you see a functor, you should think “mappable”. Functor types are typically represented as an object with a .map() method that maps from inputs to outputs while preserving structure. In practice, “preserving structure” means that the return value is the same type of functor (though values inside the container may be a different type).
A functor supplies a box with zero or more things inside, and a mapping interface. An array is a good example of a functor, but many other kinds of objects can be mapped over as well, including promises, streams, trees, objects, etc… JavaScript’s built in array and promise objects act like functors. For collections (arrays, streams, etc…), .map() typically iterates over the collection and applies the given function to each value in the collection, but not all functors iterate. Functors are really about applying a function in a specific context.

Functor Laws
Categories have two important properties:
	•	Identity
	•	Composition
Since a functor is a mapping between categories, functors must respect identity and composition. Together, they’re known as the functor laws.
Identity
If you pass the identity function (x => x) into f.map(), where f is any functor, the result should be equivalent to (have the same meaning as) 
f:onst f = [1, 2, 3]; f.map(x => x); 

#### Composition

Functors must obey the composition law: F.map(x => f(g(x))) is equivalent to F.map(g).map(f).
Function Composition is the application of one function to the result of another, e.g., given an x and the functions, f and g, the composition
 (f ∘ g)(x) (usually shortened to f ∘ g - the (x) is implied) means f(g(x))

#### MONAD

Monad is a design pattern used to describe computations as a series of steps. They are extensively used in pure functional programming languages to manage side effects but can also be used in multiparadigm languages to control complexity.
Monads wrap types giving them additional behavior like the automatic propagation of empty value (Maybe monad) or simplifying asynchronous code (Continuation monad).
To be considered a monad the structure has to provide three components:

	•	Type constructor — a feature that creates a monadic type for the underlying type. For example it defines the type Maybe<number> for the underlying type number.
	•	The unit function that wraps a value of underlying type into a monad. For the Maybe monad it wraps value 2 of the type number into the value Maybe(2) of the type Maybe<number>.
	•	The bind function that chains the operations on a monadic values.
There are also three monadic laws to obey:
	•	bind(unit(x), f) ≡ f(x)
	•	bind(m, unit) ≡ m
	•	bind(bind(m, f), g) ≡ bind(m, x ⇒ bind(f(x), g))
The first two laws say that the unit is a neutral element. The third one says that the bind should be associative — the order of binding does not matter. This is the same property that the addition have: (5+ 4) + 2 is the same as 5 + (4 + 2).

#### Identity monad

The identity monad is the simplest monad. It just wraps a value. The Identity constructor will serve as the unit function.

```
function Identity(value) {
    this.value = value;
}

Identity.prototype.bind = function(transform) {
    return transform(this.value);
};

Identity.prototype.toString = function() {
    return 'Identity(' + this.value + ')';
};
The example below computes addition using the Identity monad
var result = new Identity(5).bind(value =>
                 new Identity(6).bind(value2 =>
                      new Identity(value + value2)));

print(result);
```



#### Difference between Functors and Monads

A functor takes a pure function (and a functorial value) whereas a monad takes a Kleisli arrow, i.e. a function that returns a monad (and a monadic value). Hence you can chain two monads and the second monad can depend on the result of the previous one. You cannot do this with functors. 

> A Functor is a function from a set of values a to another set of values: a -> b. For a programming language this could be a function that goes from String -> Integer:
> function fn(text: string) : integer
>

A Monad allows to compose Functors that either are not composable otherwise, compose Functors by adding extra functionality in the composition, or both.

### REFERENCES

	•	https://hackernoon.com/javascript-functional-composition-for-every-day-use-22421ef65a10 
	•	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight 
	•	https://www.gideonpyzer.com/blog/javascript-function-composition-and-pipelines/ 
	•	https://medium.com/javascript-scene/functors-categories-61e031bac53f
	•	https://curiosity-driven.org/monads-in-javascript

