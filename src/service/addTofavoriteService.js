

export default addTofavorite2 = async () => {
  try {
    let moviesArray = [];
    const movies = this.state.movies;
    const moviesGet = await AsyncStorage.getItem("favMovies");
    if (moviesGet == null) {
      moviesArray = [];
    } else {
      moviesArray = JSON.parse(moviesGet);
    }

    let compareArr = moviesArray.some(x => x.id === movies.id);
    if (compareArr === true) {
      alert("il film scelto è già stato inserito nella lista dei favoriti");
    } else if (compareArr === false) {
      moviesArray.push(this.state.movies);
      await AsyncStorage.setItem("favMovies", JSON.stringify(moviesArray));
      alert("Film salvato nei favoriti");
    }
  } catch (error) {
    console.error(error);
  }
};
