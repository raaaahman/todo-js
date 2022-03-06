const todo0 = {
    id: 0,
    label: 'Hello world!',
    complete: true,
    creationDate: new Date(2022, 02, 04)
}

const todo42 = {
    id: 42,
    label: 'Hello world!',
    complete: false,
    creationDate: new Date(2022, 02, 07)
}

let myTodos = [
    todo0,
    todo42
]

/*** La fonction "isNumber42" ***/

// let result = isNumber42(todo0)
// console.log(result)
// result = isNumber42(todo42)
// console.log(isNumber42(todo42))


/*** La fonction "getTodo42" ***/

// let result = getTodo42()
// console.table(result)


/*** La fonction "isNumber" ***/

// let find42 = findByNumber(42)
// let result = find42(todo0)
// console.log(result)
// result = find42(todo42)
// console.log(result)

// let find3 = findByNumber(3)
// result = find3(todo0)
// console.log(result)
// result = find3({ id: 3 })
// console.log(result)


/*** La fonction "getTodoById" ***/

// let result = getTodoById(42)
// console.table(result)

// result = getTodoById(5)
// console.table(result)


/*** La fonction "isComplete" ***/

// let result = isComplete(todo0)
// console.log(result)
// result = isComplete(todo42)
// console.log(result)
// result = isComplete({ label: 'Hi mom!' })
// console.log(result)


/*** La fonction "filterTodosByComplete" ***/

// let result = filterTodosByComplete()
// console.table(result)
// result = filterTodosByComplete(true)
// console.table(result)
// result = filterTodosByComplete(false)
// console.table(result)


/*** La fonction "isBefore" ***/

// let result = isBefore(todo0, todo42)
// console.log(result)
// result = isBefore(todo42, todo0)
// console.log(result)


/*** La fonction "sortTodosByCreationDate" ***/

// let result = sortTodosByCreationDate()
// console.table(result)
// result = sortTodosByCreationDate()
// console.table(result)


/*** La fonction "markComplete" ***/

// let result = markComplete(todo0)
// console.table(result)
// result = markComplete(todo42)
// console.table(result)


/*** La fonction "markAllComplete" ***/

// let result = markAllComplete()
// console.table(result)