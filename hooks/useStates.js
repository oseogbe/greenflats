var locationsNg = require('locations-ng');

const states = locationsNg.state.all();

export const useStates = () => {
    const getAll = () => states.map((state) => {
        const stateData = locationsNg.state.details(state.name)
        const { name, ...rest } = stateData
        return {
            value: name,
            label: name,
            ...rest
        }
    });

    const getLGAs = (state) => {
        return locationsNg.lga.lgas(state).map(lga => ({
            value: lga,
            label: lga
        }))
    };

    const getAreas = (state, lga) => {
        return locationsNg.lga.localities(state, lga).map(area => ({
            value: area,
            label: area
        }))
    };

    const getByValue = (value) => {
        const stateData = locationsNg.state.details(value)
        const { name, ...rest } = stateData
        return {
            value: name,
            label: name,
            ...rest
        }
    };

    return {
        getAll,
        getByValue,
        getLGAs,
        getAreas
    }
}

export default useStates;