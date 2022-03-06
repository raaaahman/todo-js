describe('L\'objet "todo"', () => {
    it ('est déclaré', () => {
        expect(todo).toBeDefined()
        expect(todo).toBeInstanceOf(Object)
        expect(todo).not.toBeInstanceOf(Function)
        expect(todo).not.toBeInstanceOf(Array)
    })

    it('a une propriété "id" qui est un nombre', () => {
        expect(todo).toEqual(jasmine.objectContaining({ id: jasmine.any(Number) }))
    })

    it('a une propriété "label" qui est une chaîne de caractère', () => {
        expect(todo).toEqual(jasmine.objectContaining({ label: jasmine.any(String) }))
    })

    it('a une propriété "complete" qui est un booléen', () => {
        expect(todo).toEqual(jasmine.objectContaining({ complete: jasmine.any(Boolean)}))
    })

    it('a une propriété "creationDate" qui est un objet natif de type "Date"', () => {
        expect(todo).toEqual(jasmine.objectContaining({ creationDate: jasmine.any(Date) }))
    })
})

describe('Le tableau "myTodos"', () => {
    it('Est déclaré', () => {
        expect(myTodos).toBeDefined()
        expect(myTodos).toBeInstanceOf(Array)
    })

    it('contient l\'objet "todo"', () => {
        expect(myTodos).toContain(todo)
    })

    it('contient deux autres objets similaires à l\'objet "myTodos"', () => {
        const sampleProperties = {
            id: jasmine.any(Number),
            label: jasmine.any(String),
            complete: jasmine.any(Boolean),
            creationDate: jasmine.any(Date)
        }
        expect(myTodos).toHaveSize(3)
        expect(myTodos[0]).toEqual(jasmine.objectContaining(sampleProperties))
        expect(myTodos[1]).toEqual(jasmine.objectContaining(sampleProperties))
        expect(myTodos[2]).toEqual(jasmine.objectContaining(sampleProperties))
    })
})

describe('La fonction "countTodos"', () => {
    it('Est déclarée', () => {
        expect(countTodos).toBeDefined()
        expect(countTodos).toBeInstanceOf(Function)
    })

    it('Retourne un nombre, qui correspond au nombre d\'éléments dans le tableau "myTodos"', () => {        
        expect(countTodos()).toBeInstanceOf(Number)
        expect(countTodos()).toEqual(3)

        const lastTodo = myTodos.pop()

        expect(countTodos()).toEqual(2)

        myTodos.push(lastTodo)
    })
})

describe('La fonction "setTodos"', () => {
    it('Accepte un paramètre', () => {
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

    it('Remplace le tableau stocké dans "myTodos" par le tableau passé en paramètre', () => {
        const orignalTodos = myTodos

        // Si le tableau passé en paramètre ne contient qu\'un seul élément, le tableau "myTodos" doit contenir le même élément'
        let newTodos = [{
            id: 2,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date()
        }]

        setTodos(newTodos)

        expect(myTodos).toEqual(jasmine.arrayWithExactContents(newTodos))
    
        // Si le tableau passé en paramètre contient deux éléments, le tableau "myTodos" doit contenir les deux mêmes éléments'
        newTodos = [
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
    
        // Si le tableau passé en paramètre ne contient pas d\'élément, le tableau "myTodos" doit être vide aussi'
        newTodos = []

        setTodos(newTodos)

        expect(myTodos).toHaveSize(0)

        myTodos = orignalTodos
    })
})

describe('La fonction "concatTodos"', () => {
    it('Prend un objet en paramètre, et retourne un nouveau tableau', () => {
        expect(concatTodos).toHaveSize(1)

        const result = concatTodos()

        expect(result).toBeInstanceOf(Array)
        expect(result).not.toBe(myTodos)
    })

    it('Le tableau retourné contient les mêmes objet que "myTodos", plus le nouvel objet passé en paramètre', () => {
        const newTodo = {
            id: 4,
            label: 'Hello world!',
            complete: false,
            date: new Date()
        }

        const result = concatTodos(newTodo)

        expect(result).toContain(newTodo)
        expect(result).toEqual(jasmine.arrayContaining(myTodos))
    })
})

describe('La fonction "addTodo"', () => {
    it('prend un objet en paramètre, et l\'ajoute au tableau "myTodos"', () => {
        const formerTodos = myTodos.slice(0)

        const newTodo = {
            id: 4,
            label: 'How are you today?',
            complete: false,
            creationDate: new Date()
        }
        addTodo(newTodo)

        expect(myTodos).toEqual(jasmine.arrayContaining(formerTodos))
        expect(myTodos).toContain(jasmine.objectContaining(newTodo))
    })

    it('appelle la fonction "concatTodos" pour créer un nouveau tableau', () => {
        spyOn(window, 'concatTodos')

        const newTodo = {
            id: 4,
            label: 'Fine, thank you!',
            complete: true,
            creationDate: new Date()
        }

        addTodo(newTodo)

        expect(concatTodos).toHaveBeenCalledWith(newTodo)
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

describe('La fonction "createTodos" retourne un tableau', () => {
    let originalTodos

    beforeEach(() => {
        originalTodos = myTodos
    })

    it('Le premier élément du tableau retourné correspond au tableau "myTodos"', () => {
        const value = createTodos()

        expect(value[0]).toEqual(jasmine.arrayWithExactContents(myTodos))
    })

    it('Si l\'on passe un tableau en paramètre, le tableau "myTodos" est remplacé par le tableau passé en paramètre', () => {
        const newTodos = [{
            id: 3,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date(2022, 02, 15)
        }]

        const value = createTodos(newTodos)

        expect(myTodos).toEqual(jasmine.arrayWithExactContents(newTodos))
        expect(value[0]).toEqual(jasmine.arrayWithExactContents(newTodos))
    })

    it('Le second élément du tableau retourné correspond à la fonction "setTodos"', () => {
        let value = createTodos()

        expect(value[1]).toEqual(setTodos)

        value = createTodos([{
            id: 4,
            label: 'Hello World!',
            complete: false,
            creationDate: new Date(2022, 02, 14)
        }])
    })

    afterEach(() => {
        myTodos = originalTodos
    })
})