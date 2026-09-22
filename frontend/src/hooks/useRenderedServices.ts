type useRenderedServicesProps = {
    selectedDateFrom: string
    selectedDateTo: string
}

export const useRenderedServices = () => {

    const handleGetRenderedServiceByDate = async ({ selectedDateFrom, selectedDateTo }: useRenderedServicesProps) => {
        try {
            console.log(`Hello there ${selectedDateFrom} - ${selectedDateTo}`)
        } catch (err) {
            console.log('Something went wrong: ', err)
        } 
    }

    return { handleGetRenderedServiceByDate }
}