

const region = {
    state: {
        regions: []
    },
    getters: {
        regions(state) {
            return state.regions
        }
    },
    mutations: {
        regions(state, payload) {
            state.regions = payload
        },
        addRegion(state, payload) {
            state.regions.push(payload)
        },
        saveRegion(state, payload) {
            state.regions = state.regions.map(region => {
                if (region.id == payload.id) {
                    return payload
                }
                return region
            })
        },
        deleteRegion(state, payload) {
            let index = state.regions.findIndex(region => region.id == payload.id)
            state.regions.splice(index, 1)
        }
    },
    actions: {
        allRegion(context) {
            try {
                context.dispatch('getAxios', 'region').then(res => {
                    context.commit('regions', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getRegion(context, payload) {
            try {
                return context.dispatch('getAxios', `region/${payload}`)
            } catch (error) {
                console.log(error)
            }
        },
        postRegion(context, payload) {
            try {
                context.dispatch('postAxios', {
                    url: 'region',
                    data: payload
                }).then(res => {
                    context.commit('addRegion', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        editRegion(context, payload) {
            try {
                context.dispatch('editAxios', {
                    url: `region/${payload.id}`,
                    data: payload
                }).then(res => {
                    context.commit('saveRegion', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        deleteRegion(context, payload) {
            try {
                console.log(payload)
                context.dispatch('deleteAxios', `region/${payload}`).then(res => {
                    context.commit('deleteRegion', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}


export default region