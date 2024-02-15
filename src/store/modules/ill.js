

const ill = {
    state: {
        ills: []
    },
    getters: {
        ills(state) {
            return state.ills
        }
    },
    mutations: {
        ills(state, payload) {
            state.ills = payload
        },
        addIll(state, payload) {
            state.ills.push(payload)
        },
        saveIll(state, payload) {
            state.ills = state.ills.map(ill => {
                if (ill.id == payload.id) {
                    return payload
                }
                return ill
            })
        },
        deleteIll(state, payload) {
            let index = state.ills.findIndex(ill => ill.id == payload.id)
            state.ills.splice(index, 1)
        }
    },
    actions: {
        allIll(context) {
            try {
                context.dispatch('getAxios', 'ill').then(res => {
                    context.commit('ills', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getIll(context, payload) {
            try {
                return context.dispatch('getAxios', `ill/${payload}`)
            } catch (error) {
                console.log(error)
            }
        },
        postIll(context, payload) {
            try {
                context.dispatch('postAxios', {
                    url: 'ill',
                    data: payload
                }).then(res => {
                    context.commit('addIll', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        editIll(context, payload) {
            try {
                context.dispatch('editAxios', {
                    url: `ill/${payload.id}`,
                    data: payload
                }).then(res => {
                    context.commit('saveIll', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        deleteIll(context, payload) {
            try {
                console.log(payload)
                context.dispatch('deleteAxios', `ill/${payload}`).then(res => {
                    context.commit('deleteIll', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}


export default ill