

const district = {
    state: {
        districts: []
    },
    getters: {
        districts(state) {
            return state.districts
        }
    },
    mutations: {
        districts(state, payload) {
            state.districts = payload
        },
        addDistrict(state, payload) {
            state.districts.push(payload)
        },
        saveDistrict(state, payload) {
            state.districts = state.districts.map(district => {
                if (district.id == payload.id) {
                    return payload
                }
                return district
            })
        },
        deleteDistrict(state, payload) {
            let index = state.districts.findIndex(district => district.id == payload.id)
            state.districts.splice(index, 1)
        }
    },
    actions: {
        allDistrict(context, payload) {
            try {
                context.dispatch('getAxios', 'district').then(res => {
                    let array = []
                    res.data = res.data.map(district => {
                        if (district.region_id == payload) {
                            array.push(district)
                        }
                    })
                    context.commit('districts', array)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getDistrict(context, payload) {
            try {
                return context.dispatch('getAxios', `district/${payload}`)
            } catch (error) {
                console.log(error)
            }
        },
        postDistrict(context, payload) {
            try {
                context.dispatch('postAxios', {
                    url: 'district',
                    data: payload
                }).then(res => {
                    context.commit('addDistrict', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        editDistrict(context, payload) {
            try {
                context.dispatch('editAxios', {
                    url: `district/${payload.id}`,
                    data: payload
                }).then(res => {
                    context.commit('saveDistrict', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        deleteDistrict(context, payload) {
            try {
                console.log(payload)
                context.dispatch('deleteAxios', `district/${payload}`).then(res => {
                    context.commit('deleteDistrict', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}


export default district