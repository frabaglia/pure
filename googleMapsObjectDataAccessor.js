function googleMapsObjectDataAccessor(gmapsObject = {}, TARGET_TYPE = 'postal_code', desired = 'long_name') {
  const index =
    gmapsObject &&
    gmapsObject.address_components &&
    Array.isArray(gmapsObject.address_components) ?

    gmapsObject.address_components
    .map((address, i) => address.types && Array.isArray(address.types) ? address.types
      .map((type, j) => type === TARGET_TYPE ? i : false)
      .reduce((prev, current) => Number.isInteger(prev) ? prev : Number.isInteger(current) ? current : false, false) :
      false)
    .filter(address_type => Number.isInteger(address_type))
    .reduce((prev, current) => Number.isInteger(prev) ? prev : Number.isInteger(current) ? current : false, false) :
    false;

  return index && gmapsObject.address_components && gmapsObject.address_components[index] && gmapsObject.address_components[index][desired] ? gmapsObject.address_components[index][desired] : null;
}

export default googleMapsObjectDataAccessor;