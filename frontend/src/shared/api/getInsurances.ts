export async function getInsurances() {
    const response = await fetch(`/insurances.json`);
    const insurances = await response.json();

    return insurances;
};
