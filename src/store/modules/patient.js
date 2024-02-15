

const patient = {
    state: {
        patients: []
    },
    getters: {
        patients(state) {
            return state.patients
        }
    },
    mutations: {
        patients(state, payload) {
            state.patients = payload
        },
        addPatient(state, payload) {
            state.patients.push(payload)
        },
        savePatient(state, payload) {
            state.patients = state.patients.map(patient => {
                if (patient.id == payload.id) {
                    return payload
                }
                return patient
            })
        },
        deletePatient(state, payload) {
            let index = state.patients.findIndex(patient => patient.id == payload.id)
            state.patients.splice(index, 1)
        }
    },
    actions: {
        allPatient(context, payload) {
            try {
                context.dispatch('getAxios', 'patient').then(res => {
                    let array = []
                    res.data = res.data.map(patient => {
                        if (patient.district_id == payload) {
                            array.push(patient)
                        }
                    })
                    context.commit('patients', array)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getPatient(context, payload) {
            try {
                return context.dispatch('getAxios', `patient/${payload}`)
            } catch (error) {
                console.log(error)
            }
        },
        postPatient(context, payload) {
            try {
                context.dispatch('postAxios', {
                    url: 'patient',
                    data: payload
                }).then(res => {
                    context.commit('addPatient', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        editPatient(context, payload) {
            try {
                context.dispatch('editAxios', {
                    url: `patient/${payload.id}`,
                    data: payload
                }).then(res => {
                    context.commit('savePatient', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        deletePatient(context, payload) {
            try {
                console.log(payload)
                context.dispatch('deleteAxios', `patient/${payload}`).then(res => {
                    context.commit('deletePatient', res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}


export default patient