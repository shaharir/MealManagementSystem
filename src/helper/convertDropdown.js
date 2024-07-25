const convertDropdown = (dataParmas) => {
  const data = [];

  if (dataParmas) {
    for (let i = 0; i < dataParmas.length; i++) {
      const { ...others } = dataParmas;

      data[dataParmas[i]._id] = others[i];
    }
  }

  return data;
};

export default convertDropdown;
