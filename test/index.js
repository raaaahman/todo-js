describe('La fonction "getTodos"', () => {
    it('Est déclarée', () => {
        expect(getTodos).toBeDefined()
        expect(getTodos).toBeInstanceOf(Function)
    })

    it('Retourne un tableau', () => {
        const value = getTodos()

        expect(value).toBeDefined()
        expect(value).toBeInstanceOf(Array)
    })

    it('Le tableau retourné contient un objet', () => {
        const value = getTodos()

        expect(value).toHaveSize(1)
        expect(value).toBeInstanceOf(Object)
    })

    it('Le premier objet du tableau a une propriété "label" qui est une chaîne de caractère', () => {
        const todo = getTodos()[0]

        expect(todo).toEqual(jasmine.objectContaining({ label: jasmine.any(String) }))
    })

    it('Le premier objet du tableau a une propriété "complete" qui est un booléen', () => {
        const todo = getTodos()[0]

        expect(todo).toEqual(jasmine.objectContaining({ complete: jasmine.any(Boolean)}))
    })

    it('Le premier objet du tableau a une propriété "creationDate" qui est un objet natif de type "Date"', () => {
        const todo = getTodos()[0]

        expect(todo).toEqual(jasmine.objectContaining({ creationDate: jasmine.any(Date) }))
    })
})