function containsObjectContaining(sample) {
    return {
        asymmetricMatch: function (actual) {
            if(!(actual instanceof Array)) return false
            
            return !!actual.find(obj => jasmine.objectContaining(sample).asymmetricMatch(obj))
        }
    }
}

describe('Le tableau "myTodos"', () => {
    it('Est déclaré', () => {
        expect(myTodos).toBeDefined()
        expect(myTodos).toBeInstanceOf(Array)
    })

    it('contient un objet', () => {
        const value = myTodos

        expect(value).toHaveSize(1)
        expect(value).toBeInstanceOf(Object)
    })

    it('cet objet a une propriété "id" qui est un nombre', () => {
        const todo = myTodos[0]

        expect(todo).toEqual(jasmine.objectContaining({ id: jasmine.any(Number) }))
    })

    it('cet objet a une propriété "label" qui est une chaîne de caractère', () => {
        const todo = myTodos[0]

        expect(todo).toEqual(jasmine.objectContaining({ label: jasmine.any(String) }))
    })

    it('cet objet a une propriété "complete" qui est un booléen', () => {
        const todo = myTodos[0]

        expect(todo).toEqual(jasmine.objectContaining({ complete: jasmine.any(Boolean)}))
    })

    it('cet objet a une propriété "creationDate" qui est un objet natif de type "Date"', () => {
        const todo = myTodos[0]

        expect(todo).toEqual(jasmine.objectContaining({ creationDate: jasmine.any(Date) }))
    })
})

describe('La fonction "setTodos"', () => {
    it('Est déclarée', () => {
        expect(setTodos).toBeDefined()
        expect(setTodos).toBeInstanceOf(Function)
    })

    it('Accepte un paramètre qui est un tableau', () => {
        expect(setTodos.length).toEqual(1)

        // Ne doit pas retourner d'erreur
        setTodos([
            {
                id: 1,
                label:  'Finir le TP de Javascript',
                complete: false,
                date: new Date(2022, 02, 15)
            }
        ])
    })

    describe('Remplace le tableau stocké dans "myTodos" par le tableau passé en paramètre', () => {
        it('Si le tableau passé en paramètre ne contient qu\'un seul élément, le tableau "myTodos" doit contenir le même élément', () => {
            const newTodos = [{
                id: 2,
                label: 'Hello World!',
                complete: false,
                creationDate: new Date()
            }]
    
            setTodos(newTodos)
    
            expect(myTodos).toEqual(jasmine.arrayWithExactContents(newTodos))
        })
    
        it('Si le tableau passé en paramètre contient deux éléments, le tableau "myTodos" doit contenir les deux mêmes éléments', () => {
            const newTodos = [
                {
                    id: 2,
                    label: 'Hello World!',
                    complete: false,
                    creationDate: new Date(2022, 02, 15)
                },
                {
                    id: 3,
                    label: 'Bonjour monde!',
                    complete: true,
                    creationDate: new Date(2022, 02, 15)
                }
            ]
    
            setTodos(newTodos)
    
            expect(myTodos).toEqual(jasmine.arrayWithExactContents(newTodos))
        })
    
        it('Si le tableau passé en paramètre ne contient pas d\'élément, le tableau "myTodos" doit être vide aussi', () => {
            const newTodos = []
    
            setTodos(newTodos)
    
            expect(myTodos).toHaveSize(0)
        })
    })
})

describe('La fonction "createTodos"', () => {
    it('Retourne un tableau', () => {
        const value = createTodos()
        
        expect(value).toBeDefined()
        expect(value).toBeInstanceOf(Array)
    })

    describe('Si l\'on ne passe pas de paramètre', () => {
        it('Le premier élément du tableau retourné correspond au tableau "myTodos"', () => {
            const value = createTodos()
    
            expect(value[0]).toEqual(jasmine.arrayWithExactContents(myTodos))
        })
    
        it('Le second élément du tableau retourné correspond à la fonction "setTodos"', () => {
            const value = createTodos()
    
            expect(value[1]).toEqual(setTodos)
        })
    })

    describe('Si l\'on passe un tableau en paramètre à la fonction "createTodos"', () => {
        it('Le premier élément retourné est un tableau qui contient les mêmes éléments que le tableau passé en paramètre', () => {
            const newTodos = [{
                id: 3,
                label: 'Hello World!',
                complete: false,
                creationDate: new Date(2022, 02, 15)
            }]
    
            const value = createTodos(newTodos)
    
            expect(value[0]).toEqual(jasmine.arrayWithExactContents(newTodos))
        })

        it('le second élément du tableau retourné est une fonction qui permet de modifier le premier élément retourné (le tableau contenant des todos)', () => {
            const newTodos = [
                {
                    id: 4,
                    label: 'Bonjour tout le monde',
                    complete: true,
                    creationDate: new Date(2022, 03, 07)
                }
            ]

            const [ todoArr, setTodoArr ] = createTodos(newTodos)

            expect(setTodoArr).toBeInstanceOf(Function)

            const modifiedTodos = [
                {
                    id: 5,
                    label: 'Comment ça va aujourd\'hui?',
                    complete: false,
                    creationDate: new Date(2022, 03, 14)
                },
                {
                    id: 6,
                    label: 'Wassup?',
                    complete: false,
                    creationDate: new Date(2022, 04, 08)
                }
            ]
            setTodoArr(modifiedTodos)

            expect(todoArr).toEqual(jasmine.arrayWithExactContents(modifiedTodos))
        })
    })
})

describe('La fonction "addTodo"', () => {
    it('prend un objet en paramètre, et l\'ajoute au tableau "myTodos"', () => {
        const newTodo = {
            id: 4,
            label: 'How are you today?',
            complete: false,
            creationDate: new Date()
        }
        addTodo(newTodo)

        expect(myTodos).toContain(jasmine.arrayContaining(formerTodos))
        expect(myTodos).toContain(jasmine.objectContaining(newTodo))
    })
    
    it('ne modifie pas directement le tableau "myTodos", mais appelle la fonction "setTodos" en lui passant un nouveau tableau en paramètre (voir concaténation de tableaux)', () => {
        spyOn(window, 'setTodos')
        
        const todo1 = {
            id: 4,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date()
        }
        myTodos = [todo1]
        
        const newTodo = {
            id: 5,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date()
        }
        addTodo(newTodo)
        
        expect(setTodos).toHaveBeenCalledWith(jasmine.arrayContaining([
            jasmine.objectContaining(todo1),
            jasmine.objectContaining(newTodo)
        ]))
    })
    
})

describe('La fonction "getTodoById"', () => {
    it('retourne l\'élément du tableau "myTodos" dont la propriété "id" correspond au nombre passé en paramètre', () => {
        const todo = {
            id: 5,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date()
        }
        myTodos = [todo, {
            id: 6,
            label: 'How are you today?',
            complete: false,
            creationDate: new Date()
        }]
        const value = getTodoById(5)
                
        expect(value).toEqual(jasmine.objectContaining(todo))
    })
})

describe('La fonction "removeTodo"', () => {
    it('enlève l\'élément du tableau "myTodos" dont la propriété "id" correspond au nombre passé en paramètre ', () => {
        const todo = {
            id: 6,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date()
        }
        myTodos = [todo, {
            id: 7,
            label: 'How are you today?',
            complete: false,
            creationDate: new Date()
        }]
        removeTodo(6)

        expect(myTodos).not.toContain(jasmine.objectContaining(todo))
    })

    it('ne modifie pas directement le tableau "myTodos", mais appelle la fonction "setTodos" en lui passant un nouveau tableau en paramètre', () => {
        spyOn(window, 'setTodos')

        const todo = {
            id: 6,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date()
        }
        myTodos = [todo, {
            id: 7,
            label: 'How are you today?',
            complete: false,
            creationDate: new Date()
        }]

        removeTodo(7)

        expect(setTodos).toHaveBeenCalledWith(jasmine.arrayWithExactContents([jasmine.objectContaining(todo)]))
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

    it('si l\'on ne passe pas de paramètre, retourne un tableau contenant uniquement les objets dont la propriété "complete" vaut "false"', () => {
        const value = filterTodosByComplete()

        expect(value).toContain(jasmine.objectContaining(myTodos[0]))
        expect(value).toContain(jasmine.objectContaining(myTodos[3]))
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

    it('si l\'on ne passe pas de paramètre, retourne un tableau contenant les todos rangés par ordre de date décroissante (du plus récent au plus ancien)', () => {
        const value = sortTodosByCreationDate()

        expect(value[0]).toEqual(jasmine.objectContaining(todo2))
        expect(value[1]).toEqual(jasmine.objectContaining(todo1))
        expect(value[2]).toEqual(jasmine.objectContaining(todo4))
        expect(value[3]).toEqual(jasmine.objectContaining(todo3))
    })

    it('si l\'on passe la chaîne "ASC" paramètre, retourne un tableau contenant les todos rangés par ordre de date croissante (du plus ancien au plus récent)', () => {
        const value = sortTodosByCreationDate('ASC')

        expect(value[0]).toEqual(jasmine.objectContaining(todo3))
        expect(value[1]).toEqual(jasmine.objectContaining(todo4))
        expect(value[2]).toEqual(jasmine.objectContaining(todo1))
        expect(value[3]).toEqual(jasmine.objectContaining(todo2))
    })

    it('si l\'on passe la chaîne "DESC" en paramètre, retourne un tableau contenant les todos rangés par ordre de date décroissante (du plus récent au plus ancien)', () => {
        const value = sortTodosByCreationDate('DESC')

        expect(value[0]).toEqual(jasmine.objectContaining(todo2))
        expect(value[1]).toEqual(jasmine.objectContaining(todo1))
        expect(value[2]).toEqual(jasmine.objectContaining(todo4))
        expect(value[3]).toEqual(jasmine.objectContaining(todo3))
    })
})