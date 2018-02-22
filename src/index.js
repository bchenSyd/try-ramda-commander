import R from 'ramda';


export const start = () => {
    console.log('program started...')
}
// example 1: 
const data = [
    {
        id: 104, complete: false, priority: "high",
        dueDate: "2013-11-29", username: "Scott",
        title: "Do something", created: "9/22/2013"
    },
    {
        id: 105, complete: false, priority: "medium",
        dueDate: "2013-11-22", username: "Lena",
        title: "Do something else", created: "9/22/2013"
    },
    {
        id: 107, complete: true, priority: "high",
        dueDate: "2013-11-22", username: "Mike",
        title: "Fix the foo", created: "9/22/2013"
    },
    {
        id: 108, complete: false, priority: "low",
        dueDate: "2013-11-15", username: "Lena",
        title: "Adjust the bar", created: "9/25/2013"
    },
    {
        id: 110, complete: false, priority: "medium",
        dueDate: "2013-11-15", username: "Scott",
        title: "Rename everything", created: "10/2/2013"
    },
    {
        id: 112, complete: true, priority: "high",
        dueDate: "2013-11-27", username: "Lena",
        title: "Alter all quuxes", created: "10/5/2013"
    },
    {
        id: 113, complete: true, priority: "high",
        dueDate: "2013-11-27", username: "Lena",
        title: "Alter all quuxes", created: "10/5/2013"
    }
];


// R.compose   R.compose(Left <---- Right )(data);
// The rightmost function may have any arity (have more than 1 para); the remaining functions must be unary.

// R.pipe   R.pipe(Left ------>  Right )(data);
// The leftmost function may have any arity (have more than 1 para); the remaining functions must be unary.


const userName = 'Lena';
const byName = R.filter(R.where({ username: R.equals(userName) }))(data);
const notCompleted = R.reject(R.propEq('complete', true))(byName);

const pickProps = R.pick(['id', 'dueDate', 'title', 'priority']);
// R.map  Takes a function and a functor (e.g array), applies the function to each of the functor's values,
// and returns a functor of the same shape.
const selected = R.map(pickProps)(notCompleted);

// R.pluck is equivalent to R.map(R.prop(k), f); so it can only pluck ONE prop of its itmes
const selected2 = R.pluck('title')(notCompleted);  // pluck = map(prick([ONE-PROP-NAME]))


const upperCasePriority = R.over(R.lensProp('priority'), R.toUpper);

const upperCased = R.map(upperCasePriority)(selected);

R.sortBy(R.compose(R.negate, R.prop('id')))(upperCased);


// expample 2:
// task: keep the same structure, but confine the deviceList to 'prepaid' only;
const data2 = {
    deviceList: [
        {
            id: 1,
            type: 'postPaid'
        },
        {
            id: 2,
            type: 'postPaid'
        },
        {
            id: 3,
            type: 'prepaid'
        }
    ]
}

// this will return a list; as R.view returns a list;
R.compose(R.filter(e => e.id !== 3),
    R.view(R.lensProp('deviceList'))
)(data2); 

// this will do the job; as R.over doesn't change data structure; it only mutate data;
R.over(R.lensProp('deviceList'), R.filter(device => device.type === 'prepaid'))(data2)

