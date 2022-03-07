describe('La fonction "isNumber42" prend un objet en paramètre', () => {
    it('Retourne true si l\'objet passé en paramètre a une propriété "id" avec la valeur 42', () => {
        const result = isNumber42({
            id: 42,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date(2022, 3, 15)
        })

        expect(result).toBe(true)
    })

    it('Retourne false, si l\'objet passé en paramètre a une propriété "id" dont la valeur n\'est pas 42', () => {
        const todo0 = {
            id: 0,
            label: true,
            complete: false,
            creationDate: new Date(2022, 3, 16)
        }
        
        const todo1 = {
            id: 1,
            label: true,
            complete: false,
            creationDate: new Date(2022, 3, 16)
        }        
        
        const todoUndefined = {
            label: true,
            complete: false,
            creationDate: new Date(2022, 3, 16)
        }

        expect(isNumber42(todo0)).toBe(false)
        expect(isNumber42(todo1)).toBe(false)
        expect(isNumber42(todoUndefined)).toBe(false)
    })
})

describe('La fonction "getTodo42"', () => {
    let originalTodos

    beforeEach(() => {
        originalTodos = myTodos
    })
    
    it('retourne undefined si aucun objet dans le tableau "myTodos" n\'a une propriété "id" dont la valeur est 42', () => {
        myTodos = [
            {
                id: 0,
                label: 'Hello World!',
                complete: false,
                creationDate: new Date(2022, 3, 7)
            },
            {
                id: 1,
                label: 'Hello World!',
                complete: false,
                creationDate: new Date(2022, 3, 7)
            }
        ]

        expect(getTodo42()).toBe(undefined)
    })

    it('retourne l\'objet du tableau "myTodos" dont l\'id a la valeur 42 si il existe', () => {
        const todo42 = {
            id: 42,
            label: 'Hello World!',
            complete: true,
            creationDate: new Date(2022, 3, 15)
        }
        myTodos = [
            {
                id: 0,
                label: 'Hello World!',
                complete: false,
                creationDate: new Date(2022, 3, 7)
            },
            todo42
        ]

        expect(getTodo42()).toBe(todo42)
    })

    afterEach(() => {
        myTodos = originalTodos
    })
})

describe('La fonction "findByNumber"', () => {
    it('retourne une nouvelle fonction', () => {
        const result = findByNumber(0)

        expect(result).toBeInstanceOf(Function)
    })

    it('si l\'on passe le nombre 42 en paramètre, la fonction retournée est "isNumber42"', () => {
        const todo0 = {
            id: 0
        }
        const todo42 = {
            id: 42
        }
        
        const result = findByNumber(42)

        expect(result(todo0)).toBe(false)
        expect(result(todo42)).toBe(true)
    })

    describe('si l\'on passe le nombre 3 en paramètre, la fonction retournée', () => {
        it('retourne false si on lui passe un objet dont la propriété "id" ne vaut pas 3', () => {
            const todo0 = {
                id: 0
            }
            const todo1 = {
                id: 3
            }
            const todo2 = {
                label: 'Hello World'
            }
            
            const result = findByNumber(3)
    
            expect(result(todo0)).toBe(false)
        })

        it('retourne true si on lui passe un objet dont la propriété "id" ne vaut 3', () => {
            const todo0 = {
                id: 0
            }
            const todo1 = {
                id: 3
            }
            const todo2 = {
                label: 'Hello World'
            }
            
            const result = findByNumber(3)
    
            expect(result(todo1)).toBe(true)
        })
    })

   
})

describe('La fonction "getTodoById"', () => {
    it('retourne l\'élément du tableau "myTodos" dont la propriété "id" correspond au nombre passé en paramètre', () => {
        const todo5 = {
            id: 5,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date(2022, 02, 15)
        }
        const todo6 = {
            id: 6,
            label: 'How are you today?',
            complete: false,
            creationDate: new Date(2022, 03, 15)
        }
        const todo7 = {
            id: 7,
            label: 'Fine and you?',
            complete: true,
            creationDate: new Date(2022, 03, 07)
        }
        myTodos = [todo5, todo6, todo7]

        expect(getTodoById(6)).toEqual(jasmine.objectContaining(todo6))
        expect(getTodoById(7)).toEqual(jasmine.objectContaining(todo7))
    })

    it('retourne "undefined" s\'il n\'y a pas d\'élément dont la propriété "id" correspond au nombre passé en paramètre', () => {
        myTodos = [
            {
                id: 7,
                label: 'Hot day in sunny June',
                complete: true,
                creationDate: new Date(2022, 02, 07)
            }
        ]

        const value = getTodoById(10)

        expect(value).toBe(undefined)
    })
})

describe('La fonction "isComplete" prend un objet en paramètre', () => {
    it('si l\'objet passé en paramètre a une propriété "complete" dont la valeur est true, retourne true', () => {
        const todoTrue = {
            id: 0,
            complete: true
        }
        const todoFalse = {
            id: 1,
            complete: false
        }

        expect(isComplete(todoFalse)).toBe(false)
        expect(isComplete(todoTrue)).toBe(true)
    })

    it('si l\'objet passé en paramètre n\'a pas de propriété "complete", retourne false', () => {
        const todo = {
            id: 2,
            label: 'Hello World!'
        }

        expect(isComplete(todo)).toBe(false)
    })
})

describe('La fonction "filterTodosByComplete"', () => {
    beforeAll(() => {
        myTodos = [
            {
                id: 7,
                label: 'Hello World!',
                complete: false,
                creationDate: new Date()
            },
            {
                id: 8,
                label: 'Hello World!',
                complete: true,
                creationDate: new Date()
            },
            {
                id: 9,
                label: 'Hello World!',
                complete: true,
                creationDate: new Date()
            },
            {
                id: 10,
                label: 'Hello World!',
                complete: false,
                creationDate: new Date()
            },
        ]
    })

    it('si l\'on ne passe pas de paramètre, retourne un tableau contenant uniquement les objets du tableau "myTodos" dont la propriété "complete" vaut "true"', () => {
        const value = filterTodosByComplete()

        expect(value).toContain(jasmine.objectContaining(myTodos[1]))
        expect(value).toContain(jasmine.objectContaining(myTodos[2]))
    })

    it('si l\'on passe un paramètre qui est un booléen, retourne un tableau contenant uniquement les objets dont la propriété "complete" est égale au paramètre', () => {
        const value1 = filterTodosByComplete(true)

        expect(value1).toContain(jasmine.objectContaining(myTodos[1]))
        expect(value1).toContain(jasmine.objectContaining(myTodos[2]))

        const value2 = filterTodosByComplete(false)

        expect(value2).toContain(jasmine.objectContaining(myTodos[0]))
        expect(value2).toContain(jasmine.objectContaining(myTodos[3]))
    })
})

describe('La fonction "isBefore" prend deux objets en paramètres', () => {
    const todoFirst = {
        id: 1,
        creationDate: new Date(2022, 1, 12)
    }
    const todoLast = {
        id: 2,
        creationDate: new Date(2022, 2, 3)
    }

    it('retourne true si le premier objet a une propriété "creationDate" qui est plus récente que celle du deuxième objet', () => {
        const result = isBefore(todoFirst, todoLast)

        expect(result).toBe(true)
    })

    it('retourne false si le premier objet a une propriété "creationDate" qui plus ancienne que celle du deuxième objet', () => {
        const result = isBefore(todoLast, todoFirst)

        expect(result).toBe(false)
    })
})

describe('La fonction "sortTodosByCreationDate"', () => {
    const todo1 = {
        id: 11,
        label: 'Hello World!',
        complete: false,
        creationDate: new Date(2021, 10, 12)
    }
    const todo2 = {
        id: 12,
        label: 'Hello World!',
        complete: true,
        creationDate: new Date(2022, 0, 16)
    }
    const todo3 = {
        id: 13,
        label: 'Hello World!',
        complete: true,
        creationDate: new Date(1999, 11, 01)
    }
    const todo4 = {
        id: 10,
        label: 'Hello World!',
        complete: false,
        creationDate: new Date(2002, 09, 20)
    }

    beforeAll(() => {
        myTodos = [
            todo1,
            todo2,
            todo3,
            todo4,
        ]
    })

    it('si l\'on ne passe pas de paramètre, retourne un tableau contenant les todos du tableau "myTodos" rangés par ordre de date décroissante (du plus récent au plus ancien)', () => {
        const value = sortTodosByCreationDate()

        expect(value[0]).toEqual(jasmine.objectContaining(todo2))
        expect(value[1]).toEqual(jasmine.objectContaining(todo1))
        expect(value[2]).toEqual(jasmine.objectContaining(todo4))
        expect(value[3]).toEqual(jasmine.objectContaining(todo3))
    })

    it('si l\'on passe la chaîne "ASC" paramètre, retourne un tableau contenant les todos du tableau "myTodos" rangés par ordre de date croissante (du plus ancien au plus récent)', () => {
        const value = sortTodosByCreationDate('ASC')

        expect(value[0]).toEqual(jasmine.objectContaining(todo3))
        expect(value[1]).toEqual(jasmine.objectContaining(todo4))
        expect(value[2]).toEqual(jasmine.objectContaining(todo1))
        expect(value[3]).toEqual(jasmine.objectContaining(todo2))
    })

    it('si l\'on passe la chaîne "DESC" en paramètre, retourne un tableau contenant les todos du tableau "myTodos" rangés par ordre de date décroissante (du plus récent au plus ancien)', () => {
        const value = sortTodosByCreationDate('DESC')

        expect(value[0]).toEqual(jasmine.objectContaining(todo2))
        expect(value[1]).toEqual(jasmine.objectContaining(todo1))
        expect(value[2]).toEqual(jasmine.objectContaining(todo4))
        expect(value[3]).toEqual(jasmine.objectContaining(todo3))
    })
})

describe('La fonction "markComplete" prend en paramètre un objet', () => {
    it('retourne un objet dont la propriété "complete" vaut true', () => {
        const completeTodo = {
            id: 0,
            complete: false
        }
        const uncompleteTodo = {
            id: 1,
            complete: true
        }
        const todo = {
            id: 2
        }

        expect(markComplete(completeTodo).complete).toBe(true)
        expect(markComplete(uncompleteTodo).complete).toBe(true)
        expect(markComplete(todo).complete).toBe(true)
    })
})

describe('La fonction "markAllComplete"', () => {
    let originalTodos

    beforeAll(() => {
        originalTodos = myTodos
    })

    it('retourne un nouveau tableau, contenant tous les éléments du tableau "myTodos" dont les propriétés "complete" valent désormais true', () => {
        myTodos = [
            { 
                id: 1,
                complete: false
            },
            {
                id: 2,
                complete: true
            }
        ]

        const result = markAllComplete()

        expect(result).toEqual(jasmine.arrayWithExactContents([
            jasmine.objectContaining({
                id: 1,
                complete: true
            }),
            jasmine.objectContaining({
                id: 2,
                complete: true
            })
        ]))
    })

    afterAll(() => {
        myTodos = originalTodos
    })
})