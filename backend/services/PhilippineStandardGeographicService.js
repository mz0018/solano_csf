class PhilippineStandardGeographicService {
  async syncPhilippineStandardGeographicData() {
    const [regions, provinces, municipalities] = await Promise.all([
      fetch('https://psgc.cloud/api/regions'),
      fetch('https://psgc.cloud/api/provinces'),
      fetch('https://psgc.cloud/api/municipalities')
    ]);

    if (!regions.ok || !provinces.ok || !municipalities.ok) {
      throw new Error('Failed to fetch PSGC data');
    }

    return {
      regions: await regions.json(),
      provinces: await provinces.json(),
      municipalities: await municipalities.json()
    };
  }
}

export default new PhilippineStandardGeographicService();
