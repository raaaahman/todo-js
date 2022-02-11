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
})