import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { addBug, getUnresolvedBugs, resolveBug, loadBugs } from '../bugs'
import configureStore from "../configureStore"

describe("bugSlice", () => {
    let fakeAxios
    let store

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios)
        store = configureStore()
    })

    const bugsSlice = () => store.getState().entities.bugs
    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    })

    it("should add the bug to the store if it's saved to the server", async () => {

        // Arrange
        const bug = { description: "a" }
        const savedBug = { ...bug, id: 1 }
        fakeAxios.onPost('/bugs').reply(200, savedBug)

        // Act
        await store.dispatch(addBug(bug))

        // Assert
        expect(bugsSlice().list).toContainEqual(savedBug)
    })

    it("should not add the bug to the store if it's saved to the server", async () => {

        // Arrange
        const bug = { description: "a" }
        fakeAxios.onPost('/bugs').reply(500)

        // Act
        await store.dispatch(addBug(bug))

        // Assert
        expect(bugsSlice().list).toHaveLength(0)
    })

    it("should mark the bug as resolved if saved to the store", async () => {
        fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true })
        fakeAxios.onPost("/bugs").reply(200, { id: 1 })

        await store.dispatch(addBug({}))
        await store.dispatch(resolveBug(1))

        expect(bugsSlice().list[0]?.resolved).toBe(true)

    })

    it("should not mark the bug as resolved if not saved to the store", async () => {
        fakeAxios.onPatch('/bugs/1').reply(500)
        fakeAxios.onPost("/bugs").reply(200, { id: 1 })

        await store.dispatch(addBug({}))
        await store.dispatch(resolveBug(1))

        expect(bugsSlice().list[0]?.resolved).not.toBe(true)

    })

    describe("loading bugs", () => {
        describe("if the bugs exist in the cache", () => {
            it("should not be fetched from the server again", async () => {
                fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }])

                await store.dispatch(loadBugs())
                await store.dispatch(loadBugs())

                expect(fakeAxios.history.get.length).toBe(1)
            })
        })
        describe("if the bugs do not exist in the cache", () => {
            it("they should be fetched from server and put in the store", async () => {
                fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }])

                await store.dispatch(loadBugs())

                expect(bugsSlice().list).toHaveLength(1)
            })
            
            describe("loading indicator", () => {
                it("should be true while fetching bugs", () => {
                    fakeAxios.onGet("/bugs").reply(() => {
                        expect(bugsSlice().loading.toBe(true))
                        return [200, [{ id: 1 }]]
                    })
                })
                it("should be false after the bugs are fetched", async () => {
                    fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }])

                    await store.dispatch(loadBugs())

                    expect(bugsSlice().loading).toBe(false)
                })
                it("should be false if the server fails", async () => {
                    fakeAxios.onGet("/bugs").reply(500)

                    await store.dispatch(loadBugs())

                    expect(bugsSlice().loading).toBe(false)
                })
            })
        })
    })

    describe("selectors", () => {
        it("should get unresolved bugs from store", () => {
            const state = createState()
            state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2, resolved: false }, { id: 3, resolved: true }]

            const result = getUnresolvedBugs(state)
            console.log(state)

            expect(result).toHaveLength(1)
        })

    })
})