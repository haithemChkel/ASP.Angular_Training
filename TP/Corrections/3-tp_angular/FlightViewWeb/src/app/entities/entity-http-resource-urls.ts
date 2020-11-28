
export enum entities {
  flight = 'flight',
  airport = 'airport'
}

export const entityHttpResourceUrls = {
  flight: {
    url: entities.flight,
    selectId: (x) => x.id
  },
  airport: {
    url: entities.airport,
    selectId: (x) => x.airportCode
  }
};
